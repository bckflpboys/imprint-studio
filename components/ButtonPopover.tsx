'use client';

import { useState } from 'react';

export default function ButtonPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Popover
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border rounded shadow-lg p-4">
          <p>Popover content</p>
        </div>
      )}
    </div>
  );
}
