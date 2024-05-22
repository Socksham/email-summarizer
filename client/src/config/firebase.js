// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbygfJqI3F1VuoKZ1iP9Brlr2OB-6174o",
  authDomain: "email-sysgte.firebaseapp.com",
  projectId: "email-sysgte",
  storageBucket: "email-sysgte.appspot.com",
  messagingSenderId: "365889645618",
  appId: "1:365889645618:web:3602f5be20656016b0e02b",
  measurementId: "G-ZZV6WWBV7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);