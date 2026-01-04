'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export const useAuthRedirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  // Check for any pending actions when session changes
  useEffect(() => {
    const executePendingAction = async () => {
      if (status === 'authenticated' && pendingAction) {
        setIsCheckingAuth(true);
        try {
          await pendingAction();
        } catch (error) {
          console.error('Error executing pending action:', error);
        } finally {
          setPendingAction(null);
          setIsCheckingAuth(false);
        }
      }
    };

    executePendingAction();
  }, [status, pendingAction]);

  const requireAuth = async (action: () => Promise<void>) => {
    if (status === 'loading') {
      return; // Wait for session to load
    }

    if (status === 'unauthenticated') {
      // Save form data to localStorage before redirecting
      const form = document.querySelector('form');
      if (form) {
        const formData = new FormData(form);
        const formValues: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
          formValues[key] = value;
        });
        localStorage.setItem('pendingListing', JSON.stringify(formValues));
      }

      // Set the pending action to execute after sign in
      setPendingAction(() => action);
      
      // Redirect to sign in
      signIn(undefined, { 
        callbackUrl: window.location.pathname,
      });
      return;
    }

    // If already authenticated, just execute the action
    try {
      await action();
    } catch (error) {
      console.error('Error in action:', error);
      throw error;
    }
  };

  // Load saved form data after sign in
  const loadSavedFormData = (form: HTMLFormElement) => {
    if (status === 'authenticated') {
      const savedData = localStorage.getItem('pendingListing');
      if (savedData) {
        try {
          const formData = JSON.parse(savedData);
          Object.entries(formData).forEach(([key, value]) => {
            const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement;
            if (input) {
              if (input.type === 'checkbox' || input.type === 'radio') {
                (input as HTMLInputElement).checked = true;
              } else {
                input.value = value as string;
              }
            }
          });
          // Clear the saved data after loading
          localStorage.removeItem('pendingListing');
        } catch (error) {
          console.error('Error loading saved form data:', error);
        }
      }
    }
  };

  return {
    requireAuth,
    loadSavedFormData,
    isCheckingAuth,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  };
};
