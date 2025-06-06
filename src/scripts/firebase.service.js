// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

console.log(import.meta.env);

const env = import.meta.env;
 

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app = null;

initializeFirebase();

function initializeFirebase() {
    if (!app) {
        app = initializeApp(firebaseConfig);
    }
}

export default  app;