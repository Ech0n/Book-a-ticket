import React, { useContext } from "react";
import { DataContext } from "../DataProvider";
import { useNavigate } from "react-router-dom";

//TODO profile of user with list of events he is going to
export default function Profile() {
  const { user, userEvents } = useContext(DataContext);
  const navigate = useNavigate();
  if(!user){
    navigate("/login");
  }
  return (
    <div>
      <h1>{user?.firstName}'s Profile</h1>
      <h2>Your Events</h2>
      <ul>
        {userEvents.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}
