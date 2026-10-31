import { Navigate } from 'react-router-dom';
import type { ReactNode } from "react";

type ProtectedRoutesProps = {
  children: ReactNode;
};
export default function ProtectedRoutes({children}:ProtectedRoutesProps) {

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
