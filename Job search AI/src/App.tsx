/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { JobSearch } from "./components/JobSearch";
import { Preferences } from "./components/Preferences";
import { GeneratedDocs } from "./components/GeneratedDocs";
import { Briefcase, Settings, FileText, Search } from "lucide-react";

export interface UserPreferences {
  keywords: string;
  location: string;
  email: string;
  profile: string;
  dailyTime: string;
}

export interface GeneratedDoc {
  id: string;
  type: "CV" | "Cover Letter";
  jobTitle: string;
  company: string;
  content: string;
  date: string;
}

export default function App() {
  const [prefs, setPrefs] = useState<UserPreferences>({
    keywords: "",
    location: "",
    email: "",
    profile: "",
    dailyTime: "10:00",
  });

  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDoc[]>([]);

  useEffect(() => {
    // Load preferences from server
    fetch("/api/preferences")
      .then((res) => res.json())
      .then((data) => {
        if (data.keywords) setPrefs(data);
      });

    // Load docs from local storage for now
    const savedDocs = localStorage.getItem("generatedDocs");
    if (savedDocs) {
      setGeneratedDocs(JSON.parse(savedDocs));
    }
  }, []);

  const savePrefs = async (newPrefs: UserPreferences) => {
    setPrefs(newPrefs);
    try {
      await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPrefs),
      });
      toast.success("Preferences saved successfully");
    } catch (error) {
      toast.error("Failed to save preferences");
    }
  };

  const addDoc = (doc: GeneratedDoc) => {
    const newDocs = [doc, ...generatedDocs];
    setGeneratedDocs(newDocs);
    localStorage.setItem("generatedDocs", JSON.stringify(newDocs));
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-200">
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Job Hunter AI</h1>
          </div>
          <div className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded border border-neutral-200">
            v1.0.0
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="bg-white border border-neutral-200 p-1 h-auto gap-1">
              <TabsTrigger value="search" className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white px-4 py-2 rounded-md transition-all">
                <Search className="w-4 h-4 mr-2" />
                Find Jobs
              </TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white px-4 py-2 rounded-md transition-all">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="prefs" className="data-[state=active]:bg-neutral-900 data-[state=active]:text-white px-4 py-2 rounded-md transition-all">
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="search">
            <JobSearch prefs={prefs} onAddDoc={addDoc} />
          </TabsContent>

          <TabsContent value="docs">
            <GeneratedDocs docs={generatedDocs} />
          </TabsContent>

          <TabsContent value="prefs">
            <Preferences prefs={prefs} onSave={savePrefs} />
          </TabsContent>
        </Tabs>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

