import React from 'react';

const topics = [
  { text: "4.6 - Monetary Policy", tag: "macro" },
  { text: "3.9 - Perfect Competition", tag: "micro" },
  { text: "2.4 - Price Elasticity of Demand", tag: "micro" },
  { text: "5.2 - Foreign Exchange Markets", tag: "macro" },
  { text: "1.3 - Production Possibilities Curve", tag: "micro" },
  { text: "3.2 - Market Failures", tag: "micro" },
  { text: "4.3 - Banking and the Money Supply", tag: "macro" },
  { text: "2.1 - Consumer Choice Theory", tag: "micro" },
  { text: "5.4 - Balance of Payments", tag: "macro" }
];

const PopularTopics = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow
                       bg-white cursor-pointer hover:bg-gray-50 relative h-24"
          >
            <div className="flex justify-between items-start h-full">
              <span className="text-base font-bold text-black pr-16">{topic.text}</span>
              <span className={`absolute top-4 right-4 px-2 py-1 text-xs rounded-full ${
                topic.tag === 'micro' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {topic.tag.charAt(0).toUpperCase() + topic.tag.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularTopics; 