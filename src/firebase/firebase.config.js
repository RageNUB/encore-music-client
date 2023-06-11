// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAHIU--MjfgBW9U8bCmawGA-pKT6DUrKc",
  authDomain: "encore-music-academy.firebaseapp.com",
  projectId: "encore-music-academy",
  storageBucket: "encore-music-academy.appspot.com",
  messagingSenderId: "936213699131",
  appId: "1:936213699131:web:fa8f595c9c7e0715b25a1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;