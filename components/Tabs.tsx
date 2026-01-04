'use client';

import { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 ${activeTab === index ? 'border-b-2 border-blue-500' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">
        Content for {tabs[activeTab]}
      </div>
    </div>
  );
}
