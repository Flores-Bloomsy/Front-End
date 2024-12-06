import { useEffect, useState } from "react";

export function useGetUser() {
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const hastoken = localStorage.getItem("Token");
      if (hastoken) {
        setToken(hastoken);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (token) {
      const payloadString = token.split(".")[1];
      const payloadJsonAsString = atob(payloadString);
      const payloadJson = JSON.parse(payloadJsonAsString);
      console.log(payloadJson.id);
      setUser(payloadJson);
    }
  }, [token]);

  return user;
}
