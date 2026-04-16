import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { Resend } from "resend";
import dotenv from "dotenv";
import cron from "node-cron";
import { runDailyJob } from "./daily_job";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Schedule daily job at 9 AM UTC (10 AM London time)
cron.schedule("0 9 * * *", () => {
  console.log("Internal cron triggered: Running daily job...");
  runDailyJob();
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      hasGeminiKey: !!process.env.BRAIN_API_KEY,
      geminiKeyLength: process.env.BRAIN_API_KEY ? process.env.BRAIN_API_KEY.length : 0
    });
  });

  // Save preferences
  app.post("/api/preferences", (req, res) => {
    const prefs = req.body;
    fs.writeFileSync("preferences.json", JSON.stringify(prefs, null, 2));
    res.json({ success: true });
  });

  // Get preferences
  app.get("/api/preferences", (req, res) => {
    if (fs.existsSync("preferences.json")) {
      const prefs = JSON.parse(fs.readFileSync("preferences.json", "utf-8"));
      res.json(prefs);
    } else {
      res.json({});
    }
  });

  // Send email (manual trigger)
  app.post("/api/send-email", async (req, res) => {
    const { email, subject, html } = req.body;
    if (!resend) {
      return res.status(500).json({ error: "Resend API key not configured" });
    }

    try {
      const data = await resend.emails.send({
        from: "Job Hunter AI <onboarding@resend.dev>",
        to: [email],
        subject: subject,
        html: html,
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Trigger daily job manually (supports both GET and POST)
  app.all("/api/trigger-daily", async (req, res) => {
    // Run in background so the request doesn't timeout
    runDailyJob().catch(err => console.warn("Background job error:", err));
    
    res.json({ success: true, message: "Job triggered in background" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
