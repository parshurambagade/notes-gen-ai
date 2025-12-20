import { DetailedNotesProps } from "@/types";
import React from "react";

const DetailedNotes: React.FC<DetailedNotesProps> = ({ sections }) => {
  if (!sections || sections.length === 0) {
    return <p className="text-gray-500">No detailed notes available.</p>;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Detailed Notes</h2>
      <div className="space-y-8">
        {sections.map((section, index) => (
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
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
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
  );
};

export default DetailedNotes;
