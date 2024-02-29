// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence, } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz_x95O4cNasM4IiHaXVFKex5gM1cnJWY",
  authDomain: "watchnlearntrial1.firebaseapp.com",
  projectId: "watchnlearntrial1",
  storageBucket: "watchnlearntrial1.appspot.com",
  messagingSenderId: "594191270659",
  appId: "1:594191270659:web:076ecef21b3c98c70a5f36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, db};

export default app;