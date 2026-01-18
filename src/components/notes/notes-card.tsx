import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { SavedNote } from "@/types/notes.types";
import { formatTimeWithTooltip } from "@/lib/time";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NotesCard = ({ notes }: { notes: SavedNote }) => {
  // Use the most recent timestamp between created_at and updated_at
  // For newly created notes, they should be the same, but this handles edge cases
  const timestamp = notes?.updated_at || notes?.created_at;
  const timeInfo = formatTimeWithTooltip(timestamp);

  return (
    <Link href={`/notes/${notes?.video_id}`} className="group">
      <Card className="max-w-full py-0 gap-2 cursor-pointer border-border bg-card hover:shadow-md transition-shadow duration-200">
        <CardHeader className="p-0">
          <Image
            src={notes?.video_thumbnail_url}
            width={200}
            height={120}
            alt={notes?.video_title || "Video Thumbnail"}
            className="w-full rounded-t-lg object-cover"
          />
        </CardHeader>
        <CardContent className="px-4 pt-4">
          <h3 className="text-base leading-6 font-semibold line-clamp-2 text-foreground group-hover:text-foreground">
            {notes?.video_title || "Video Title Not Available"}
          </h3>
        </CardContent>
        <CardFooter className="px-4 pb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant={"secondary"} className="cursor-help">
                  {timeInfo.relative}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{timeInfo.absolute}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NotesCard;