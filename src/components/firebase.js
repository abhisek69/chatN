// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfcdbVoGMQUTdaVHg7xox6cXLgdXPPxNc",
  authDomain: "chatn-2398c.firebaseapp.com",
  projectId: "chatn-2398c",
  storageBucket: "chatn-2398c.appspot.com",
  messagingSenderId: "39879519127",
  appId: "1:39879519127:web:c5f3ddb4c372c5887672d2",
  measurementId: "G-G9ZY8H1VGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;