import React from "react";

const NotesBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="border rounded-b-xl p-4 md:p-6">{children}</div>;
};

export default NotesBody;
