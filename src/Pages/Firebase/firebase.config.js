// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqxkBxtcp4kXqXcET1eST-f_JtyB9yiVE",
  authDomain: "roamreels-technologies.firebaseapp.com",
  projectId: "roamreels-technologies",
  storageBucket: "roamreels-technologies.firebasestorage.app",
  messagingSenderId: "862212208088",
  appId: "1:862212208088:web:fa65ba35257b65e0e6eead",
  measurementId: "G-F4J9DEL9BR"
};



// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
export default auth;