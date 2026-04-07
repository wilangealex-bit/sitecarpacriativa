import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDfvuMkcJ6ftOZKKQOml9XBrYCESQ22t9U",
  authDomain: "sitecarpacriativa.firebaseapp.com",
  databaseURL: "https://sitecarpacriativa-default-rtdb.firebaseio.com",
  projectId: "sitecarpacriativa",
  storageBucket: "sitecarpacriativa.firebasestorage.app",
  messagingSenderId: "688889646707",
  appId: "1:688889646707:web:ebaf623676d6cb28412406",
  measurementId: "G-PNSHXE998S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);
