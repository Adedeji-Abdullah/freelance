"use client";
import React, { useState, useEffect } from "react";
import EmailJS from "@emailjs/browser";
import { useRouter } from "next/navigation";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !feedback) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      await EmailJS.send(
        "Freelance",
        "template_vs7edoa",
        {
          name: `${name} (${category})`,
          message: `Email: ${email}\n\n${feedback}`,
        },
        { publicKey: "_zpC8Ncqw-10JXUpC" }
      );

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      setError("Failed to send feedback. Please try again.");
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
            Send Us Feedback
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

      <div style={{ padding: "40px 24px", maxWidth: 800, margin: "0 auto" }}>
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
            ✓ Thank you! Your feedback has been sent successfully. Redirecting...
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

        <form onSubmit={submit}>
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Name */}
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
                Your Name *
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your@email.com"
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

            {/* Category */}
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
                Feedback Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              >
                <option value="general">General Feedback</option>
                <option value="bug">Report a Bug</option>
                <option value="feature">Feature Request</option>
                <option value="complaint">Complaint</option>
                <option value="praise">Praise / Compliment</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Feedback Message */}
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
                Your Feedback *
              </label>
              <textarea
                required
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your thoughts, suggestions, or concerns about AL Freelancing..."
                rows={10}
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

            {/* Buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="submit"
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
                {loading ? "Sending..." : "Send Feedback"}
              </button>
              <button
                type="button"
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
        </form>

        {/* Info Section */}
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
            How We Use Your Feedback
          </h3>
          <p style={{ margin: "12px 0 0 0", color: "#6b7280", fontSize: 14 }}>
            Your feedback helps us improve AL Freelancing. We read and value every
            message, and our team will use your insights to enhance the platform,
            fix bugs, and build features that matter to you.
          </p>
          <p style={{ margin: "12px 0 0 0", color: "#6b7280", fontSize: 14 }}>
            Thank you for being part of our community!
          </p>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default FeedbackPage;
