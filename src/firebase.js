// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "udemymongo.firebaseapp.com",
  projectId: "udemymongo",
  storageBucket: "udemymongo.appspot.com",
  messagingSenderId: "501258507255",
  appId: process.env.REACT_APP_API,
  measurementId: "G-8BZJ8XX1G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app