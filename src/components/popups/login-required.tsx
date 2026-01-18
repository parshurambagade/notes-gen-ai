import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
  
  export function LoginRequiredPopup({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const router = useRouter();
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="w-full max-w-sm! p-4!">
          <AlertDialogHeader>
            <AlertDialogTitle>Login Required</AlertDialogTitle>
            <AlertDialogDescription>
            You need to login to perform this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer!" onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer!" onClick={() => router.push("/auth/login")}>Login</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  