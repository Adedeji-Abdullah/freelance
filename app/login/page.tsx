'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target as HTMLFormElement;
      console.log("Log 1")
      const resp = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log("Log 2")

      const data = await resp.json();
      console.log(data)
      localStorage.setItem("loggedIn-ID", data.result._id)

      // Save token FIRST before navigating
      if(data && data.accessToken){
        console.log("accessToken  " + data.accessToken)
        localStorage.setItem("accessToken", data.accessToken)
        console.log("Navigated")
        router.push("/dashboard")
      }else {
        setError("Try Again")
      }
      
    } catch (err) {
      console.error(err);
      setError("Error logging in")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-blend-color-dodge font-sans">
      <div className="px-14 md:px-28 py-10 md:py-20 rounded-2xl shadow-xl md:shadow-2xl shadow-white border opacity-40 absolute">
        <h1 className="text-3xl mb-7 md:mb-10 font-bold text-center">SIGN IN</h1>
      <form action="submit">
        <div className="mb-3 md:mb-4">
          <label className="text-xl block opacity-100" htmlFor="email">Email</label>
          <input 
            className="block border-2 rounded-md pl-2 h-12 w-full mt-1 md:mt-2" 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xl block" htmlFor="password">Password</label>
          <input className="block border-2 rounded-md h-12 w-full mt-1 md:mt-2" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={submit} className="bg-slate-400 hover:bg-slate-100 mt-4 px-5 flex justify-center py-1 rounded-md text-center mx-auto text-2xl cursor-pointer text-white hover:text-slate-800">{loading ? "Logging in..." : "Log in"}</button>
      </form>
       {error ? error : ""}
      <a href="/register" className="text-white hover:text-gray-300 mt-4 block text-center">
          Don't have an account? <span className="underline">Sign up</span>
        </a>
      </div>
    </div>
  );
}

export default Login;