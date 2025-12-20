"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useRecentlyGeneratedNotesStore from "@/stores/recently-generated-notes-store";
import { useRouter } from "next/navigation";
import { formatRelativeTime } from "@/utils/time";
import { Clock, FileText, Trash2 } from "lucide-react";

const RecentlyGeneratedSection: React.FC = () => {
  const router = useRouter();
  const {
    getAllGeneratedNotes,
    removeGeneratedNote,
    clearGeneratedNotes,
    cleanupOldEntries,
  } = useRecentlyGeneratedNotesStore();

  // Clean up old entries when component mounts
  React.useEffect(() => {
    cleanupOldEntries();
  }, [cleanupOldEntries]);

  const recentlyGeneratedNotes = getAllGeneratedNotes();

  if (recentlyGeneratedNotes.length === 0) {
    return null;
  }

  const handleViewNotes = (videoId: string) => {
    router.push(`/notes/generate/${videoId}`);
  };

  const handleRemoveNote = (
    videoId: string,
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    event.stopPropagation();
    removeGeneratedNote(videoId);
  };

  const handleClearAll = () => {
    clearGeneratedNotes();
  };

  return (
    <section className="w-full max-w-2xl mx-auto mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl sm:text-2xl font-bold">
            Recently Generated Notes
          </h2>
          <Badge variant="secondary" className="ml-2">
            {recentlyGeneratedNotes.length}
          </Badge>
        </div>
        {recentlyGeneratedNotes.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            aria-label="Clear all cached notes"
            className="cursor-pointer text-red-600 hover:text-red-700 w-full sm:w-auto"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="sm:inline">Clear All</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        {recentlyGeneratedNotes.slice(0, 6).map((note) => (
          <Card
            key={note.videoId}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleViewNotes(note.videoId)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleViewNotes(note.videoId);
              }
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm font-medium line-clamp-2 leading-tight">
                  {note.videoData?.title || `Video ${note.videoId}`}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-500 hover:text-red-600 flex-shrink-0"
                  onClick={(e) => handleRemoveNote(note.videoId, e)}
                  aria-label="Remove from cache"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRemoveNote(note.videoId, e);
                    }
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              {note.videoData?.channel && (
                <p className="text-xs text-muted-foreground">
                  {note.videoData.channel}
                </p>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatRelativeTime(new Date(note.generatedAt))}</span>
                </div>
                {note.videoData?.duration && (
                  <Badge variant="outline" className="text-xs w-fit">
                    {note.videoData.duration}
                  </Badge>
                )}
              </div>

              {note.notesData.summary && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {note.notesData.summary}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{note.notesData.sections?.length || 0} sections</span>
                  <span>•</span>
                  <span>
                    {note.notesData.keyPoints?.length || 0} key points
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs w-fit">
                  Cached
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recentlyGeneratedNotes.length > 6 && (
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Showing 6 of {recentlyGeneratedNotes.length} recently generated
            notes
          </p>
        </div>
      )}
    </section>
  );
};

export default RecentlyGeneratedSection;
