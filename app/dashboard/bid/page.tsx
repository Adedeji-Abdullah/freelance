"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BidPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [days, setDays] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const resp = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/login");
        return;
      }
      try {
        const data = await fetch(
          `http://localhost:5000/authorization/${accessToken}`
        );
        const result = await data.json();
        if (result.message) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          router.push("/login");
        }
      } catch (err) {
        console.error("Authorization check failed:", err);
        setIsAuthorized(false);
        router.push("/login");
      }
    };
    resp();
  }, [router]);

  const submit = async () => {
    setLoading(true);
    setError("");

    if (!name || !email || !description || !amount) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const id = localStorage.getItem("bid-data");
      const data = await fetch("http://localhost:5000/bidding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          describtion: description,
          id,
          reason,
          days,
          amount,
          link,
        }),
      });

      const result = await data.json();

      if (result) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError("Failed to submit bid. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {isAuthorized === false && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#f8fafc"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "#6b7280" }}>
              Redirecting to login...
            </div>
          </div>
        </div>
      )}

      {isAuthorized === null && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#f8fafc"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "#6b7280" }}>
              Loading...
            </div>
          </div>
        </div>
      )}

      {isAuthorized === true && (
        <>
          {/* Header */}
          <div
        style={{
          background: "#0b0b0b",
          color: "#fff",
          padding: "20px 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>
            Submit Your Bid
          </h1>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid #fff",
              padding: "8px 16px",
              borderRadius: 6,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div style={{ padding: "40px 24px", maxWidth: 1000, margin: "0 auto" }}>
        {success && (
          <div
            style={{
              padding: 16,
              marginBottom: 24,
              borderRadius: 8,
              background: "#d1fae5",
              color: "#065f46",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ✓ Bid submitted successfully! Redirecting to dashboard...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: 16,
              marginBottom: 24,
              borderRadius: 8,
              background: "#fee2e2",
              color: "#991b1b",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ✗ {error}
          </div>
        )}

        <div
          style={{
            background: "#fff",
            padding: 32,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Your Name */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                color: "#0f172a",
              }}
            >
              Your Full Name *
            </label>
            <input
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="e.g., John Smith"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                color: "#0f172a",
              }}
            >
              Your Email *
            </label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="e.g., john@example.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Bid Amount */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                color: "#0f172a",
              }}
            >
              Your Bid Amount (USD) *
            </label>
            <input
              required
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount || ""}
              type="number"
              placeholder="e.g., 250"
              min="0"
              step="10"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Timeline */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                color: "#0f172a",
              }}
            >
              Estimated Timeline (Days)
            </label>
            <input
              onChange={(e) => setDays(Number(e.target.value))}
              value={days || ""}
              type="number"
              placeholder="e.g., 5"
              min="1"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* About Yourself */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                color: "#0f172a",
              }}
            >
              Tell Us About Yourself *
            </label>
            <textarea
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Share your experience, skills, and why you're a good fit for this job..."
              rows={6}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>

          {/* Why Are You Applying */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                color: "#0f172a",
              }}
            >
              Why Are You Interested in This Job?
            </label>
            <textarea
              onChange={(e) => setReason(e.target.value)}
              value={reason}
              placeholder="Explain what attracts you to this job and how you plan to add value..."
              rows={4}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>

          {/* Portfolio/Website Link */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                color: "#0f172a",
              }}
            >
              Portfolio or Website Link
            </label>
            <input
              onChange={(e) => setLink(e.target.value)}
              value={link}
              type="url"
              placeholder="https://yourportfolio.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={submit}
              disabled={loading}
              style={{
                flex: 1,
                padding: "12px 20px",
                background: loading ? "#cbd5e1" : "#0b0b0b",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 14,
              }}
            >
              {loading ? "Submitting..." : "Submit Bid"}
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              style={{
                flex: 1,
                padding: "12px 20px",
                background: "transparent",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div
          style={{
            marginTop: 32,
            background: "#fff",
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3 style={{ marginTop: 0, fontSize: 16, fontWeight: 600 }}>
            Tips for Winning Bids
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#6b7280", fontSize: 14 }}>
            <li style={{ marginBottom: 8 }}>
              Customize your proposal for each job
            </li>
            <li style={{ marginBottom: 8 }}>
              Show relevant examples of your previous work
            </li>
            <li style={{ marginBottom: 8 }}>
              Be realistic with your timeline and budget
            </li>
            <li style={{ marginBottom: 8 }}>
              Clearly communicate your skills and experience
            </li>
            <li>
              Respond quickly and professionally
            </li>
          </ul>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default BidPage;
