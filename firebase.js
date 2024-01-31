// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence, } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD939qUqn4p_9wuFXNuGGObPibVfLvnLLY",
  authDomain: "watchnlearntrial.firebaseapp.com",
  projectId: "watchnlearntrial",
  storageBucket: "watchnlearntrial.appspot.com",
  messagingSenderId: "993508798548",
  appId: "1:993508798548:web:c7a2ca286dd8ec8cce3dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, db};

export default app;