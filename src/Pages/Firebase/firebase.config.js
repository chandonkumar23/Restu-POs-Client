// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGuNrD7w2ueXcxVFxNdz4O2GOo3TfRpf0",
  authDomain: "pos-resturent.firebaseapp.com",
  projectId: "pos-resturent",
  storageBucket: "pos-resturent.firebasestorage.app",
  messagingSenderId: "962504976623",
  appId: "1:962504976623:web:56738bf137e571e232531a"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
export default auth;