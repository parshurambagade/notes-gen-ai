import React from "react";
import DeleteConfirmationDialog from "./delete-confirmation-dialog";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import useNotesHead from "@/hooks/useNotesHead";
import { NotesHeadButtonsProps } from "@/types";

const NotesHeadButtons = ({ videoData, notes }: NotesHeadButtonsProps) => {
  const { handleSave, isSaving, isSaved } = useNotesHead(videoData, notes);

  return (
    <div className="flex w-full sm:w-max justify-end sm:justify-normal items-center gap-2">
      {/* TODO: Add download, share and edit notes functionality in future updates */}

      {isSaved ? (
        <DeleteConfirmationDialog videoId={videoData?.videoId || ""} />
      ) : (
        <>
          <Button
            aria-label="Save Notes"
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className={
              "flex text-base cursor-pointer flex gap-2" +
              (isSaved ? "bg-green-600 hover:bg-green-700" : "")
            }
          >
            <Save className="w-3 md:w-4 h-3 md:h-4" />
            <span className="hidden md:inline">
              {isSaved ? "Saved!" : isSaving ? "Saving Notes" : "Save Notes"}
            </span>
          </Button>
        </>
      )}
    </div>
  );
};

export default NotesHeadButtons;
