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
import { SavedNote } from "@/types";
import { formatTimeWithTooltip } from "@/utils/time";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NotesCard = ({ notes }: { notes: SavedNote }) => {
  const timeInfo = formatTimeWithTooltip(notes?.updated_at);

  return (
    <Link href={`/notes/${notes?.video_id}`}>
      <Card className="max-w-full py-0 gap-2 cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="p-0">
          <Image
            src={notes?.video_thumbnail_url}
            width={200}
            height={120}
            alt={notes?.video_title || "Video Thumbnail"}
            className="w-full rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="px-4 ">
          <h3 className="text-lg leading-6 font-[700] line-clamp-1">
            {notes?.video_title || "Video Title Not Available"}
          </h3>
        </CardContent>
        <CardFooter className="px-4 pb-4 ">
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
