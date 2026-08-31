"use client";
import { METHODS } from "http";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

const page = () => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [money, setMoney] = useState<number>(0);
  const [describtion, setDescribtion] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [secrete, setSecrete] = useState(0)

  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      console.log("Log 1");
      const resp = await fetch("http://localhost:5000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          job: job,
          money: money,
          describtion: describtion,
          days: days,
          secrete: secrete
        }),
      });
      console.log("Log 2");

      const data = await resp.json().catch(() => console.log("error posting"));
      console.log(data);
      //   const token = data?.token || "demo-token";
      //   localStorage.setItem("token", token);

      // navigate to home after successful login
      if (data) {
        console.log("good to go");
      } else {
        setError("Try Again");
      }
    } catch (err) {
      e.preventDefault();
      console.error(err);
      setError("error posting");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      const resp = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const data = await fetch(`http://localhost:5000/authorization/${accessToken}`)
        if(!accessToken){
          router.push("/login")
        }
        const result = await data.json()
        console.log(result)
        if(!result.message){
          router.push("/login")
        }
      }
      resp()
    }, [])

  return (
    <div className="bg-white text-black min-h-[100vh]">
      <div>
        <h1 className="text-4xl text-center text-gray-400 mt-4 font-bold">
          Post
        </h1>
      </div>
      <div>
        <form action="" className="m-10 mt-20">
          <div>
            <label className="text-2xl text-slate-200 block w-1/3" htmlFor="">
              Your name/organization
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="h-10 pl-3 block w-2/3 border border-slate-300 hover:text-slate-400 rounded-md"
              placeholder="e.g John smith"
              type="text"
            />
          </div>
          <div className="mt-10">
            <label className="text-2xl text-slate-200 block w-1/3" htmlFor="">
              Job type
            </label>
            <input
              onChange={(e) => setJob(e.target.value)}
              className="h-10 pl-3 block w-2/3 border border-slate-300 hover:text-slate-400 rounded-md"
              placeholder="e.g frontend developer"
              type="text"
            />
          </div>
          <div className="mt-10">
            <label className="text-2xl text-slate-200 block w-1/3" htmlFor="">
              amount
            </label>
            <input
              onChange={(e) => setMoney(e.target.value)}
              className="h-10 pl-3 block w-2/3 border border-slate-300 hover:text-slate-400 rounded-md"
              placeholder="e.g $1000"
              type="number"
            />
          </div>
          <div className="mt-10">
            <label className="text-2xl text-slate-200 block w-1/3" htmlFor="">
              Your describtion
            </label>
            <textarea
              onChange={(e) => setDescribtion(e.target.value)}
              name="describtion border"
              className="h-40 pl-3 block w-2/3 border border-slate-300 hover:text-slate-400 rounded-md"
              rows={20}
              id=""
            ></textarea>
          </div>
          <div className="mt-10">
            <label className="text-2xl text-slate-200 block w-1/3" htmlFor="">
              Days you want your work done
            </label>
            <input
              onChange={(e) => setDays(e.target.value)}
              className="h-10 pl-3 block w-2/3 border border-slate-300 hover:text-slate-400 rounded-md"
              type="date"
            />
          </div>
          <div className="mt-10">
            <label className="text-2xl text-slate-200 block w-1/3" htmlFor="">
              Enter you secrete code
            </label>
            <input
              onChange={(e) => setSecrete(e.target.value)}
              className="h-10 pl-3 block w-2/3 border border-slate-300 hover:text-slate-400 rounded-md"
              placeholder="e.g JRtbD57dr"
              type="password"
            />
          </div>
          <button
            className="bg-gray-400 hover:bg-gray-300 py-1/2 px-3 mx-auto mt-7 items-center flex rounded-sm cursor-pointer"
            onClick={submit}
          >
            submit
          </button>
        </form>
        <p className="text-red-600">{error ? error : ""}</p>
      </div>
    </div>
  );
};

export default page;
