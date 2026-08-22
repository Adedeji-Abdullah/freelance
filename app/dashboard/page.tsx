"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [bids, setBids] = useState<bid[]>([]);
  const [error, setError] = useState("");
  const [num, setNum] = useState(0);
  const [data, setData] = useState<String>("");

  type bid = {
    _id: String;
    name: String;
    job: String;
    money: Number;
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
        setNum(bids);
      } catch (error: any) {
        console.log("Something went wrong");
        setError(error);
      }
    };
    respo();
  }, []);

  return (
    <div className="overflow-visible" style={{ padding: 24, background: "#ffffff", minHeight: "100vh" }}>
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
            className="text-slate-400"
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}
          >
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Recent activity</h3>
              <ul className="">
                {bids.map((item) => (
                  <li
                    key={item._id}
                    className="m-10 border px-5 rounded-2xl py-5"
                  >
                    <h1 className="text-slate-900 text-3xl">{item.name}</h1>
                    <h5 className="ml-96 inline text-black">${item.money}</h5>
                    <h3 className="text-slate-600">⚫{item.job}</h3>

                    <h3 className="text-slate-600">Describtion</h3>
                    <h4 className="text-slate-400">{item.describtion}</h4>

                    <button
                      
                      onDoubleClick={() => (router.push("/dashboard/bid"), setData(item._id), console.log(data), localStorage.setItem('data', data))}
                      onClick={() => alert("double click!!!")}
                      className="bg-black text-white py-1 px-3 rounded-md mt-5 flex justify-items-end cursor-pointer"
                    >
                      Bid
                    </button>
                  </li>
                ))}
                =
              </ul>
            </div>

            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background: "#fff",
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
              }}
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

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
