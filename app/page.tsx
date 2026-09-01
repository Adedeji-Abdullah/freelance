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
        <div className="min-h-screen bg-linear-to-b to-black from-[#fbfcfd]">
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
          <button onClick={submit} className="flex cursor-pointer mx-auto items-center mt-5 bg-linear-to-r from-green-400 to-blue-500 rounded-md px-2 py-1">Submit</button>
          
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

      {/* Success Stats Section */}
      <section style={{ padding: "64px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
              Trusted by thousands
            </h2>
            <p style={{ marginTop: 12, color: "#6b7280", fontSize: 16 }}>
              Join a community of successful businesses and freelancers
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0f172a" }}>
                50K+
              </div>
              <p style={{ marginTop: 8, color: "#6b7280" }}>Active Freelancers</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0f172a" }}>
                $12M+
              </div>
              <p style={{ marginTop: 8, color: "#6b7280" }}>Projects Completed</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0f172a" }}>
                98%
              </div>
              <p style={{ marginTop: 8, color: "#6b7280" }}>Client Satisfaction</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0f172a" }}>
                180+
              </div>
              <p style={{ marginTop: 8, color: "#6b7280" }}>Countries Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: "64px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
              What our users say
            </h2>
            <p style={{ marginTop: 12, color: "#6b7280", fontSize: 16 }}>
              Real experiences from clients and freelancers
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24", fontSize: 18 }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  margin: "0 0 16px 0",
                  color: "#0f172a",
                  lineHeight: "1.6",
                }}
              >
                "Found the perfect developer for our mobile app within days. The quality of work exceeded expectations."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#e0e7ff",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Sarah Johnson</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Startup Founder
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24", fontSize: 18 }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  margin: "0 0 16px 0",
                  color: "#0f172a",
                  lineHeight: "1.6",
                }}
              >
                "AL Freelancing helped me build my freelance career from zero. The platform is secure and payments are always on time."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#ccfbf1",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Mike Chen</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Full-stack Developer
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24", fontSize: 18 }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  margin: "0 0 16px 0",
                  color: "#0f172a",
                  lineHeight: "1.6",
                }}
              >
                "Excellent platform for finding design talent. The vetting process ensures you get quality work every time."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#fce7f3",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Emma Davis</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Creative Director
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Freelancers Section */}
      <section style={{ padding: "64px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
              Top Freelancers
            </h2>
            <p style={{ marginTop: 12, color: "#6b7280", fontSize: 16 }}>
              Meet our most trusted and skilled professionals
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  padding: 20,
                  borderRadius: 12,
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `hsl(${i * 90}, 70%, 60%)`,
                    margin: "0 auto 16px",
                  }}
                />
                <h4 style={{ margin: "0 0 4px 0" }}>Professional {i}</h4>
                <p style={{ margin: "0 0 8px 0", color: "#6b7280", fontSize: 14 }}>
                  {i === 1 && "Full-stack Developer"}
                  {i === 2 && "UI/UX Designer"}
                  {i === 3 && "Content Writer"}
                  {i === 4 && "Digital Marketer"}
                </p>
                <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 12 }}>
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: "#fbbf24" }}>★</span>
                  ))}
                </div>
                <p style={{ margin: 0, color: "#6b7280", fontSize: 12 }}>
                  {50 + i * 10}+ projects completed
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a
              href="/dashboard"
              style={{
                background: "#0b0b0b",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              View all freelancers
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section style={{ padding: "64px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
              Simple, transparent pricing
            </h2>
            <p style={{ marginTop: 12, color: "#6b7280", fontSize: 16 }}>
              Choose the plan that works best for you
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              { name: "Starter", price: "Free", features: ["Up to 1 project/month", "Basic support", "Limited freelancer access"] },
              { name: "Professional", price: "$99", features: ["Unlimited projects", "Priority support", "Featured listings", "Advanced analytics"] },
              { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Dedicated manager", "Custom integrations", "24/7 support"] },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  padding: 32,
                  borderRadius: 12,
                  background: i === 1 ? "#0f172a" : "#f8fafc",
                  border: i === 1 ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                  color: i === 1 ? "#fff" : "#0f172a",
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: 20 }}>
                  {plan.name}
                </h3>
                <div style={{ fontSize: 28, fontWeight: 700, margin: "16px 0" }}>
                  {plan.price}
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span style={{ fontSize: 14, color: i === 1 ? "#d1d5db" : "#6b7280" }}>
                      /month
                    </span>
                  )}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "24px 0",
                  }}
                >
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      style={{
                        padding: "8px 0",
                        borderBottom: `1px solid ${
                          i === 1 ? "#334155" : "#e2e8f0"
                        }`,
                        color: i === 1 ? "#cbd5e1" : "#6b7280",
                      }}
                    >
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={submit}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: "none",
                    background:
                      i === 1 ? "#3b82f6" : "#0b0b0b",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "64px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ marginTop: 12, color: "#6b7280", fontSize: 16 }}>
              Find answers to common questions about AL Freelancing
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                q: "How do I post a job?",
                a: "Click 'Post a Job', fill in the details, set your budget, and wait for proposals from freelancers.",
              },
              {
                q: "How are payments secured?",
                a: "We use escrow to hold payments until you confirm the work is complete. This protects both you and the freelancer.",
              },
              {
                q: "Can I hire a freelancer for long-term projects?",
                a: "Yes, you can hire freelancers for both one-time projects and ongoing work. Many of our clients work with the same freelancers repeatedly.",
              },
              {
                q: "What if I'm not satisfied with the work?",
                a: "You can request revisions during the project. If issues persist, our support team can help resolve disputes fairly.",
              },
              {
                q: "How much does it cost?",
                a: "We charge a service fee of 10% on completed projects. There are no upfront costs to post jobs or create a profile.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                style={{
                  padding: 20,
                  borderRadius: 8,
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 16, color: "#0f172a" }}>
                  {faq.q}
                </div>
                <p
                  style={{
                    margin: "12px 0 0 0",
                    color: "#6b7280",
                    lineHeight: "1.6",
                    fontSize: 14,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        style={{
          padding: "64px 24px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 36, fontWeight: 700, margin: 0 }}>
            Ready to transform your hiring?
          </h2>
          <p
            style={{
              marginTop: 16,
              fontSize: 18,
              color: "#cbd5e1",
              lineHeight: "1.6",
            }}
          >
            Join thousands of successful businesses using AL Freelancing to build their dream teams. Post your first job today.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={submit}
              style={{
                padding: "14px 32px",
                background: "#fff",
                color: "#0f172a",
                borderRadius: 8,
                border: "none",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Post a job now
            </button>
            <a
              href="/dashboard"
              style={{
                padding: "14px 32px",
                background: "transparent",
                color: "#fff",
                borderRadius: 8,
                border: "2px solid #fff",
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              Browse freelancers
            </a>
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
