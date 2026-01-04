'use client';

import { useState } from 'react';

export default function FeaturesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const features = [
    { title: 'Feature 1', description: 'Description of feature 1' },
    { title: 'Feature 2', description: 'Description of feature 2' },
    { title: 'Feature 3', description: 'Description of feature 3' },
  ];

  return (
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="border rounded">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left p-4 font-semibold hover:bg-gray-50"
          >
            {feature.title}
          </button>
          {openIndex === index && (
            <div className="p-4 border-t">{feature.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
