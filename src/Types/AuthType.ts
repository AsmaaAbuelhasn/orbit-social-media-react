import type { AxiosResponse } from "axios";
import type { ReactNode } from "react";
import type { MyData } from "../Interfaces/myData";

export interface AuthContextType{
    children:ReactNode
}
interface ProfileResponse {
  data: {
    user: MyData;
  };
}

export interface AuthContextInterface{
    token: string | null;
    userId:string | null
  data: AxiosResponse<ProfileResponse> | undefined,
    updateToken:(token:string)=>void
    removeToken:()=>void
}