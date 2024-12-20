/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,  updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../Pages/Firebase/firebase.config";
import UserAxios from "../../../routes/UserAxios";


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const axiosPublic = UserAxios();

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
        if(CurrentUser){
          //get token abd store client
          const userInfo = {email: CurrentUser.email};
          axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if(res.data.token){
              localStorage.setItem('access-token', res.data.token);
            }
          })
        }
        else{
          // TODO: remove token
          localStorage.removeItem('access-token');
        }
        
        setLoading(false);
      });
      return () =>{
        return unsub();
      }
    },[axiosPublic])


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