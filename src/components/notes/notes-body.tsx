import { Activity } from "react";
import { Separator } from "../ui/separator";
import { Notes } from "@/types/notes.types";

const NotesBody = ({ notes }: { notes: Notes | null }) => {
  if (!notes) return null;

  return (
    <div className="border rounded-b-xl p-4 md:p-6">
      {/* NOTES SUMMARY */}
      <Activity mode={notes?.summary ? "visible" : "hidden"}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <p className="text-gray-700">{notes?.summary}</p>
        </div>
        <Separator className="my-8" />
      </Activity>

      {/* NOTES KEY POINTS */}
      <Activity mode={notes?.keyPoints ? "visible" : "hidden"}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Points</h2>
          <ul className="space-y-3">
            {notes?.keyPoints?.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />
                <span className="text-base text-gray-700 leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Activity>

      <Separator className="my-8" />

      {/* DETAILED NOTES */}
      <Activity mode={notes?.sections ? "visible" : "hidden"}>
        <div>
          <h2 className="text-xl font-semibold mb-6">Detailed Notes</h2>
          <div className="space-y-8">
            {notes?.sections?.map((section, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  {/* TODO: Add timestamp badge in future updates */}
                  {/* <Badge variant="outline" className="text-xs">
          {section.timestamp}
        </Badge> */}
                </div>
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  {section.content}
                </p>
                {section.subsections && (
                  <ul className="space-y-2 ml-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <li key={subIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0" />
                        <span className="text-gray-600 text-sm leading-relaxed">
                          <strong>{subsection?.subTopicTitle}:</strong>{" "}
                          {subsection.content}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Activity>
    </div>
  );
};

export default NotesBody;
