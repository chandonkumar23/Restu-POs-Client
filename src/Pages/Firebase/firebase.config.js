// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSPI0rxvogGYu-3V2nuoPFeACqdVsz024",
  authDomain: "restupos-24070.firebaseapp.com",
  projectId: "restupos-24070",
  storageBucket: "restupos-24070.firebasestorage.app",
  messagingSenderId: "677540985924",
  appId: "1:677540985924:web:1fa5338197c92e24105011"
};



// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
export default auth;