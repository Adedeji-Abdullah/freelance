'use client'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
// import Register from '../SPA/pages/Register';

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [incorrect, setIncorrect] = useState(false)
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Hi")
    setLoading(true)
    try {
      const resp = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      console.log("log 1")
      const data = await resp.json()
      console.log("log 2")
      console.log(data)

      if(data.name){
         router.push('/login')
        //  localStorage.setItem("accessToken", data.accessToken)
      }else {
        setError(error)
        console.log("Error" + error)
        setIncorrect(true)
      }
      console.log("log 3")
    } catch (error) {
      console.log("error signing in")
      setError("Email exists")
    } finally{
      setLoading(false)
    }

  }
  return (
    // <section className='bg-pink-300'>
    <div className="flex flex-col flex-1 items-center justify-center bg-blend-color-dodge font-sans">
      <div className="px-14 md:px-28 py-10 md:py-20 rounded-2xl shadow-xl md:shadow-2xl shadow-white border opacity-40 absolute">
        <h1 className="text-3xl mb-7 md:mb-10 font-semibold md:font-bold text-center">SIGN UP</h1>
      <form className='mt-5' action="submit" onSubmit={submit}>
        <div className="mb-3 md:mb-4">
          <label className="text-xl block opacity-100" htmlFor="">Name</label>
          <input className="text-white block border-2 pl-2 rounded-md h-12 w-full mt-1 md:mt-2" type="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="text-xl block opacity-100" htmlFor="">Email</label>
          <input className="text-white block border-2 pl-2 rounded-md h-12 w-full mt-1 md:mt-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="text-xl block" htmlFor="">Password</label>
          <input className="text-white block border-2 rounded-md h-12 w-full mt-1 md:mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {incorrect ? (<p className='font-semibold text-red-600'>Either Name or Email already exists</p>) : ""}
        </form>
        
        <button onClick={submit} className="bg-slate-400 hover:bg-slate-100 mt-4 px-5 flex justify-center py-1 rounded-md text-center mx-auto text-2xl cursor-pointer text-white hover:text-slate-800">{loading ? "Signing in..." : "Sign up"}</button>
        <a href="/login" className="text-white hover:text-gray-300 mt-4 block text-center">
          Already have an account? <span className='underline'>sign in</span>
        </a>
      
      </div>
      
    </div>
    // </section>
  )
}

export default page