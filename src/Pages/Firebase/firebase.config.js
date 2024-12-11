
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY4mjV0nwufbnu-pKALvfIJL36Y47v0r8",
  authDomain: "restupos-2.firebaseapp.com",
  databaseURL: "https://restupos-2-default-rtdb.firebaseio.com",
  projectId: "restupos-2",
  storageBucket: "restupos-2.firebasestorage.app",
  messagingSenderId: "491030551030",
  appId: "1:491030551030:web:fe3cc7f6e796e8e3ec0fd7"
};



// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
export default auth;