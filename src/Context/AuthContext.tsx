import { createContext, useEffect, useState, type ReactNode } from "react"
import type {AuthContextInterface, AuthContextType } from "../Types/AuthType";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type {User} from '../Interfaces/myData'
import { jwtDecode } from "jwt-decode";

export let AuthContext = createContext<AuthContextInterface>(
  {
    token:'',
    updateToken(token:string){},
    removeToken(){
    }
});
export default function AuthContextProvider({children}:AuthContextType){
  let [userId,setUserId]=useState("")
    let [token,setToken]=useState(function(){return localStorage.getItem("token")});//lazy state initialization
    function updateToken(token:string){
        setToken(token)
        localStorage.setItem("token",token)
    }
    function removeToken(){
      localStorage.removeItem("token")
    }

    function getMyProfile(){
      return axios('https://route-posts.routemisr.com/users/profile-data',
       { headers:{
          token: token
        }}
      )
     }
   
     useEffect(()=>{
             if(token){
         let decoded = jwtDecode(token);
         console.log(decoded)
         setUserId(decoded.user)
         
    
     }
     },[token])


      let {error , data}=useQuery({
       queryKey:['myProfile'],
       queryFn:getMyProfile,
       
      })

  return(
    <AuthContext.Provider value={{token,updateToken,removeToken,data,userId}}>
      {children}
    </AuthContext.Provider>
  )
}
