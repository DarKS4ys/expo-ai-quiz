// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);