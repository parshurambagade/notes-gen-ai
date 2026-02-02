import { VideoData } from "@/types/video.types";
import { ArrowLeft, BookOpen, Clock, Download, Link, MoreVerticalIcon, Save, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/auth-context";
import useNotes from "@/hooks/useNotes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/stores/global-store";
import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MobileNotesHead = ({ videoData }: { videoData: VideoData | null }) => {
    const { user } = useAuth();
    const { handleSaveNotes, isPending, notes, handleDeleteNotes } = useNotes();
    const { setShowLoginPopup } = useGlobalStore();
    const pathname = usePathname();

    const isSaved = pathname === `/notes/${videoData?.videoId}`;

    if (!videoData) return null;

    return (
        <div className="overflow-hidden flex justify-between items-center gap-2">
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="flex items-center gap-2 rounded-full border">
                    <ArrowLeft className=" text-black h-4 w-4" />
                </Button>
            </div>


            {/* VIDEO HEAD */}
            <div className="border-b border-border p-3 md:p-6 rounded-2xl border bg-card">
                <h1 className="text-xl md:text-3xl font-semibold text-foreground line-clamp-2">
                    {videoData?.title}
                </h1>
            </div>

            <div className="flex items-center justify-between">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" aria-label="Open menu" size="icon-sm">
                            <MoreVerticalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onSelect={() => {}}>
                               Save Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>Download</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    );
};

export default MobileNotesHead;
