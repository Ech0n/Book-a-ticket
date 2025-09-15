import React, { useContext, useEffect } from "react";
import { DataContext } from "../DataProvider";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/eventCard";
import { Button } from "@/components/ui/button";
import useUser from "../hooks/useUser";
import EventDialog from "../components/eventDialog";

export default function Profile() {
  const { user, userEvents, loading } = useContext(DataContext);
  const navigate = useNavigate();
  const { logout } = useUser();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div className="container mx-auto p-4 min-h-screen ">
      <h1 className="text-2xl font-bold">{user?.firstName}'s profile</h1>
      <h2 className="text-lg font-semibold">Email: {user?.email}</h2>
      <h2 className="text-lg font-semibold">
        Name: {user?.firstName} {user?.lastName}
      </h2>
      <Button className="mt-4 cursor-pointer" onClick={logout}>Logout</Button>
      {!userEvents.length ? (
        <h2 className="text-xl font-semibold py-4">You haven't booked any tickets</h2>
      ) : (
        <>
          <h2 className="text-xl font-semibold py-4">Your Events</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userEvents.map((event) => (
              <li key={event.id}>
                <EventDialog event={event}>
                  <EventCard event={event} />
                </EventDialog>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
