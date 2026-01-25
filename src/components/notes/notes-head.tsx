import { VideoData } from "@/types/video.types";
import { BookOpen, Clock, Download, Save, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/auth-context";
import useNotes from "@/hooks/useNotes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/stores/global-store";

const NotesHead = ({ videoData }: { videoData: VideoData | null }) => {
  const { user } = useAuth();
  const { handleSaveNotes, isPending, notes, handleDeleteNotes } = useNotes();
  const { setShowLoginPopup } = useGlobalStore();
  const pathname = usePathname();

  const isSaved = pathname === `/notes/${videoData?.videoId}`;

  if (!videoData) return null;

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      {/* VIDEO HEAD */}
      <div className="border-b border-border p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 line-clamp-2">
              {videoData?.title}
            </h1>
            <div className="flex w-full sm:w-max justify-between sm:justify-normal items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 md:w-4 h-3 md:h-4" />
                <span>{videoData?.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 md:w-4 h-3 md:h-4" />
                <span>{videoData?.channel}</span>
              </div>
            </div>
          </div>
          <div className="flex">
            {/* NOTES HEAD BUTTONS  */}
            <div className="flex w-full sm:w-max justify-center sm:justify-normal items-center gap-2">
              {!isSaved ? (
                <Button
                  aria-label={"Save Notes"}
                  onClick={() => {
                    if (!user) {
                      setShowLoginPopup(true);
                      return;
                    }
                    handleSaveNotes(notes);
                  }}
                  disabled={isPending}
                  className={cn(
                    "flex text-base cursor-pointer gap-2 flex-1 sm:w-max",
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  <Save className="w-3 md:w-4 h-3 md:h-4" />
                  <span className="inline text-sm">
                    {isPending ? "Saving..." : "Save Notes"}
                  </span>
                </Button>
              ) : (
                <Button
                  aria-label={"Delete Notes"}
                  onClick={() => {
                    if (!user) {
                      setShowLoginPopup(true);
                      return;
                    } else {
                      if (isSaved) {
                        handleDeleteNotes(videoData?.videoId);
                      }
                    }
                  }}
                  disabled={isPending}
                  variant="destructive"
                  className={cn(
                    "flex text-base cursor-pointer gap-2 flex-1 sm:w-max",
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  <Trash className="w-3 md:w-4 h-3 md:h-4" />
                  <span className="inline text-sm">
                    {isPending ? "Deleting..." : "Delete Notes"}
                  </span>
                </Button>
              )}

              {/* Download Notes Button */}
              <Button
                disabled={true}
                aria-label={"Download Notes"}
                onClick={() => {}}
                className="flex-1 sm:w-max"
              >
                <Download className="w-3 md:w-4 h-3 md:h-4" />
                <span className="inline text-sm">
                  {/* {isPending ? "Downloading..." : "Download Notes"} */}
                  Download Notes
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NotesHead;
