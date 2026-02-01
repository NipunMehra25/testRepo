import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, googleProvider } from "../config/firebase";


// Google Login
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
};

// Email + Password Signup
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return result.user;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

// Email + Password Login
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return result.user;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  await signOut(auth);
};
