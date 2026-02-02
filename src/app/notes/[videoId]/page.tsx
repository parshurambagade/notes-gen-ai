"use client";

import Notes from "@/components/notes/notes";
import useNotes from "@/hooks/useNotes";
import { useGlobalStore } from "@/stores/global-store";
import { VideoData } from "@/types/video.types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

const NotesPage = () => {
  const { videoId } = useParams();
  const { notes, videoData, setNotes, setVideoData } = useGlobalStore();
  const { user, isLoading: isAuthLoading } = useAuth();

  const { getNotes, isPending, error } = useNotes();

  useEffect(() => {
    // Wait for auth to finish loading
    if (isAuthLoading) return;

    // Ensure videoId is valid
    if (!videoId || typeof videoId !== "string") return;

    // Ensure user is logged in
    if (!user?.id) return;

    // Skip if we already have the data for this videoId
    if (videoId === videoData?.videoId) return;

    getNotes(videoId).then((notes) => {
      if (notes) {
        setNotes(JSON.parse(notes.content as unknown as string));
        setVideoData({
          title: notes.video_title,
          videoId: notes.video_id,
          duration: notes.video_duration as string,
          channel: notes.video_channel,
          thumbnailUrl: notes.video_thumbnail_url,
        } as VideoData);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoading, user?.id, videoId]);

  return (
    <main className="min-h-screen pt-16 md:pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="hidden md:flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href="/notes/all" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all notes
            </Link>
          </Button>
        </div>

        {(isAuthLoading || isPending) && (
          <div className="text-sm text-muted-foreground">Loading notes…</div>
        )}
        {error && <div className="text-sm text-destructive">Error: {error}</div>}
        {!isAuthLoading && !isPending && !error && (
          <Notes notes={notes} videoData={videoData || null} />
        )}
      </div>
    </main>
  );
};

export default NotesPage;