
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

//firebase config..
const firebaseConfig = {
  apiKey: "AIzaSyC-F0_CwQPjVD-DfDQ1GRJAUaTxBbj5YCQ",
  authDomain: "whatsup-c51c5.firebaseapp.com",
  projectId: "whatsup-c51c5",
  storageBucket: "whatsup-c51c5.appspot.com",
  messagingSenderId: "1042851364778",
  appId: "1:1042851364778:web:dd82eda0d0363a153635d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

