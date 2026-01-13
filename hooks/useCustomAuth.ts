"use client";

import { useSignIn, useSignUp, useAuth } from "@clerk/nextjs";
import { useState } from "react";

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  pendingVerification: boolean;
}

export interface SignUpData {
  email: string;
  firstName?: string;
  lastName?: string;
}

export const useCustomSignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    error: null,
    pendingVerification: false,
  });

  const signInWithOAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_microsoft"
  ) => {
    if (!isLoaded) return;

    setState({ isLoading: true, error: null, pendingVerification: false });

    try {
      // Check for referral code in URL and store it
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get("ref");
      if (referralCode) {
        localStorage.setItem("pendingReferralCode", referralCode);
      }

      // Use authenticateWithRedirect but with immediate navigation
      // This approach reduces the chance of blank screens
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/focus`,
      });

      // The function will not return after redirect, but we set loading to false
      // in case there's any delay
      setState({ isLoading: false, error: null, pendingVerification: false });
      return { success: true };
    } catch (err: any) {
      setState({
        isLoading: false,
        error:
          err.errors?.[0]?.message || "An error occurred during OAuth sign in",
        pendingVerification: false,
      });
      return { success: false, error: err };
    }
  };

  const signInWithEmailCode = async (email: string) => {
    if (!isLoaded) return;

    setState({ isLoading: true, error: null, pendingVerification: false });

    try {
      const result = await signIn.create({
        identifier: email,
      });

      const emailCodeStrategy = result.supportedFirstFactors?.find(
        (strategy) => strategy.strategy === "email_code"
      );

      if (emailCodeStrategy) {
        await result.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: emailCodeStrategy.emailAddressId,
        });
        setState({ isLoading: false, error: null, pendingVerification: true });
        return { success: true, pendingVerification: true };
      } else {
        setState({
          isLoading: false,
          error: "Email code authentication not available",
          pendingVerification: false,
        });
        return { success: false };
      }
    } catch (err: any) {
      setState({
        isLoading: false,
        error: err.errors?.[0]?.message || "An error occurred",
        pendingVerification: false,
      });
      return { success: false, error: err };
    }
  };

  const verifyEmailCode = async (code: string) => {
    if (!isLoaded) return;

    setState({ isLoading: true, error: null, pendingVerification: true });

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setState({ isLoading: false, error: null, pendingVerification: false });
        return { success: true };
      } else {
        setState({
          isLoading: false,
          error: "Verification incomplete",
          pendingVerification: true,
        });
        return { success: false };
      }
    } catch (err: any) {
      setState({
        isLoading: false,
        error: err.errors?.[0]?.message || "Invalid verification code",
        pendingVerification: true,
      });
      return { success: false, error: err };
    }
  };

  return {
    signInWithOAuth,
    signInWithEmailCode,
    verifyEmailCode,
    ...state,
  };
};

export const useCustomSignUp = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    error: null,
    pendingVerification: false,
  });

  const signUpWithOAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_microsoft"
  ) => {
    if (!isLoaded) return;

    setState({ isLoading: true, error: null, pendingVerification: false });

    try {
      // Check for referral code in URL and store it
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get("ref");
      if (referralCode) {
        localStorage.setItem("pendingReferralCode", referralCode);
      }

      // Use authenticateWithRedirect but with full origin URLs
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/focus`,
      });

      // The function will not return after redirect
      setState({ isLoading: false, error: null, pendingVerification: false });
      return { success: true };
    } catch (err: any) {
      setState({
        isLoading: false,
        error:
          err.errors?.[0]?.message || "An error occurred during OAuth sign up",
        pendingVerification: false,
      });
      return { success: false, error: err };
    }
  };

  const createUser = async ({ email, firstName, lastName }: SignUpData) => {
    if (!isLoaded) return;

    setState({ isLoading: true, error: null, pendingVerification: false });

    try {
      const result = await signUp.create({
        emailAddress: email,
        firstName,
        lastName,
      });

      // For passwordless signup, we need to verify email
      await result.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setState({ isLoading: false, error: null, pendingVerification: true });
      return { success: true, pendingVerification: true };
    } catch (err: any) {
      setState({
        isLoading: false,
        error: err.errors?.[0]?.message || "An error occurred during sign up",
        pendingVerification: false,
      });
      return { success: false, error: err };
    }
  };

  const verifyEmail = async (code: string) => {
    if (!isLoaded) return;

    setState({ isLoading: true, error: null, pendingVerification: true });

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setState({ isLoading: false, error: null, pendingVerification: false });
        return { success: true };
      } else {
        setState({
          isLoading: false,
          error: "Verification incomplete",
          pendingVerification: true,
        });
        return { success: false };
      }
    } catch (err: any) {
      setState({
        isLoading: false,
        error: err.errors?.[0]?.message || "Invalid verification code",
        pendingVerification: true,
      });
      return { success: false, error: err };
    }
  };

  return {
    signUpWithOAuth,
    createUser,
    verifyEmail,
    ...state,
  };
};

export const useCustomAuth = () => {
  const { isLoaded, isSignedIn, userId } = useAuth();

  return {
    isLoaded,
    isSignedIn,
    userId,
  };
};
