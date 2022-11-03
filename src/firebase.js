// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "secretproject-e6427.firebaseapp.com",
  projectId: "secretproject-e6427",
  storageBucket: "secretproject-e6427.appspot.com",
  messagingSenderId: "256703712799",
  appId: "1:256703712799:web:42727d5c6feee65a8c4f2a",
  measurementId: "G-93TP9SR89X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
