import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import AppIntro from '../../Components/AppIntro/AppIntro'

export default function AuthLayOut() {
let {pathname}=useLocation()
const[mode,setMode]=useState(pathname)
/*useEffect(()=>{
  if(pathname=="/auth/login" || pathname=="/auth/signup") setMode(pathname)
},[pathname])*/


  return <>
  <main className=" grid grid-cols-12  min-h-screen">
  <div className="hidden  md:block xl:block md:col-span-4 xl:col-span-4 ">
  <AppIntro/>
  </div>
  

  <section className=' rounded-xl bg-orbit-paper col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-8'>
    <div className="bg-white xl:w-1/2  sm:p-6 sm:w-3/4 rounded-2xl m-auto my-10 ">
      <div className="flex mb-5 p-4 justify-around bg-orbit-paper rounded-2xl ">

        <NavLink
      to="/auth/login"
      onClick={()=>setMode("/auth/login")}
      className={`   rounded-lg p-2 w-full text-center font-extrabold text-[14px] transform ${mode=="/auth/login"||mode=="/auth/" ? "bg-orbit-ink text-orbit-paper" :"text-orbit-lead hover:text-orbit-ink "} `}>
        LogIn
      </NavLink>
      
        <NavLink
      to="signup"
       onClick={()=>setMode("/auth/signup")}
      className={`   rounded-lg p-2 text-center w-full font-extrabold text-[14px] ${mode=="/auth/signup" ? "bg-orbit-ink text-orbit-paper" :"text-orbit-lead hover:text-orbit-ink"} `}>
        SignUp
      </NavLink>
      </div>

      
      <Outlet/>
    </div>


  </section>
  
  
    

  </main>
 
  </>
}
