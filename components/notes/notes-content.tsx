import React from "react";
import { Badge } from "../ui/badge";

const NotesContent = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="border rounded-b-xl p-4 md:p-6 py-0 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Generated Notes</h2>
        <Badge variant="outline" className="text-green-600 border-green-600">
          AI Generated
        </Badge>
      </div>
      {children}
    </div>
  );
};

export default NotesContent;
