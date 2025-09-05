import { useContext } from "react";
import { DataContext } from "../DataProvider";

export default function useUser() {
  const { setUser } = useContext(DataContext);

  const login = async (userData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    

    if (res.ok) {
      const user = await res.json();
      setUser(user);
      return 1;
    } else {
      return 0;
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return { login, logout };
}
