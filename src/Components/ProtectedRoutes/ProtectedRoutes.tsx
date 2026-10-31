import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {

    let token=localStorage.getItem("token");
    if(!token){

        //got to login
        return <Navigate to="/auth/login" />
    }

  return (
    <div>
      {children}
    </div>
  )
}
