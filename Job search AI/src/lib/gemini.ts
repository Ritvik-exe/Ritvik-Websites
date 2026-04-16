import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.BRAIN_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
  link: string;
  source: string;
}

export async function searchJobs(keywords: string, location: string): Promise<Job[]> {
  if (!ai) {
    console.warn("BRAIN_API_KEY is not configured.");
    return [];
  }

  const prompt = `Find 5 recent job openings for "${keywords}" in "${location}". 
  Return the results as a JSON array of objects with the following properties:
  - title: Job title
  - company: Company name
  - location: Job location
  - description: Brief summary of the role
  - link: URL to the job posting
  - source: Where the job was found (e.g., LinkedIn, Indeed)`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }] as any,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              company: { type: Type.STRING },
              location: { type: Type.STRING },
              description: { type: Type.STRING },
              link: { type: Type.STRING },
              source: { type: Type.STRING },
            },
            required: ["title", "company", "location", "description", "link", "source"],
          },
        },
      },
    } as any);

    return JSON.parse(response.text);
  } catch (error) {
    console.warn("Error searching jobs:", error);
    return [];
  }
}

export async function generateDocument(
  type: "CV" | "Cover Letter",
  job: Job,
  userProfile: string
): Promise<string> {
  if (!ai) {
    return "BRAIN_API_KEY is not configured. Please add it in the Settings/Secrets panel.";
  }

  const prompt = `Generate a professional ${type} for the following job:
  Job Title: ${job.title}
  Company: ${job.company}
  Description: ${job.description}

  User Profile/Experience:
  ${userProfile}

  The ${type} should be tailored to the job description and highlight relevant skills from the user profile.
  Use a professional tone and standard ${type} format. Return the result in Markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.warn(`Error generating ${type}:`, error);
    return `Failed to generate ${type}.`;
  }
}
