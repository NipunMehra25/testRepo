// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3QqcSjorot15cIGCTUsKN9a5TdqLfIsA",
  authDomain: "cyrus-699a2.firebaseapp.com",
  projectId: "cyrus-699a2",
  storageBucket: "cyrus-699a2.firebasestorage.app",
  messagingSenderId: "1064177761183",
  appId: "1:1064177761183:web:33de2c98019a2ce4bb9baa",
  measurementId: "G-MVSGXJWMNM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics (optional – works only on https / localhost)
export const analytics = getAnalytics(app);

// 🔐 AUTH
export const auth = getAuth(app);

// 🔑 Google Provider
export const googleProvider = new GoogleAuthProvider();
