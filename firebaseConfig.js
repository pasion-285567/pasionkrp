// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAMWLEC6YcTnx53CXZReR7E67-SIJCzBwI",
  authDomain: "bro-raymund.firebaseapp.com",
  databaseURL: "https://bro-raymund-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bro-raymund",
  storageBucket: "bro-raymund.firebasestorage.app",
  messagingSenderId: "415894158344",
  appId: "1:415894158344:web:20c3298dce4c4235b5e5bd",
  measurementId: "G-9YCPZ7BJSH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);