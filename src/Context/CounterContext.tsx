import { createContext, useState } from "react"


let CounterContext=createContext();
export default function CounterContextProvider({children}) {
    let [counter,setCounter]=useState(0);
  return (
   <CounterContext.Provider value={{counter}}>
    {children}
   </CounterContext.Provider>
  )
}
