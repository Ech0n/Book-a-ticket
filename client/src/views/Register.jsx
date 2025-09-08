import React, { useContext, useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { DataContext } from "../DataProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Register() {
  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) navigate(from);
  }, [user]);

  const { register } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[3].value.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!e.target[2].value.includes("@")) {
      setError("Invalid email address");
      return;
    }

    if (e.target[0].value.length === 0 || e.target[1].value.length === 0) {
      setError("First name and last name cannot be empty");
      return;
    }

    register({
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
    }).then((res) => {
      if (res === 1) {
        alert("Your account has been created");
        setError(null);
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    });
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl mb-4">Register</h1>
      <div>
        <label className="text-lg font-medium mb-2">First name</label>
        <input
          type="text"
          placeholder="Enter your first name"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>
      <div>
        <label className="text-lg font-medium mb-2">Last name</label>
        <input
          type="text"
          placeholder="Enter your last name"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>
      <div>
        <label className="text-lg font-medium mb-2">Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>
      <div>
        <label className="text-lg font-medium mb-2">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>
      <Button
        type="submit"
        className=" text-white py-2 px-4 rounded-md cursor-pointer"
      >
        Register
      </Button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
}
