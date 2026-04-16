import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPreferences } from "../App";
import { Save, Bell, User, Briefcase } from "lucide-react";
import { toast } from "sonner";

interface PreferencesProps {
  prefs: UserPreferences;
  onSave: (prefs: UserPreferences) => void;
}

export function Preferences({ prefs, onSave }: PreferencesProps) {
  const [formData, setFormData] = useState<UserPreferences>(prefs);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
        <p className="text-neutral-500">Configure your job search and automation settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-neutral-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-neutral-500" />
              <CardTitle className="text-lg">Search Criteria</CardTitle>
            </div>
            <CardDescription>What kind of roles are you looking for?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Job Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="e.g. Software Engineer, Product Manager"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="border-neutral-200 focus:ring-neutral-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. London, Remote, New York"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="border-neutral-200 focus:ring-neutral-900"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-neutral-500" />
              <CardTitle className="text-lg">Your Profile</CardTitle>
            </div>
            <CardDescription>Paste your CV or summarize your experience for AI tailoring.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="profile">Experience & Skills</Label>
              <Textarea
                id="profile"
                placeholder="I am a software engineer with 5 years of experience in React and Node.js..."
                value={formData.profile}
                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                className="min-h-[200px] border-neutral-200 focus:ring-neutral-900"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-4 h-4 text-neutral-500" />
              <CardTitle className="text-lg">Daily Automation</CardTitle>
            </div>
            <CardDescription>When should we send you the daily job digest?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Notification Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-neutral-200 focus:ring-neutral-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Daily Digest Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.dailyTime}
                  onChange={(e) => setFormData({ ...formData, dailyTime: e.target.value })}
                  className="border-neutral-200 focus:ring-neutral-900"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            className="border-neutral-200"
            onClick={async () => {
              try {
                const res = await fetch("/api/trigger-daily", { method: "POST" });
                if (res.ok) toast.success("Daily job triggered! Check your email.");
                else toast.error("Failed to trigger daily job.");
              } catch (e) {
                toast.error("Error triggering automation.");
              }
            }}
          >
            Test Automation Now
          </Button>
          <Button type="submit" className="bg-neutral-900 text-white hover:bg-neutral-800 px-8">
            <Save className="w-4 h-4 mr-2" />
            Save All Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
