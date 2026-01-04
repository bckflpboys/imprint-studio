'use client';

import { useState } from 'react';

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    { title: 'Item 1', content: 'Content for item 1' },
    { title: 'Item 2', content: 'Content for item 2' },
    { title: 'Item 3', content: 'Content for item 3' },
  ];

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border rounded">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left p-4 hover:bg-gray-50"
          >
            {item.title}
          </button>
          {openIndex === index && (
            <div className="p-4 border-t">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
