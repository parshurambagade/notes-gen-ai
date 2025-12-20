import { BookOpen, Clock } from "lucide-react";
import React from "react";
import type { NotesVideoHeadProps } from "@/types";
import NotesHeadButtons from "./notes-head-buttons";

const NotesVideoHead: React.FC<NotesVideoHeadProps> = ({
  videoData,
  notes,
}) => {
  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex fflex-row  gap-3 items-start md:items-center justify-between">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
            {videoData.title}
          </h1>
          <div className="flex w-full sm:w-max justify-between sm:justify-normal items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 ">
              <Clock className="w-3 md:w-4 h-3 md:h-4" />
              <span>{videoData.duration}</span>
            </div>
            <div className="flex items-center gap-1 ">
              <BookOpen className="w-3 md:w-4 h-3 md:h-4" />
              <span>{videoData.channel}</span>
            </div>
          </div>
        </div>
        <div className="flex">
          <NotesHeadButtons videoData={videoData} notes={notes} />
        </div>
      </div>
    </div>
  );
};

export default NotesVideoHead;
