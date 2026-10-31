import type { ReactNode } from "react";

export interface AuthContextType{
    children:ReactNode
}

export interface AuthContextInterface{
    token: string | null;
    userId:string | null
    data: undefined,
    updateToken:(token:string)=>void
    removeToken:()=>void
}