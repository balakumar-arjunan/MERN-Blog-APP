// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-25208.firebaseapp.com",
  projectId: "mern-blog-25208",
  storageBucket: "mern-blog-25208.firebasestorage.app",
  messagingSenderId: "839877581140",
  appId: "1:839877581140:web:ce5dc193d87d8c9a6e10c1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
