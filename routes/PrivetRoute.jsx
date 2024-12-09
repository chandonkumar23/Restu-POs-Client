/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { AuthContext } from '../src/Provider/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';


const PrivetRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    if (loading){
        return <span className="loading loading-bars loading-lg">Please wait</span>
    }
    if(user){
        return children;
    }
    return (
        <Navigate to="/login" state={{from: location}} replace >

        </Navigate>
            
       
    );
};

export default PrivetRoute;