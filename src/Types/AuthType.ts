import type { AxiosResponse } from "axios";
import type { ReactNode } from "react";
import type { User } from "../Interfaces/Post";

export interface AuthContextType{
    children:ReactNode
}
interface ProfileResponse {
  data: {
    user: User;
  };
}

export interface AuthContextInterface{
    token: string | null;
    userId:string | null
  data: AxiosResponse<ProfileResponse> | undefined,
    updateToken:(token:string)=>void
    removeToken:()=>void
}