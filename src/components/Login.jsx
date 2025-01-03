import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {login as authLogin} from '../store/authSlice'
import {Button, Input} from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
const login = async (data) => {
    setError("")
    try {
     const session = await authService.login(data)
     if(session) {
        const userData = await authService.getCurrentUser()
        if(userData){
            dispatch(authLogin(userData))
            navigate("/")
        }
     }
    } catch (error) {
        setError(error.message)
    }
}
  return (


    <div className="flex items-center justify-center h-screen bg-gray-200 ">
<h2 className="text-3xl font-bold mb-4">Sign in to your Account</h2>
<p className="mt-2 text-center text-base text-black">Don't have an Account? Sign up Here! 

<Link to="/signup" className="text-blue-500 font-medium text-primary transition-all duration-200 hover:underline ">Register</Link>

</p>
{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
<form onSubmit={handleSubmit(login)} className='mt-8'>
<div className="space-y-5">

<Input

label = "Email: "
placeholder="Enter your email"
type="email"
{...register("email",{required: true, validate: {matchPattern: value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(value) || "Invalid email address"}})}
/>
<Input
label = "Password: "
placeholder="Enter your password"
type = "password"
{...register("password",{required: true, minLength: 8, maxLength: 20, validate: {matchPattern: value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(value) || "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"}})}
/>
<Button type="submit" className="w-full">Sign In</Button>
</div>

</form>
    </div>
  )
}

export default Login