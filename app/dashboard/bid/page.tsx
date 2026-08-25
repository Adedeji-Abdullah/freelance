"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [describtion, setDescribtion] = useState("");
  const [reason, setReason] = useState("")
  const [days, setDays] = useState(0)
  const [amount, setAmount] = useState(0)
  const [link, setLink] = useState("")
  const router = useRouter()

  const submit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = localStorage.getItem("bid-data");
    console.log(id);
    const data = await fetch("http://localhost:5000/bidding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        describtion,
        id,
        reason,
        days,
        amount,
        link,
      }),
    });

    const result = await data.json();
    router.push("/dashboard")
    console.log(result);
    
  };

  return (
    <section className="bg-white min-h-screen">
      <div>
        <h1 className="text-4xl text-center text-gray-400 mt-4 font-bold">
          Bid
        </h1>
      </div>
      <form action="" className="m-10 mt-20 text-black">
        <div className="ml-5">
          <label className="text-slate-400 block text-2xl" htmlFor="">
            Your name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md w-4/5 md:w-1/3 h-10 p-3 block"
            type="text"
            placeholder="e.g John smith"
          />
        </div>
        <div className="ml-5 mt-10">
          <label className="text-slate-400 block text-2xl" htmlFor="">
            Your email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md w-4/5 md:w-1/3 h-10 p-3 block"
            type="email"
            placeholder="e.g johnsmith@gmail.com"
          />
        </div>
        <div className="ml-5 mt-10">
          <label className="text-slate-400 text-2xl" htmlFor="">
            Tell us about yourself
          </label>
          <textarea
            onChange={(e) => setDescribtion(e.target.value)}
            className="border rounded-md w-4/5 md:w-1/3 p-3 block"
            rows={10}
            name=""
            id=""
          ></textarea>
        </div>
        <div className="ml-5 mt-10">
          <label className="text-slate-400 text-2xl" htmlFor="">
            Tell us about reason you are suitable for this job
          </label>
          <textarea
            onChange={(e) => setReason(e.target.value)}
            className="border rounded-md w-4/5 md:w-1/3 p-3 block"
            rows={10}
            name=""
            id=""
          ></textarea>
        </div>
        <div className="ml-5 mt-10">
          <label className="text-slate-400 block text-2xl" htmlFor="">
            In how many days will you make it
          </label>
          <input
            onChange={(e) => setDays(e.target.value)}
            className="border rounded-md w-4/5 md:w-1/3 h-10 p-3 block"
            type="number"
            placeholder="in days"
          />
        </div>
        <div className="ml-5 mt-10">
          <label className="text-slate-400 block text-2xl" htmlFor="">
            How much will you like to receive
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded-md w-4/5 md:w-1/3 h-10 p-3 block"
            type="number"
            placeholder="in $$$"
          />
        </div>
        <div className="ml-5 mt-10">
          <label className="text-slate-400 block text-2xl" htmlFor="">
            Link to any of your previous website/Github/Portfolio
          </label>
          <input
            onChange={(e) => setLink(e.target.value)}
            className="border rounded-md w-4/5 md:w-1/3 h-10 p-3 block"
            type="url"
            placeholder="e.g https://example.com"
          />
        </div>
        
        <button
          className="bg-gray-400 hover:bg-gray-300 py-1/2 px-3 mx-auto mt-14 items-center flex rounded-sm cursor-pointer"
          onClick={submit}
        >
          submit
        </button>
      </form>
    </section>
  );
};

export default page;
