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
      if(data){
         router.push('/login')
      }else {
        setError("Try Again")
      }
      console.log("log 3")
    } catch (error) {
      console.log("error signing in")
      setError("Error signing in")
    } finally{
      setLoading(false)
    }

  }
  return (
    // <section className='bg-pink-300'>
    <div className="flex flex-col flex-1 items-center justify-center bg-blend-color-dodge font-sans">
      <div className="px-28 py-20 rounded-2xl shadow-xl md:shadow-2xl shadow-white border opacity-40 absolute">
        <h1 className="text-3xl mb-10 font-bold text-center">SIGN UP</h1>
      <form action="submit" onSubmit={submit}>
        <div className="mb-4">
          <label className="text-xl block opacity-100" htmlFor="">Name</label>
          <input className="text-white block border-2 rounded-md h-12 w-full mt-2" type="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="text-xl block opacity-100" htmlFor="">Email</label>
          <input className="text-white block border-2 rounded-md h-12 w-full mt-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="text-xl block" htmlFor="">Password</label>
          <input className="text-white block border-2 rounded-md h-12 w-full mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        </form>
        {error ? error : ""}
        <button onClick={submit} className="bg-slate-400 hover:bg-slate-100 mt-4 px-5 flex justify-center py-1 rounded-md text-center mx-auto text-2xl cursor-pointer text-white hover:text-slate-800">{loading ? "Signing in..." : "Sign up"}</button>
        <a href="/login" className="text-white hover:text-gray-300 mt-4 block text-center">
          Already have an account? Log in
        </a>
      
      </div>
      
    </div>
    // </section>
  )
}

export default page