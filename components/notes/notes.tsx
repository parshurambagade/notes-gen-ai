import React from "react";

const Notes = ({ children }: { children: React.ReactNode }) => {
  return (
    <section aria-label="Notes section" className=" min-h-[95vh]">
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  );
};

export default Notes;
