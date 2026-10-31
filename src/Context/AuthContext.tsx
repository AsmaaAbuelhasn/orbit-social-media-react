
import { createContext, useEffect, useState } from "react";
import type { AuthContextInterface, AuthContextType } from "../Types/AuthType";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

export let AuthContext = createContext<AuthContextInterface>({
  token: null,
  userId: "",
  data: undefined,

  updateToken() {},

  removeToken() {},
});

export default function AuthContextProvider({ children }: AuthContextType) {
  const [userId, setUserId] = useState("");

  // Lazy initialization
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // Update Token
  function updateToken(token: string) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  // Remove Token
  function removeToken() {
    setToken(null);
    localStorage.removeItem("token");
    setUserId("");
  }

  // Decode Token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ user: string }>(token);
        setUserId(decoded.user);
      } catch {
        removeToken();
      }
    }
  }, [token]);

  // Get Profile
  function getMyProfile() {
    return axios.get(
      "https://route-posts.routemisr.com/users/profile-data",
      {
        headers: {
          token,
        },
      }
    );
  }

  const { data } = useQuery({
    queryKey: ["myProfile", token],
    queryFn: getMyProfile,
    enabled: !!token,
  });

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        data,
        updateToken,
        removeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}