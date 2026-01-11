import { YOUTUBE_EMBED_URL } from "@/constants";
import { VideoData } from "@/types/video.types";
import { BookOpen, Clock, Save } from "lucide-react";
import { Button } from "../ui/button";

const NotesHead = ({ videoData }: { videoData: VideoData | null }) => {
  if (!videoData) return null;

  return (
    <div className="overflow-hidden py-0 gap-0 rounded-b-none border-b-0 border rounded-t-xl">
      {/* VIDEO HEAD */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex fflex-row  gap-3 items-start md:items-center justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
              {videoData?.title}
            </h1>
            <div className="flex w-full sm:w-max justify-between sm:justify-normal items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1 ">
                <Clock className="w-3 md:w-4 h-3 md:h-4" />
                <span>{videoData?.duration}</span>
              </div>
              <div className="flex items-center gap-1 ">
                <BookOpen className="w-3 md:w-4 h-3 md:h-4" />
                <span>{videoData?.channel}</span>
              </div>
            </div>
          </div>
          <div className="flex">
            {/* NOTES HEAD BUTTONS  */}
            <div className="flex w-full sm:w-max justify-end sm:justify-normal items-center gap-2">
              <Button
                aria-label="Save Notes"
                // onClick={handleSave}
                // disabled={isSaving || isSaved}
                className={
                  "flex text-base cursor-pointer gap-2"
                  // +
                  // (isSaved ? "bg-green-600 hover:bg-green-700" : "")
                }
              >
                <Save className="w-3 md:w-4 h-3 md:h-4" />
                <span className="hidden md:inline">Save Notes</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* VIDEO PLAYER */}
      <div className="relative aspect-video">
        <iframe
          src={`${YOUTUBE_EMBED_URL}/${videoData?.videoId}`}
          title={videoData?.title}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};

export default NotesHead;
