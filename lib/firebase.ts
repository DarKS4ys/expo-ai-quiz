// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr9qL9eiGbwzU-jG8e2v1W-ASQ_YFUkcw",
  authDomain: "ai-quiz-tr.firebaseapp.com",
  projectId: "ai-quiz-tr",
  storageBucket: "ai-quiz-tr.appspot.com",
  messagingSenderId: "674264946943",
  appId: "1:674264946943:web:582256e90c38c799cbd4ca",
  measurementId: "G-VNV65YPWJF"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)