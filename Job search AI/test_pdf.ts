import puppeteer from "puppeteer";

async function test() {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent("<h1>Test</h1>");
    await page.pdf({ path: "test.pdf" });
    await browser.close();
    console.log("PDF generated successfully");
  } catch (e) {
    console.error("Puppeteer error:", e);
  }
}

test();
