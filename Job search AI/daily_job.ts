import * as fs from "fs";
import { Resend } from "resend";
import { GoogleGenAI, Type } from "@google/genai";
import puppeteer from "puppeteer";
import * as dotenv from "dotenv";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const keys = Array.from(new Set([
  process.env.BRAIN_API_KEY_1,
  process.env.BRAIN_API_KEY_2,
  process.env.BRAIN_API_KEY_3,
  process.env.GEMINI_API_KEY
].filter(Boolean))) as string[];

const aiInstances = keys.map(key => new GoogleGenAI({ apiKey: key }));
const aiDefault = aiInstances.length > 0 ? aiInstances[0] : null;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function callGemini(prompt: string, options: { models?: string[], useSearch?: boolean } = {}) {
  const defaultModels = ["gemini-3-flash-preview", "gemini-3.1-flash-lite-preview", "gemini-3.1-pro-preview", "gemini-2.0-flash"];
  const models = options.models || defaultModels;
  
  for (const modelName of models) {
    for (let i = 0; i < aiInstances.length; i++) {
      const instance = aiInstances[i];
      try {
        console.log(`Calling ${modelName} with key ${i + 1}...`);
        
        // Try with tools at top level as per recent SDK patterns
        const payload: any = {
          model: modelName,
          contents: prompt,
        };
        
        if (options.useSearch) {
          payload.tools = [{ googleSearch: {} }];
        }

        const response = await instance.models.generateContent(payload);

        if (response?.text) {
          return { text: response.text };
        }
      } catch (error: any) {
        const msg = error.message || "";
        console.log(`${modelName} failed with key ${i + 1}: ${msg.substring(0, 150)}`);
        
        if (msg.includes("API key not valid")) {
          continue;
        }
        
        if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
           console.log("Quota exceeded. Waiting 5 seconds before trying next key...");
           await sleep(5000); 
        } else {
           await sleep(1000);
        }
      }
    }
    await sleep(2000);
  }
  return null;
}

const SEARCH_CRITERIA = `
Country: ONLY find jobs in England, United Kingdom.
Preferred Regions: Isleworth, Heathrow, Slough, Richmond, Chiswick, Brentford, or Central London (Prioritize M4 Corridor for travel savings).
Roles: Junior Cloud Support Associate, NOC Technician, Junior DevOps, Cloud Operations Assistant, 1st Line IT Support, Service Desk (Finance/Legal), Junior App Support.
Strict Rejection: Exclude any role marked "Senior," "Lead," "Manager," or requiring >3 years of experience.
Freshness: Only process roles posted within the last 14 days. Skip expired listings.
`;

function unwrapLink(link: string): string {
  try {
    if (!link || !link.startsWith("http")) return "";
    const url = new URL(link);
    
    // Handle Google Search redirects more strictly
    if (url.hostname.includes("google.com") && (url.pathname === "/url" || url.pathname === "/search")) {
      const target = url.searchParams.get("url") || url.searchParams.get("q");
      if (target && target.startsWith("http")) return target;
      if (url.pathname === "/search") return ""; // Don't return search queries
    }
    
    // Ensure we have a valid absolute URL
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    
    return link;
  } catch (e) {}
  return "";
}

async function searchJobs(excludeLinks: string[] = []) {
  if (aiInstances.length === 0) {
    console.warn("No API keys configured. Cannot search for jobs.");
    return [];
  }

  const prompt = `Search for 10 UNIQUE and RECENT job listings in London that match these criteria:
${SEARCH_CRITERIA}

CRITICAL: 
1. Find jobs posted within the last 14 days. DO NOT search for older jobs.
2. You MUST provide the DIRECT, ORIGINAL URL to the job listing on a major job board (e.g., indeed.com, totaljobs.com, reed.co.uk, linkedin.com, glassdoor.co.uk).
3. DO NOT return Google Search result pages (URLs starting with google.com/search).
4. DO NOT GUESS URLs. If you cannot find the direct link, skip the job.
5. DO NOT return any of these links (already processed):
${excludeLinks.length > 0 ? excludeLinks.join('\n') : 'None'}

Return results as plain text, separated by "---".
For each job:
TITLE: [Job title]
COMPANY: [Company name]
LOCATION: [Job location]
DESCRIPTION: [Brief summary]
LINK: [DIRECT URL]
INDUSTRY: ["FinTech/Legal" or "Pure Tech/Infrastructure" or "Other"]
WEST_LONDON: [true or false]
---`;

  const searchResponse = await callGemini(prompt, { useSearch: true });

  if (!searchResponse || !searchResponse.text || searchResponse.text.length < 50) {
    console.warn("Gemini search failed or returned too little data.");
    return [];
  }
  return parseJobs(searchResponse.text);
}

async function parseJobs(searchResponseText: string) {
  let content = searchResponseText.trim();
  console.log("Raw Gemini Response:", content);
  
  const jobs: any[] = [];
  const blocks = content.split('---').map(b => b.trim()).filter(b => b.length > 0);
  
  for (const block of blocks) {
    const job: any = {};
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    for (const line of lines) {
      if (line.startsWith('TITLE:')) job.title = line.replace('TITLE:', '').trim();
      else if (line.startsWith('COMPANY:')) job.company = line.replace('COMPANY:', '').trim();
      else if (line.startsWith('LOCATION:')) job.location = line.replace('LOCATION:', '').trim();
      else if (line.startsWith('DESCRIPTION:')) job.description = line.replace('DESCRIPTION:', '').trim();
      else if (line.startsWith('LINK:')) {
        let rawLink = line.replace('LINK:', '').trim();
        job.link = unwrapLink(rawLink);
      }
      else if (line.startsWith('INDUSTRY:')) job.industry = line.replace('INDUSTRY:', '').trim();
      else if (line.startsWith('WEST_LONDON:')) job.isWestLondon = line.replace('WEST_LONDON:', '').trim().toLowerCase() === 'true';
      else if (!job.title && !line.includes(':')) job.title = line.replace(/\*\*/g, '').trim(); // Fallback for title
    }
    if (job.title && job.link) {
      jobs.push(job);
    }
  }

  const verifiedJobs: any[] = [];
  const rejections = { expired: 0, location: 0, role: 0, bot: 0, total: 0 };
  
  console.log(`Found ${jobs.length} potential jobs. Verifying links with Puppeteer (Nuclear Protection Mode)...`);
  
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'] 
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    for (const job of jobs) {
      if (!job.link) continue;
      rejections.total++;
      
      try {
        console.log(`Verifying: ${job.link}`);
        const response = await page.goto(job.link, { waitUntil: 'networkidle2', timeout: 25000 });
        
        if (!response) {
          console.log(`No response for ${job.link}`);
          rejections.bot++;
          continue;
        }

        const status = response.status();
        if (status === 404 || status === 410) {
          console.log(`Dead link (${status}): ${job.link}`);
          rejections.expired++;
          continue;
        }

        // Redirect check: If we got redirected to a generic search page, the job is dead or fake.
        const currentUrl = page.url();
        if (currentUrl.includes("/search") || currentUrl.includes("jobs?q=") || currentUrl.includes("/login") || currentUrl.includes("/auth")) {
          console.log(`Redirected to generic page (search/login), not the actual job: ${currentUrl}`);
          rejections.bot++;
          continue;
        }

        // Get visible text and page content
        const content = await page.evaluate(() => document.body?.innerText || "").then(t => t.toLowerCase());

        // Bot / Wall Check: If page is too small, it's a login wall or cookie page
        if (content.length < 800) {
          console.log(`Page content too short (${content.length} chars). likely a wall: ${job.link}`);
          rejections.bot++;
          continue;
        }
        
        // Check for bot challenges
        const botIndicators = [
          "verify you are human", "cloudflare", "please enable cookies", "press and hold", "access denied",
          "sign in to linkedin", "join to apply", "create an account to see"
        ];
        if (botIndicators.some(bi => content.includes(bi) && !content.includes("job description"))) {
           console.log(`Bot challenge detected or blocked: ${job.link}`);
           rejections.bot++;
           continue;
        }

        // Check for dead indicators (International)
        const deadIndicators = [
          "job is no longer available", "position has been filled", "this job has expired",
          "listing has ended", "we couldn't find that job", "no longer accepting applications",
          "position closed", "vacancy is closed", "successfully filled", "no longer active", "page not found",
          "vacature is gesloten", "niet meer beschikbaar", "stelle nicht mehr verfügbar", "abgeschlossen",
          "offre n'est plus disponible", "clôturé"
        ];
        
        if (deadIndicators.some(indicator => content.includes(indicator))) {
          console.log(`Link appears expired: ${job.link}`);
          rejections.expired++;
          continue;
        }

        // Location Check: STRICT WHITELIST (UK ONLY)
        const europeIndicators = ["netherlands", "germany", "belgium", "nederland", "deutschland", "belgië", "amsterdam", "berlin", "brussels", "munich", "rotterdam", "dublin", "ireland", "france", "paris", "spain", "madrid", "italy", "rome"];
        const usIndicators = [", us", ", usa", "united states", "america", "usa"];
        const ukIndicators = ["london", "england", "united kingdom", "uk", "isleworth", "heathrow", "slough", "richmond", "chiswick", "brentford", "hounslow", "ealing", "staines"];
        
        const hasEurope = europeIndicators.some(ei => content.includes(ei));
        const hasUS = usIndicators.some(ui => content.includes(ui));
        const hasUK = ukIndicators.some(ui => content.includes(ui));
        
        const pageTitle = (await page.title()).toLowerCase();
        const firstH1 = await page.evaluate(() => document.querySelector('h1')?.textContent || "").then(t => t.toLowerCase());
        const headerText = (pageTitle + " " + firstH1);

        // Reject if any European or US country is mentioned unless UK is strongly present
        if ((hasEurope || hasUS) && !headerText.includes("london") && !headerText.includes("uk") && !headerText.includes("united kingdom")) {
           console.log(`Location rejection (International found): ${job.link}`);
           rejections.location++;
           continue;
        }

        // Must explicitly contain UK location in content
        if (!hasUK && !headerText.includes("london") && !headerText.includes("slough")) {
          console.log(`Location rejection (No UK keywords found): ${job.link}`);
          rejections.location++;
          continue;
        }

        // Extract Title and check for role mismatch (STRICT)
        const jobTitle = job.title.toLowerCase();
        const roleKeywords = jobTitle.split(/\s+/).filter(w => w.length > 3);
        
        // Count matches in H1/Title specifically
        let roleMatchesInHeader = roleKeywords.filter(w => headerText.includes(w)).length;
        
        // Reject if Senior/Lead/Manager is in the H1 but not in requested title
        const negativeKeywords = ["senior", "lead", "manager", "principal", "head of", "director"];
        if (negativeKeywords.some(nk => headerText.includes(nk) && !jobTitle.includes(nk))) {
          console.log(`Role rejection (Seniority found in H1): ${job.link}`);
          rejections.role++;
          continue;
        }

        // Hard rule: Must match at least TWO non-generic keywords from the title in the page header
        if (roleMatchesInHeader < 2 && roleKeywords.length >= 2) {
          console.log(`Role mismatch (Header match score ${roleMatchesInHeader}/${roleKeywords.length}): ${job.link}`);
          rejections.role++;
          continue;
        }

        console.log(`Link verified: ${job.link}`);
        verifiedJobs.push(job);
      } catch (e: any) {
        console.log(`Verification error for ${job.link}: ${e.message}`);
        rejections.bot++;
      }
    }
  } catch (err: any) {
    console.warn("Puppeteer verification failed:", err.message);
  } finally {
    if (browser) await browser.close();
  }
  
  return { verifiedJobs, rejections };
}

async function generateCV(job: any) {
  if (aiInstances.length === 0) return "";

  const summaryPrompt = `Write a HIGH-QUALITY Professional Summary for a CV.
Candidate: Ritvik Yalala
Target Job: ${job.title} at ${job.company}
Industry: ${job.industry}
Job Description: ${job.description}

Rules:
- Length: EXACTLY 4 to 5 sentences.
- Tone: Professional, confident, technical.
- Content: 
  1. Start with "Dual-certified Junior Cloud Support Associate with AWS CCP & Python PCEP certifications".
  2. Mention DMM (112 UCAS points) in BTEC Level 3 ICT.
  3. Highlight your specific interest in ${job.company}'s mission or the ${job.title} role.
  4. Mention you are currently preparing for AWS Solutions Architect Associate (April 2026) and have a conditional offer for a Level 6 Cyber Security Degree.
  5. Tailor the technical focus to ${job.industry} (e.g., FinTech/Legal awareness or Pure Tech automation).
- Do NOT use markdown formatting like **bold** or *italics*. Just plain text.
- DO NOT BE GENERIC. Make it sound like you really want THIS specific job.
`;

  const response = await callGemini(summaryPrompt);

  const fallbackSummary = `Dual-certified Junior Cloud Support Associate with AWS CCP & Python PCEP certifications and a DMM in BTEC Level 3 ICT. I am highly motivated to bring my technical expertise to the ${job.title} role at ${job.company}, where I can apply my skills in AWS infrastructure and Python automation. Currently preparing for the AWS Solutions Architect Associate certification in April 2026, I also hold a conditional offer for a Level 6 Cyber Security Degree. I am committed to delivering high-reliability solutions and am eager to contribute to ${job.company}'s continued success through proactive technical support and innovative cloud strategies.`;

  const summaryText = response?.text?.trim() || fallbackSummary;

  const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #333; font-size: 11px; }
  .header { background-color: #2b4c7e; color: white; padding: 20px; position: relative; }
  .header h1 { margin: 0; font-size: 28px; font-weight: normal; }
  .header h2 { margin: 5px 0 10px 0; font-size: 14px; font-weight: normal; }
  .contact-info { font-size: 10px; display: flex; gap: 10px; flex-wrap: wrap; }
  .contact-info a { color: white; text-decoration: none; }
  .status-block { position: absolute; top: 20px; right: 20px; background-color: #1a365d; padding: 10px; border-radius: 4px; text-align: right; font-size: 10px; font-weight: bold; }
  .content { padding: 20px; }
  .section-title { color: #2b4c7e; font-size: 14px; font-weight: bold; text-transform: uppercase; border-left: 4px solid #2b4c7e; padding-left: 8px; margin-top: 15px; margin-bottom: 10px; background-color: #f0f4f8; padding-top: 4px; padding-bottom: 4px; }
  .summary { margin-bottom: 15px; line-height: 1.4; }
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
  .skill-category { font-weight: bold; color: #2b4c7e; margin-bottom: 5px; }
  .skill-list { margin: 0; padding-left: 15px; }
  .project { margin-bottom: 10px; }
  .project-title { font-weight: bold; color: #2b4c7e; }
  .project-subtitle { font-style: italic; color: #666; font-size: 10px; margin-bottom: 4px; }
  .experience { margin-bottom: 10px; }
  .exp-header { display: flex; justify-content: space-between; font-weight: bold; color: #2b4c7e; }
  .exp-subtitle { font-style: italic; color: #666; font-size: 10px; margin-bottom: 4px; }
  ul { margin-top: 4px; margin-bottom: 8px; padding-left: 20px; }
  li { margin-bottom: 3px; }
  .education-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .links-footer { text-align: center; margin-top: 20px; font-size: 9px; color: #666; }
  .links-footer a { color: #2b4c7e; text-decoration: none; }
</style>
</head>
<body>
  <div class="header">
    <h1>Ritvik Yalala</h1>
    <h2>Junior Cloud Support Associate | NOC Technician | Junior DevOps</h2>
    <div class="contact-info">
      <span>📍 Isleworth, London</span>
      <span>📱 07300456228</span>
      <span>✉️ <a href="mailto:ritvikyalala@gmail.com">ritvikyalala@gmail.com</a></span>
      <span>🔗 <a href="https://linkedin.com/in/ritvik-yalala" target="_blank">LinkedIn</a></span>
      <span>🐙 <a href="https://github.com/Ritvik-exe" target="_blank">GitHub</a></span>
      <span>🌐 <a href="https://947465b0.ritvik-websites.pages.dev/" target="_blank">Portfolio</a></span>
      <span>🏆 <a href="https://credly.com/users/ritvik-yalala" target="_blank">Credly</a></span>
    </div>
    <div class="status-block">
      <div>Level 6 Cyber Security Offer</div>
      <div>AWS SAA - April 2026</div>
    </div>
  </div>
  <div class="content">
    <div class="section-title">Professional Summary</div>
    <div class="summary">
      ${summaryText}
    </div>

    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      <div>
        <div class="skill-category">☁️ Cloud & AI:</div>
        <ul class="skill-list">
          <li>AWS (EC2, S3, IAM, CloudWatch, Rekognition)</li>
          <li>AWS Certified Cloud Practitioner (Jan 2026)</li>
        </ul>
      </div>
      <div>
        <div class="skill-category">🐍 Programming:</div>
        <ul class="skill-list">
          <li>Python (PCEP Certified Feb 2026)</li>
          <li>Boto3 SDK, JSON Parsing, Error Handling</li>
        </ul>
      </div>
      <div>
        <div class="skill-category">🔧 DevOps & Tools:</div>
        <ul class="skill-list">
          <li>Git/GitHub, Linux CLI, VS Code</li>
          <li>CI/CD Fundamentals</li>
        </ul>
      </div>
      <div>
        <div class="skill-category">🌐 Infrastructure:</div>
        <ul class="skill-list">
          <li>TCP/IP Networking, Virtualization</li>
          <li>Windows Server, Microsoft 365 Admin</li>
        </ul>
      </div>
    </div>

    <div class="section-title">Technical Cloud Projects</div>
    <div class="project">
      <div class="project-title">AI-Powered Cloud Image Organizer</div>
      <div class="project-subtitle">Python & AWS Rekognition | Self-Led</div>
      <ul>
        <li>Engineered serverless workflow using AWS Rekognition for deep-learning visual analysis</li>
        <li>Developed Python logic to programmatically create S3 folders; <b>Reduced manual data categorization by 100%</b></li>
        <li>Implemented Lifecycle Automation for storage efficiency via automated secure file deletion</li>
      </ul>
    </div>
    <div class="project">
      <div class="project-title">High-Reliability AWS Inventory Tool</div>
      <div class="project-subtitle">Python & Boto3 | Self-Led</div>
      <ul>
        <li>Automated global EC2 instance tracking via programmatic API access (Boto3)</li>
        <li>Processed complex JSON responses to extract critical metadata into actionable reports</li>
        <li>Applied Defensive Programming (try/except blocks) for script resilience during API timeouts</li>
      </ul>
    </div>

    <div class="section-title">Professional Experience</div>
    <div class="experience">
      <div class="exp-header">
        <span>Independent Cloud & Software Researcher</span>
        <span>June 2025 – Present</span>
      </div>
      <div class="exp-subtitle">Self-Led | Isleworth, London</div>
      <ul>
        <li>Executed full-time self-led bootcamp transitioning into Cloud Engineering</li>
        <li>Mastered AWS and Python syllabuses, achieving two industry certifications</li>
        <li>Built GitHub portfolio of automation tools focusing on cloud scalability and reliability</li>
      </ul>
    </div>
    <div class="experience">
      <div class="exp-header">
        <span>IT & Customer Support</span>
        <span>Feb 2025 (2 Weeks)</span>
      </div>
      <div class="exp-subtitle">West Thames College Gym</div>
      <ul>
        <li>Managed member data and access rights within the gym system</li>
        <li>Trained non-technical staff on Microsoft Teams/Excel</li>
      </ul>
    </div>
    <div class="experience">
      <div class="exp-header">
        <span>IT Support</span>
        <span>March 2024 – April 2024</span>
      </div>
      <div class="exp-subtitle">Euro Bathrooms</div>
      <ul>
        <li>Diagnosed hardware faults and network issues as first line of defense</li>
        <li>Assisted in critical data migration project, ensuring zero data loss</li>
      </ul>
    </div>

    <div class="section-title">Education & Certifications</div>
    <div class="education-grid">
      <div>AWS CCP – Jan 2026 – Credly</div>
      <div>BTEC L3 ICT – DMM (112 UCAS)</div>
      <div>Python PCEP – Feb 2026 – Credly</div>
      <div>GCSE: Maths (5), English (5)</div>
    </div>

    <div class="links-footer">
      🔗 <a href="https://947465b0.ritvik-websites.pages.dev/" target="_blank">Portfolio</a> | 
      🔗 <a href="https://linkedin.com/in/ritvik-yalala" target="_blank">LinkedIn</a> | 
      🔗 <a href="https://github.com/Ritvik-exe" target="_blank">GitHub</a> | 
      🔗 <a href="https://credly.com/users/ritvik-yalala" target="_blank">Credly</a>
    </div>
  </div>
</body>
</html>
  `;
  return html;
}

async function generateCoverLetter(job: any) {
  if (aiInstances.length === 0) return "";

  const prompt = `Write a COMPREHENSIVE and PERSUASIVE professional Cover Letter for Ritvik Yalala applying for ${job.title} at ${job.company}.
Job Description: ${job.description}

Rules:
- Format as HTML (just the content, no <html> or <body> tags, use <p> tags).
- Structure:
  1. Formal Salutation.
  2. Opening Paragraph: State the role and why you are excited about ${job.company} specifically.
  3. Body Paragraph 1: Highlight technical certifications (AWS CCP, Python PCEP) and BTEC ICT (DMM).
  4. Body Paragraph 2: Discuss specific projects (AWS Rekognition AI Image Organizer, Boto3 Inventory Tool) and how they relate to the ${job.title} role.
  5. Closing Paragraph: Mention the conditional offer for a Level 6 Cyber Security Degree and AWS SAA prep. Reiterate enthusiasm and call to action.
  6. Formal Sign-off.
- Tone: Professional, enthusiastic, and highly tailored.
- Local Advantage: ${job.isWestLondon ? 'Mention being a "local Isleworth resident" for this West London/Heathrow role.' : ''}
- Direct Links: Insert the Interactive 3D Portfolio as a neat HTML hyperlink: <a href="https://947465b0.ritvik-websites.pages.dev/">Interactive 3D Portfolio</a>.
${job.industry === "FinTech/Legal" ? '- Mention 80% Merit in CeMAP Module 1 and regulatory awareness.' : ''}
- LENGTH: At least 3-4 substantial paragraphs. DO NOT be brief.
`;

  const response = await callGemini(prompt);

  const fallbackCL = `
    <p>Dear Hiring Manager,</p>
    <p>I am writing to express my enthusiastic interest in the ${job.title} position at ${job.company}, as advertised. As a dual-certified Junior Cloud Support Associate with AWS Certified Cloud Practitioner and Python PCEP certifications, I am confident that my technical foundation and proactive approach to problem-solving make me an ideal candidate for your team.</p>
    <p>During my independent research and project work, I have developed robust solutions such as an AI-powered cloud image organizer using AWS Rekognition and a high-reliability inventory tool using Python and Boto3. These projects have sharpened my ability to automate complex workflows and manage cloud infrastructure with a "reliability-first" mindset. My academic background, including a DMM in BTEC Level 3 ICT, has provided me with a strong theoretical and practical understanding of the IT landscape.</p>
    <p>I am particularly drawn to ${job.company} because of your reputation for innovation and excellence in the industry. I am eager to bring my dedication to technical excellence and my continuous learning mindset—evidenced by my current preparation for the AWS Solutions Architect Associate exam and my conditional offer for a Level 6 Cyber Security Degree—to your organization. You can view my full range of projects on my <a href="https://947465b0.ritvik-websites.pages.dev/">Interactive 3D Portfolio</a>.</p>
    <p>Thank you for your time and consideration. I look forward to the possibility of discussing how my skills and passion for cloud technology can contribute to the success of ${job.company}.</p>
    <p>Sincerely,<br/>Ritvik Yalala</p>
  `;

  let content = response?.text?.trim() || fallbackCL;
  if (content.startsWith("\`\`\`html")) {
    content = content.replace(/\`\`\`html/g, "").replace(/\`\`\`/g, "");
  } else if (content.startsWith("\`\`\`")) {
    content = content.replace(/\`\`\`/g, "");
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; color: #333; font-size: 12px; line-height: 1.6; }
  .header { border-bottom: 2px solid #2b4c7e; padding-bottom: 20px; margin-bottom: 20px; }
  .name { font-size: 24px; font-weight: bold; color: #2b4c7e; margin-bottom: 5px; }
  .contact { font-size: 11px; color: #666; }
  a { color: #2b4c7e; text-decoration: none; }
</style>
</head>
<body>
  <div class="header">
    <div class="name">Ritvik Yalala</div>
    <div class="contact">Isleworth, London | 07300456228 | ritvikyalala@gmail.com | <a href="https://947465b0.ritvik-websites.pages.dev/">Interactive Portfolio</a></div>
  </div>
  ${content}
</body>
</html>
  `;
  return html;
}



export async function runDailyJob() {
  console.log("Starting daily job search (Consolidated Single Email mode)...");

  if (!resend) {
    console.log("RESEND_API_KEY is not configured. Cannot send emails.");
    return;
  }

  const seenLinks: string[] = [];
  const NUM_SEARCH_BATCHES = 4;
  const globalRejections = { expired: 0, location: 0, role: 0, bot: 0, total: 0 };

  for (let batch = 1; batch <= NUM_SEARCH_BATCHES; batch++) {
    console.log(`\n--- Searching for Jobs (Search ${batch}/${NUM_SEARCH_BATCHES}) ---`);
    const { verifiedJobs, rejections } = await searchJobs(seenLinks);
    
    // Aggregate rejections
    globalRejections.expired += rejections.expired;
    globalRejections.location += rejections.location;
    globalRejections.role += rejections.role;
    globalRejections.bot += rejections.bot;
    globalRejections.total += rejections.total;

    for (const job of verifiedJobs) {
      if (!seenLinks.includes(job.link)) {
        allJobs.push(job);
        seenLinks.push(job.link);
      }
    }
    
    // Slight delay between searches if needed
    if (batch < NUM_SEARCH_BATCHES) {
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  
  // Optional: cap the total number of jobs per email to avoid overwhelming attachments
  allJobs = allJobs.slice(0, 10);

  if (allJobs.length === 0) {
    console.log("No new valid jobs found today. Sending status email...");
    try {
      const todayStr = new Date().toLocaleDateString('en-GB');
      await resend.emails.send({
        from: "Job Hunter AI <onboarding@resend.dev>",
        to: ["ritvikyalala@gmail.com"],
        subject: `Daily Job Search Update (${todayStr}) - No Matching Jobs`,
        html: `
          <h1>Job Search Update</h1>
          <p>The daily search was performed but <strong>no new jobs</strong> met your strict verification standards today.</p>
          <p><strong>Criteria checked:</strong></p>
          <ul>
            <li>Location: England, UK (M4 Corridor & Greater London)</li>
            <li>Role: Junior Cloud Support, NOC Tech, IT Support, etc.</li>
            <li>Recency: Posted within the last 14 days</li>
          </ul>
          <h3>Rejection Summary (Why we sent nothing):</h3>
          <ul>
            <li><strong>International/Wrong Location:</strong> ${globalRejections.location} links</li>
            <li><strong>Wrong Role/Seniority:</strong> ${globalRejections.role} links</li>
            <li><strong>Expired/Closed:</strong> ${globalRejections.expired} links</li>
            <li><strong>Blocked/Bot Wall:</strong> ${globalRejections.bot} links</li>
          </ul>
          <p><em>Total links scanned: ${globalRejections.total}</em></p>
          <p>The system is protecting you from the junk we found today. We will try again tomorrow!</p>
        `
      });
    } catch (e) {
      console.warn("Failed to send status email:", e);
    }
    return;
  }

  console.log(`\nFound ${allJobs.length} Total Jobs. Generating documents and preparing email...`);

  let emailHtml = `<h1>Your Daily Job Leads</h1><p>Here are your tailored applications for today:</p><hr/>`;
  const attachments: any[] = [];
  const filesToCleanup: string[] = [];

  let browser;
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    const jobPromises = allJobs.map(async (job) => {
      console.log(`Processing: ${job.title} at ${job.company}`);
      
      const [cvHtml, clHtml] = await Promise.all([
        generateCV(job),
        generateCoverLetter(job)
      ]);
      
      const safeCompanyName = job.company.replace(/[^a-zA-Z0-9]/g, '_');
      const timestamp = Date.now() + Math.floor(Math.random() * 1000);
      const cvFilename = `CV_Ritvik_Yalala_${safeCompanyName}_${timestamp}.pdf`;
      const clFilename = `CoverLetter_Ritvik_Yalala_${safeCompanyName}_${timestamp}.pdf`;
      
      const page = await browser.newPage();
      
      await page.setContent(cvHtml, { waitUntil: 'load' });
      await page.pdf({ path: cvFilename, format: 'A4', printBackground: true });
      
      await page.setContent(clHtml, { waitUntil: 'load' });
      await page.pdf({ path: clFilename, format: 'A4', printBackground: true });
      
      await page.close();
      
      const cvBuffer = fs.readFileSync(cvFilename);
      const clBuffer = fs.readFileSync(clFilename);
      
      return {
        job,
        cvFilename,
        clFilename,
        cvBuffer,
        clBuffer
      };
    });

    const results = await Promise.all(jobPromises);

    for (const result of results) {
      attachments.push({ filename: result.cvFilename, content: result.cvBuffer });
      attachments.push({ filename: result.clFilename, content: result.clBuffer });
      filesToCleanup.push(result.cvFilename, result.clFilename);
      
      emailHtml += `
        <h2>${result.job.title} at ${result.job.company}</h2>
        <p><strong>Location:</strong> ${result.job.location}</p>
        <p><strong>Industry Mode:</strong> ${result.job.industry}</p>
        <p><strong>Description:</strong> ${result.job.description}</p>
        <p><a href="${result.job.link}">View Job Posting</a></p>
        <p><em>Tailored CV and Cover Letter attached.</em></p>
        <hr/>
      `;
    }
  } catch (err) {
    console.warn("Error during PDF generation:", err);
  } finally {
    if (browser) await browser.close();
  }

  try {
    const todayStr = new Date().toLocaleDateString('en-GB');
    await resend.emails.send({
      from: "Job Hunter AI <onboarding@resend.dev>",
      to: ["ritvikyalala@gmail.com"],
      subject: `Daily Targeted Job Leads & Tailored Applications (${todayStr})`,
      html: emailHtml,
      attachments: attachments
    });
    console.log(`Single batch email sent successfully with ${allJobs.length} jobs.`);
  } catch (error) {
    console.warn(`Failed to send email:`, error);
  }
  
  // Cleanup PDFs
  for (const file of filesToCleanup) {
    try {
      fs.unlinkSync(file);
    } catch (e) {}
  }
}

runDailyJob();
