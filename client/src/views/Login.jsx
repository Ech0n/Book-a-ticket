import React, { useContext, useEffect } from "react";
import useUser from "../hooks/useUser";
import { DataContext } from "../DataProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(from);
  }, [user]);

  const { login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      email: e.target[0].value,
      password: e.target[1].value,
    }).then((res) => {
      if (res === 1) {
        navigate(from, { replace: true });
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl mb-4">Login</h1>
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
        Login
      </Button>
    </form>
  );
}
