"use client";

import Notes from '@/components/notes/notes';
import useNotes from '@/hooks/useNotes';
import { useGlobalStore } from '@/stores/global-store';
import type { Notes as NotesType } from '@/types/notes.types';
import { VideoData } from '@/types/video.types';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

const NotesPage = () => {
  const { videoId } = useParams();
  const { notes, videoData, setNotes, setVideoData } = useGlobalStore();

  const { getNotes, isPending, error } = useNotes();

  useEffect(() => {
    if (videoId === videoData?.videoId) return;

    getNotes(videoId as string).then((notes) => {
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
  }, [videoId]);

  return (
    <main className='min-h-screen py-12 lg:py-24'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Notes notes={notes} videoData={videoData || null} />
    </main>
  )
}

export default NotesPage