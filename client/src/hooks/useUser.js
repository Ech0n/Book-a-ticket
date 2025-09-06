import { useContext } from "react";
import { DataContext } from "../DataProvider";

export default function useUser() {
  const { setUser, fetchUser, setUserEvents, getEventsByUser } =
    useContext(DataContext);

  const login = async (userData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (res.ok) {
      await fetchUser();
      return 1;
    }
    return 0;
  };

  const addEventToUser = async (userId, eventId) => {
    const res = await fetch("/api/participations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, eventId: eventId }),
      credentials: "include",
    });

    if (res.ok) {
      await getEventsByUser(userId);

      return 1;
    }
    return 0;
  };

  const removeEventFromUser = async (userId, eventId) => {
    const res = await fetch("/api/participations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, eventId: eventId }),
      credentials: "include",
    });
    
    if (res.ok) {
      await getEventsByUser(userId); 
      return 1;
    }
    return 0;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setUserEvents([]);
  };

  return { login, logout, addEventToUser, removeEventFromUser };
}
