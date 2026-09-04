"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PostPage = () => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [money, setMoney] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const profileId = localStorage.getItem("profileId");
      
      const resp = await fetch("http://localhost:5000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          job,
          money,
          describtion: description,
          days,
          secrete: 0,
          profileId: profileId || undefined
        }),
      });

      const data = await resp.json();

      if (data.success || data) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError("Failed to post job. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
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
            Post a New Job
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
            ✓ Job posted successfully! Redirecting to dashboard...
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
            {/* Your Name/Organization */}
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
                Your Name or Organization *
              </label>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="e.g., John Smith or Acme Inc."
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

            {/* Job Type */}
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
                Job Type *
              </label>
              <input
                required
                onChange={(e) => setJob(e.target.value)}
                value={job}
                type="text"
                placeholder="e.g., Frontend Developer, UI/UX Designer, Content Writer"
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

            {/* Budget */}
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
                Budget (USD) *
              </label>
              <input
                required
                onChange={(e) => setMoney(Number(e.target.value))}
                value={money || ""}
                type="number"
                placeholder="e.g., 500"
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
                Timeline (Days) *
              </label>
              <input
                required
                onChange={(e) => setDays(e.target.value)}
                value={days}
                type="number"
                placeholder="e.g., 7"
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

            {/* Description */}
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
                Job Description *
              </label>
              <textarea
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Describe the job, requirements, and expectations in detail..."
                rows={8}
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
                {loading ? "Posting..." : "Post Job"}
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
            Tips for Posting a Great Job
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#6b7280", fontSize: 14 }}>
            <li style={{ marginBottom: 8 }}>
              Be clear and specific about what you need
            </li>
            <li style={{ marginBottom: 8 }}>
              Include all relevant details and requirements
            </li>
            <li style={{ marginBottom: 8 }}>
              Set a realistic budget for the work
            </li>
            <li style={{ marginBottom: 8 }}>
              Provide a reasonable timeline for completion
            </li>
            <li>
              Mention any specific skills or experience required
            </li>
          </ul>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default PostPage;
