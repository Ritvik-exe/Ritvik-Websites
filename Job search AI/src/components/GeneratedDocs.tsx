import { GeneratedDoc } from "../App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Eye, Download, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

interface GeneratedDocsProps {
  docs: GeneratedDoc[];
}

export function GeneratedDocs({ docs }: GeneratedDocsProps) {
  const handleDownload = (doc: GeneratedDoc) => {
    const element = document.createElement("a");
    const file = new Blob([doc.content], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.company}_${doc.type}.md`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Generated Documents</h2>
        <p className="text-neutral-500">Your tailored CVs and cover letters for specific roles.</p>
      </div>

      {docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <Card key={doc.id} className="border-neutral-200 hover:border-neutral-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold border-neutral-200">
                    {doc.type}
                  </Badge>
                  <div className="flex items-center text-xs text-neutral-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(doc.date), "MMM d, yyyy")}
                  </div>
                </div>
                <CardTitle className="text-base line-clamp-1">{doc.jobTitle}</CardTitle>
                <CardDescription className="text-sm font-medium text-neutral-600">
                  {doc.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2 pt-0">
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" size="sm" className="flex-1 border-neutral-200" />}>
                    <Eye className="w-3 h-3 mr-2" />
                    View
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {doc.type}: {doc.jobTitle} at {doc.company}
                      </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full max-h-[60vh] mt-4 pr-4">
                      <div className="prose prose-neutral prose-sm max-w-none">
                        <ReactMarkdown>{doc.content}</ReactMarkdown>
                      </div>
                    </ScrollArea>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => handleDownload(doc)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download .md
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" className="border-neutral-200" onClick={() => handleDownload(doc)}>
                  <Download className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-neutral-300 rounded-xl">
          <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-neutral-300" />
          </div>
          <p className="text-neutral-500 font-medium">No documents generated yet.</p>
          <p className="text-neutral-400 text-sm">Find a job and click "CV" or "Letter" to start.</p>
        </div>
      )}
    </div>
  );
}
