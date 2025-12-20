import React from "react";

interface KeyPointsProps {
  keyPoints: string[];
}
const KeyPoints: React.FC<KeyPointsProps> = ({ keyPoints }) => {
  if (!keyPoints || keyPoints.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Key Points</h2>
      <ul className="space-y-3">
        {keyPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            <span className="text-base text-gray-700 leading-relaxed">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyPoints;
