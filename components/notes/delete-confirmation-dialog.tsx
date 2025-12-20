import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteNotes } from "@/hooks/useDeleteNotes";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const DeleteConfirmationDialog = ({ videoId }: { videoId: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { deleteNotes, isDeleting, isDeleted } = useDeleteNotes();

  const handleDelete = async () => {
    if (!videoId.length || !videoId) {
      toast.error("Cannot save: Missing video data or notes");
      return;
    }

    await deleteNotes(videoId);
    setOpen(false);
    router.replace("/notes/all");
  };

  if (!videoId || videoId.length === 0) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        aria-label="Delete Notes"
        disabled={isDeleted || isDeleting}
        className="cursor-pointer px-3 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
      >
        <Trash2 className="h-4 w-4" />
        <span className="hidden md:inline">
          {isDeleting ? "Deleting Notes" : "Delete Notes"}
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you really want to delete notes?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            notes and you will not be able to recover them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
