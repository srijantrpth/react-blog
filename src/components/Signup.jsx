import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md ">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <p className="text-center text-sm text-gray-500">
            Already have an Account? Sign In Instead{" "}
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline "
            >
              Sign In
            </Link>
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit(signup)}>
          <div className="bg-white p-8 rounded-lg shadow-lg mt-4">
            <Input
              label="Name"
              type="text"
              placeholder="Enter your Name"
              {...register("name", { required: true })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(
                      value
                    ) || "Invalid email address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 20,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(
                      value
                    ) ||
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
            />
            <Button type="Submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
