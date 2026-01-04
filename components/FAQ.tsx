'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: 'What is this?', answer: 'This is a Next.js template.' },
    { question: 'How do I use it?', answer: 'Clone the repo and start building!' },
    { question: 'Is it free?', answer: 'Yes, it is completely free to use.' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-4 font-semibold hover:bg-gray-50"
              >
                {faq.question}
              </button>
              {openIndex === index && (
                <div className="p-4 border-t">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
