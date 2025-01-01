// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  connectAuthEmulator,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvc2rK6TDuYalnRtl_8I8M70YAysDRItk",
  authDomain: "wathnlearntest02.firebaseapp.com",
  projectId: "wathnlearntest02",
  storageBucket: "wathnlearntest02.firebasestorage.app",
  messagingSenderId: "597254930875",
  appId: "1:597254930875:web:820a2f55feb6b8c481849e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom settings
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Functions
const functions = getFunctions(app);


export { auth, db, app, functions, httpsCallable };
