import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Loader2, ExternalLink, FilePlus, Mail } from "lucide-react";
import { searchJobs, generateDocument, Job } from "../lib/gemini";
import { UserPreferences, GeneratedDoc } from "../App";
import { toast } from "sonner";

interface JobSearchProps {
  prefs: UserPreferences;
  onAddDoc: (doc: GeneratedDoc) => void;
}

export function JobSearch({ prefs, onAddDoc }: JobSearchProps) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [generating, setGenerating] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!prefs.keywords || !prefs.location) {
      toast.error("Please set your keywords and location in Preferences first.");
      return;
    }

    setLoading(true);
    try {
      const results = await searchJobs(prefs.keywords, prefs.location);
      setJobs(results);
      if (results.length === 0) {
        toast.info("No jobs found. Try different keywords.");
      }
    } catch (error) {
      toast.error("Failed to search for jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (job: Job, type: "CV" | "Cover Letter") => {
    if (!prefs.profile) {
      toast.error("Please add your profile/experience in Preferences first.");
      return;
    }

    const genId = `${job.company}-${type}`;
    setGenerating(genId);
    try {
      const content = await generateDocument(type, job, prefs.profile);
      const newDoc: GeneratedDoc = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        jobTitle: job.title,
        company: job.company,
        content,
        date: new Date().toISOString(),
      };
      onAddDoc(newDoc);
      toast.success(`${type} generated successfully!`);
    } catch (error) {
      toast.error(`Failed to generate ${type}.`);
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Job Search</h2>
          <p className="text-neutral-500">Find the latest opportunities based on your preferences.</p>
        </div>
        <Button onClick={handleSearch} disabled={loading} className="bg-neutral-900 text-white hover:bg-neutral-800">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
          {loading ? "Searching..." : "Search Now"}
        </Button>
      </div>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job, index) => (
            <Card key={index} className="border-neutral-200 hover:border-neutral-300 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg leading-tight">{job.title}</CardTitle>
                  <Badge variant="secondary" className="bg-neutral-100 text-neutral-600 border-none">
                    {job.source}
                  </Badge>
                </div>
                <CardDescription className="font-medium text-neutral-700">
                  {job.company} • {job.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-neutral-600 line-clamp-3">{job.description}</p>
              </CardContent>
              <CardFooter className="flex gap-2 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-neutral-200"
                  onClick={() => window.open(job.link, "_blank")}
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-neutral-200"
                  disabled={generating === `${job.company}-CV`}
                  onClick={() => handleGenerate(job, "CV")}
                >
                  {generating === `${job.company}-CV` ? (
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  ) : (
                    <FilePlus className="w-3 h-3 mr-2" />
                  )}
                  CV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-neutral-200"
                  disabled={generating === `${job.company}-Cover Letter`}
                  onClick={() => handleGenerate(job, "Cover Letter")}
                >
                  {generating === `${job.company}-Cover Letter` ? (
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  ) : (
                    <Mail className="w-3 h-3 mr-2" />
                  )}
                  Letter
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-neutral-300 rounded-xl">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-neutral-300" />
            </div>
            <p className="text-neutral-500 font-medium">No jobs found yet.</p>
            <p className="text-neutral-400 text-sm">Click "Search Now" to find opportunities.</p>
          </div>
        )
      )}
    </div>
  );
}
