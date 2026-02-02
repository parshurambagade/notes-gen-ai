import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RegenerateNotesAlert = ({
  open,
  setOpen,
  onReplaceNotes,
  variant = "replace-notes",
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onReplaceNotes: () => void;
  variant?: "replace-notes" | "save-notes";
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Notes found! Replace Notes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have notes saved for this video. Do you want to replace them
            with the new notes?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onReplaceNotes}>
            Replace Notes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RegenerateNotesAlert;
