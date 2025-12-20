import React from "react";

const NotesHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-hidden py-0 gap-0 rounded-b-none border-b-0 border rounded-t-xl">
      {children}
    </div>
  );
};

export default NotesHead;
