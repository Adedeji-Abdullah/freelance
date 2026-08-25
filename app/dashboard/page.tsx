"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [bids, setBids] = useState<bid[]>([]);
  const [error, setError] = useState("");
  const [num, setNum] = useState(0);
  const [data, setData] = useState<String>("");
  const [applicants, setApplicants] = useState<any[]>([]);
  const [accept, setAccept] = useState("")
  const [confirmData, setConfirmData] = useState("")
  const [applicantData, setApplicantData] = useState<any>({})
  const [confirm, setConfirm] = useState(false)

  type bid = {
    _id: string;
    name: String;
    job: String;
    money: number;
    describtion: String;
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const respo = async () => {
      try {
        const data = await fetch("http://localhost:5000/bids");
        const result = await data.json();
        console.log(result);
        setBids(result);
        console.log(result.number);
        setNum(bids.length);
      } catch (error: any) {
        console.log("Something went wrong");
        setError(error);
      }
    };
    respo();
  }, []);

  const applicant = async () => {
    const data = await fetch("http://localhost:5000/applicants");
    const result = await data.json();
    console.log(1);
    console.log(result);
    console.log(2);
    const filtered = result.filter(
      (item: any) => item._id === localStorage.getItem("applicant-id"),
    );
    const options = filtered[0].option;
    console.log(filtered);
    console.log(filtered[0].name);
    console.log(options);
    console.log(options.data);
    setApplicants(options);
  };

  const handleAccept = () => {
    console.log(accept)
  }

  const handleConfirmation = async () => {
    const data = await fetch('http://localhost:5000/confirm', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: accept,
        confirmData: confirmData
      })
    })
    const result = await data.json();
    console.log(result)
    if (result.message === "Successful") {
      // alert('Confirmation successful');
      setConfirm(true)
      alert("This is the email of the applicant  " + applicantData.email)
    } else {
      alert('Incorrect secrete code');
    }
  }

  return (
    <div
      className="overflow-visible"
      style={{ padding: 24, background: "#ffffff", minHeight: "100vh" }}
    >
      <input placeholder="Search for Job" type="text" className="h-12 w-1/2 flex items-center p-2 border text-black rounded-2xl self-center mx-auto mb-10" />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 24,
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            borderRadius: 12,
            padding: 16,
            background: "#fbfcfd",
            height: "fit-content",
          }}
          className="z-99"
        >
          <h3 style={{ marginTop: 0 }}>Your Menu</h3>
          <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="#" style={{ color: "#0b0b0b", textDecoration: "none" }}>
              Overview
            </a>
            <a href="#" style={{ color: "#0b0b0b", textDecoration: "none" }}>
              Projects
            </a>
            <a href="#" style={{ color: "#0b0b0b", textDecoration: "none" }}>
              Messages
            </a>
            <a href="#" style={{ color: "#0b0b0b", textDecoration: "none" }}>
              Settings
            </a>
          </nav>
          <div style={{ marginTop: 16 }}>
            <button
              onClick={logout}
              style={{
                background: "#0b0b0b",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 8,
              }}
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main>
          <h1 style={{ marginTop: 0 }}>Overview</h1>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginBottom: 24,
            }}
            className=""
          >
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
              }}

            >
              <div style={{ color: "#6b7280" }}>Earnings</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>$4,320</div>
            </div>
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
              }}
            >
              <div style={{ color: "#6b7280" }}>Active Projects</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{bids.length}</div>
            </div>
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
              }}
            >
              <div style={{ color: "#6b7280" }}>New Messages</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>5</div>
            </div>
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
              }}
            >
              <div style={{ color: "#6b7280" }}>New Messages</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>5</div>
            </div>
          </section>

          <section
            className="text-slate-400 "
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}
          >
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
              }}
              className= ""
            >
              <h3 style={{ marginTop: 0 }}> activity</h3>
              <ul className="">
                {bids.map((item) => (
                  <li
                    key={item._id}
                    className="m-10 border px-5 rounded-2xl py-5 "
                  >
                    <h1 className="text-slate-900 text-3xl">{item.name}</h1>
                    <h5 className="ml-96 inline text-black">${item.money}</h5>
                    <h3 className="text-slate-600">⚫{item.job}</h3>
                    <h3 className="text-slate-600">Describtion</h3>
                    <h4 className="text-slate-400">{item.describtion}</h4>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          setData(item._id);
                          console.log(item._id);
                          localStorage.setItem("bid-data", item._id);
                          router.push("/dashboard/bid");
                        }}
                        // onClick={() => alert("double click!!!")}
                        className="bg-black text-white py-1 px-3 rounded-md mt-5 flex justify-items-end cursor-pointer"
                      >
                        Bid
                      </button>
                      <button
                        onClick={() => {
                          localStorage.setItem("applicant-id", item._id);
                          applicant();
                        }}
                        className="bg-black text-white py-1 px-3 rounded-md mt-5 flex justify-items-end cursor-pointer"
                      >
                        Applicants
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
              }}
              className="static"
            >
              <h3 style={{ marginTop: 0 }}>Quick actions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "#0b0b0b",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={() => router.push("/dashboard/post")}
                >
                  Post a job
                </button>
                <button
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  View proposals
                </button>
                {/* {applicants.length > 0 && (
                  <div>
                    <h4>Applicants:</h4>
                    <ul>
                      {applicants.map((applicant, index) => (
                        <li key={index}
                          style={{
                            padding: "4px 8px",
                          }}>
                            applicant
                          </li>
                      ) */}

                {applicants.length > 0 ? (
                  <ul className="mt-10">
                    {applicants.map((applicant, index) => (
                      <li
                        key={index}
                        className="text-black tex-2xl ml-2 font-bold mt-5"
                        style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid #e5e7eb",
                  }}
                      >
                        <div className="flex justify-between">
                          {applicant.data.name}{" "}
                          <button onClick={() => {setAccept(applicant.data.id), handleAccept(), console.log(applicant.data.id), setApplicantData(applicant.data)}} className="bg-black px-3 py-1 text-white rounded-md cursor-pointer">Accept</button>
                        </div>
                        <p className="text-slate-400 font-semibold">{applicant.data.describtion}</p>
                        {/* {setAccept(applicant.data.id)} */}
                        {accept === applicant.data.id ? (<div className="flex justify-between">
                          <input onChange={(e) => setConfirmData(e.target.value)} placeholder="Enter the secrete code" className="border pl-2" /> 
                          <button onClick={handleConfirmation} className="bg-black text-white px-3 py-1 rounded-md ml-2">confirm</button>
                        </div>) : ''}
                        
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-bold text-2xl mt-10">No applicant for this project yet,be the first applicant 🥳🥳🥳</p>
                )}

                {applicantData && confirm ? (<div className="text-2xl">
                  <h1 className="text-2xl"><span className="text-black text-2xl font-bold">Applicant Name:  </span>{applicantData.name}</h1>
                  <h2><span className="text-black text-2xl font-bold">Applicant Email:  </span>{applicantData.email}</h2>
                  <h2><span className="text-black text-2xl font-bold">Amount demanded:  </span>${applicantData.amount}</h2>
                  <h2><span className="text-black text-2xl font-bold">Ready in:  </span>{applicantData.days} day(s)</h2>
                  <a href={`${applicantData.link}`}><span className="text-black text-2xl font-bold">link to his/her website:  </span><span className="underline">{applicantData.link}</span></a>
                  <h2><span className="text-black text-2xl font-bold">His/her reason for applying for this job:  </span>{applicantData.reason}</h2>

                </div>) : ""}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
