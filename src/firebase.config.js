// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"//////your api key//// ",
  authDomain: "//////your authDomain////",
  projectId: "//////your projectId////",
  storageBucket: "//////your  storageBucket////",
  messagingSenderId: "//////your messagingSenderId////",
  appId: "//////your appIdy////",
  measurementId: "//////your measurementId////",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
