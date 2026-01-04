import React from "react";
import Image from "next/image";

const steps = [
  {
    title: "1- Claimed",
    description:
      "Best way to start managing your business listing is by claiming it so you can update.",
  },
  {
    title: "2- Promote",
    description:
      "Promote your business to target customers who need your services or products.",
  },
  {
    title: "3- Convert",
    description:
      "Turn your visitors into paying customers with exciting offers and services on your page.",
  },
];

const ClaimPromoteConvert = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 px-4">
        {/* Image on the left with blue accent bar */}
        <div className="flex-1 flex justify-center relative mb-10 md:mb-0">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 hidden md:block">
            <div className="h-64 w-3 rounded-xl bg-blue-400 shadow-lg" />
          </div>
          <Image
            src="/dash.png"
            alt="Dashboard Example"
            width={500}
            height={400}
            className="rounded-2xl shadow-2xl max-w-full h-auto border-4 border-white"
            style={{ minWidth: 320, maxWidth: 500 }}
          />
        </div>
        {/* Steps on the right in a card */}
        <div className="flex-1 flex flex-col items-start bg-white rounded-2xl shadow-xl border border-blue-100 px-8 py-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 text-left leading-tight">
            List, Claim & Get Started Today!
          </h2>
          <p className="text-lg text-gray-500 mb-10 text-left">
            Nearly 80% of consumers turn to directories with reviews to find a local business.
          </p>
          <div className="space-y-8 w-full">
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {i + 1}
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-800 mb-1">{step.title.replace(/^[0-9]+- /, "")}</div>
                  <div className="text-gray-500 text-base leading-relaxed">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimPromoteConvert;
