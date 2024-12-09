/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../Pages/Firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    const createUser = (email, password) =>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth,email, password);
    }
   const signin = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
   }
   const logOut = () =>{
    setLoading(true);
    return signOut(auth)
   }
   const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    });
  }
    useEffect (()=>{
      const unsub = onAuthStateChanged(auth,CurrentUser =>{
        setUser(CurrentUser);
        console.log('current user', CurrentUser);
        setLoading(false);
      });
      return () =>{
        return unsub();
      }
    },[])


    const authInfo = {
        user,
        loading,
        createUser,
        signin,
        logOut,
        updateUserProfile

    }
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;