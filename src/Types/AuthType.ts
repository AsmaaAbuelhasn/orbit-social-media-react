import type { ReactNode } from "react";

export interface AuthContextType{
    children:ReactNode
}

export interface AuthContextInterface{
    token: string | null;
    updateToken:(token:string)=>void
    removeToken:()=>void
}