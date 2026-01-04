"use client";
import React, { useState, Suspense } from "react";
import Image from "next/image";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { useSearchParams } from 'next/navigation';

const AuthPageContent = () => {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden md:flex flex-col justify-center text-white px-8">
            <div className="mb-8">
              <Image src="/logo.png" alt="MMID Logo" width={128} height={128} style={{ width: 'auto', height: '4rem' }} className="mb-6" unoptimized />
              <h1 className="text-4xl font-bold mb-4">Welcome to MMID</h1>
              <p className="text-blue-200 text-lg leading-relaxed">
                Your trusted directory for local businesses, services, and community connections. Join thousands of users discovering and growing their networks.
              </p>
            </div>
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-blue-100">Easy to use and secure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-blue-100">Connect with your community</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-blue-100">Grow your business</span>
              </div>
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
            {/* Tab buttons */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setMode("signin")}
                className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-200 ${mode === "signin"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-200 ${mode === "signup"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Forms */}
            {mode === "signin" ? <SignInForm /> : <SignUpForm onSwitchToSignIn={() => setMode("signin")} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
};

export default AuthPage;
