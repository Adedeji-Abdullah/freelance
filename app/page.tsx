"use client";
import React from "react";
import global from "./photos/human&computer.jpg";
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function Home() {
  const router = useRouter()
  const submit = () => {
    router.push("/login")
  }
  return (
    <main style={{ fontFamily: "Inter, Arial, sans-serif", color: "#0f172a" }}>
      <section>
        <div className="flex justify-between min-h-12 backdrop-blur-2xl">
          <p className="text-white text-2xl md:text-3xl ml-5 mt-6">
            Al freelancing
          </p>
          <div
            className="mb-2 -mt-2 sm:mr-2"
            style={{
              marginTop: 24,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              href="/register"
              className="pt-2 pb-1 px-4 md:py-3 md:px-5 sm:py-1 sm:px-1"
              style={{
                background: "#fff",
                color: "#0b0b0b",
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Get started
            </a>
            <a
              href="/login"
              style={{
                background: "transparent",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: 8,
                fontWeight: 600,
                border: "1px solid #e5e7eb",
                textDecoration: "none",
              }}
            >
              Sign in
            </a>
          </div>
        </div>
      </section>
      <section
        className="min-h-screen"
        style={{ padding: "64px 24px", background: "#ffffff" }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 32,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 420px" }}>
            <h1
              style={{
                fontSize: 40,
                lineHeight: "48px",
                margin: 0,
                fontWeight: 700,
              }}
            >
              Find trusted freelancers fast
            </h1>
            <p style={{ marginTop: 16, color: "#6b7280", fontSize: 18 }}>
              Hire vetted professionals for design, development, writing, and
              more — securely and efficiently.
            </p>

            <div>
              <Image src="/hero.jpg" alt="human & computer" width={900} height={600} />
            </div>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <a
                href="/register"
                style={{
                  background: "#0b0b0b",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Get started
              </a>
              <a
                href="/login"
                style={{
                  background: "transparent",
                  color: "#0b0b0b",
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontWeight: 600,
                  border: "1px solid #e5e7eb",
                  textDecoration: "none",
                }}
              >
                Sign in
              </a>
            </div>
          </div>

          <aside className="sm:w-52" style={{ width: 360, flex: "0 0 360px" }}>
            <div
              style={{
                borderRadius: 12,
                padding: 20,
                background: "#f8fafc",
                boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18 }}>Popular right now</h3>
              <ul style={{ marginTop: 12, padding: 0, listStyle: "none" }}>
                <li
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #eef2f7",
                  }}
                >
                  <strong>Product Designer</strong>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>
                    Avg. $200/project · Remote
                  </div>
                </li>
                <li
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #eef2f7",
                  }}
                >
                  <strong>Full‑stack Developer</strong>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>
                    Avg. $550/project · Remote
                  </div>
                </li>
                <li style={{ padding: "8px 0" }}>
                  <strong>SEO Specialist</strong>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>
                    Avg. $375/project · Contract
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ padding: "48px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            Why choose AL Freelancing?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <div
              style={{
                padding: 20,
                borderRadius: 10,
                background: "#fbfcfd",
                boxShadow: "0 6px 18px rgba(15,23,42,0.03)",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>Vetted talent</h4>
              <p style={{ margin: 0, color: "#6b7280" }}>
                Profiles reviewed and verified so you hire with confidence.
              </p>
            </div>
            <div
              style={{
                padding: 20,
                borderRadius: 10,
                background: "#fbfcfd",
                boxShadow: "0 6px 18px rgba(15,23,42,0.03)",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>Secure payments</h4>
              <p style={{ margin: 0, color: "#6b7280" }}>
                Escrow and milestone payments protect both parties.
              </p>
            </div>
            <div
              style={{
                padding: 20,
                borderRadius: 10,
                background: "#fbfcfd",
                boxShadow: "0 6px 18px rgba(15,23,42,0.03)",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>Fast hiring</h4>
              <p style={{ margin: 0, color: "#6b7280" }}>
                Post a job and get proposals from top freelancers within hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="min-h-[90vh] bg-linear-to-b to-black from-[#fbfcfd]">
          <h1 className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-xl font-bold">
            <p className="pt-10 text-center">Explore top freelancing job</p>
          </h1>
          <div className="mt-14">
            <p className="text-4xl text-white font-semi-bold text-center">Search Skilled freelancers <span className="block">by Role, Skil, or Service</span></p>
          </div>
          <input
            type="text"
            className="border rounded-2xl h-8 mt-10 flex item-center items-center mx-auto pl-2 w-2/3 md:3/5 hover:border-black"
            placeholder="serch for different kind of job"
          />
          <button onclick={submit} className="flex cursor-pointer mx-auto items-center mt-5 bg-linear-to-r from-green-400 to-blue-500 rounded-md px-2 py-1">Submit</button>
          
          <div className="mt-20">
            <div className="grid grid-cols-4 text-center animate-bounce">
              <section className="bg-transparent border px-2 py-1 rounded-3xl ml-3">
                Frontend developer
              </section>
              <section className="bg-transparent border px-2 py-1 rounded-3xl ml-3">
                UI/UX designer
              </section>
              <section className="bg-transparent border px-2 py-1 rounded-3xl ml-3">
                python developer
              </section>
              <section className="bg-transparent border px-2 py-1 rounded-3xl ml-3">
                App design
              </section>
            </div>

            <div className="grid grid-cols-3 text-center mt-10 mx-5 animate-pulse">
              <section className="bg-transparent border px-2 py-1 rounded-3xl ml-3">
                website design
              </section>
              <section className="bg-transparent border px-2 py-1 rounded-3xl ml-3">
                IOS development
              </section>
              <section className="bg-transparent border px-2 py-1 rounded-3xl ml-3">
                LOGO & branding
              </section>
            </div>
            <section className="bg-transparent border px-2 py-1 rounded-3xl ml-3 w-1/3 mt-10 mx-5 flex text-center self-center justify-self-center justify-center animate-ping">
                E. T. C
              </section>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: 20 }}>How it works</h3>
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              marginTop: 24,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 240,
                padding: 18,
                borderRadius: 10,
                background: "#f8fafc",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700 }}>1</div>
              <div style={{ marginTop: 8, color: "#6b7280" }}>
                Post a clear job brief
              </div>
            </div>
            <div
              style={{
                width: 240,
                padding: 18,
                borderRadius: 10,
                background: "#f8fafc",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700 }}>2</div>
              <div style={{ marginTop: 8, color: "#6b7280" }}>
                Review proposals & interview
              </div>
            </div>
            <div
              style={{
                width: 240,
                padding: 18,
                borderRadius: 10,
                background: "#f8fafc",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700 }}>3</div>
              <div style={{ marginTop: 8, color: "#6b7280" }}>
                Pay via secure escrow
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: 40, background: "#0b0b0b", color: "#fff" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h4 style={{ margin: 0 }}>Ready to get started?</h4>
            <p style={{ margin: "8px 0 0 0", color: "#d1d5db" }}>
              Create your account and post your first job in minutes.
            </p>
          </div>
          <div style={{ marginTop: 12 }}>
            <a
              href="/register"
              style={{
                background: "#fff",
                color: "#0b0b0b",
                padding: "10px 18px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Create account
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
