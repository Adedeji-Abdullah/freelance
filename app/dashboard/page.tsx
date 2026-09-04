"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [bids, setBids] = useState<bid[]>([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "profile" | "applicants" | "applicant-details">("overview");
  const [applicants, setApplicants] = useState<any[]>([]);
  const [applicantData, setApplicantData] = useState<any>({});
  const [accept, setAccept] = useState("");
  const [confirmData, setConfirmData] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [searchJob, setSearchJob] = useState("");
  const [applicantsVerification, setApplicantsVerification] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [selectedBidId, setSelectedBidId] = useState<string>("");
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>("");
  const [profileData, setProfileData] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  type bid = {
    _id: string;
    name: String;
    job: String;
    money: number;
    describtion: String;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

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
        
        // Check if response is OK
        if (!data.ok) {
          console.error("Authorization endpoint returned status:", data.status);
          setIsAuthorized(false);
          router.push("/login");
          return;
        }

        // Check if response is JSON
        const contentType = data.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Authorization endpoint returned non-JSON:", contentType);
          setIsAuthorized(false);
          router.push("/login");
          return;
        }

        const result = await data.json();
        
        if (result.message === "success" || result.message) {
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

  // useEffect(() => {
    const fetchingProfile = async () => {
      const id = localStorage.getItem("loggedIn-ID")
    const data = await fetch(`http://localhost:5000/api/getting-profile/${id}`)
    setProfileLoading(false)
    const data2 = await data.json()
    const result = JSON.parse(data2)
    console.log("result" + result)
    setProfileData(result)
    console.log(result.data.lastname)
  }
  // fetchingProfile()
  // }, [])

  useEffect(() => {
    const respo = async () => {
      try {
        const data = await fetch("http://localhost:5000/bids");
        const result = await data.json();
        setBids(result);
      } catch (error: any) {
        setError("Failed to load jobs");
      }
    };
    respo();
  }, []);

  const applicant = async () => {
    try {
      setApplicantsVerification(true);
      const data = await fetch("http://localhost:5000/applicants");
      const result = await data.json();
      const filtered = result.filter(
        (item: any) => item._id === localStorage.getItem("applicant-id")
      );
      if (filtered.length > 0) {
        setApplicants(filtered[0].option);
      }
    } catch (error) {
      setError("Failed to load applicants");
    }
  };

  const fetchUserProfile = async () => {
    try {
      // Get profile ID from localStorage or from user data
      const profileId = localStorage.getItem("profileId");
      
      if (!profileId) {
        setProfileData(null);
        setProfileLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/profile/${profileId}`
      );
      const result = await response.json();

      if (result.success && result.data) {
        // const data = localStorage.getItem("applicant-profile")
        // setProfileData(data)
        console.log(profileData)
      } else {
        setProfileData(null);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      setProfileData(null);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleConfirmation = async () => {
    const data = await fetch("http://localhost:5000/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: accept,
        confirmData: confirmData,
      }),
    });
    localStorage.setItem("userId", accept)
    const result = await data.json();
    if (result.message === "Successful") {
      setConfirm(true);
      alert("Confirmation successful! Email: " + applicantData.email);
    } else {
      alert("Incorrect secret code");
    }
  };

  const filteredBids = searchJob
    ? bids.filter(
        (item) =>
          item.job.toLowerCase().includes(searchJob.toLowerCase()) ||
          item.name.toString().toLowerCase().includes(searchJob.toLowerCase())
      )
    : bids;

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>
          AL Freelancing Dashboard
        </h1>
        <button
          onClick={logout}
          style={{
            background: "#fff",
            color: "#0b0b0b",
            border: "none",
            padding: "10px 20px",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Sign out
        </button>
      </div>

      <div style={{ padding: "32px 24px", maxWidth: 1400, margin: "0 auto" }}>
        {/* Search & Actions */}
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <input
            onChange={(e) => setSearchJob(e.target.value)}
            placeholder="Search by job title or client name..."
            type="text"
            style={{
              flex: "1 1 300px",
              height: 40,
              padding: "8px 16px",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              fontSize: 14,
              minWidth: "200px",
            }}
            className="text-gray-700"
          />
          <button
            onClick={() => router.push("/dashboard/post")}
            style={{
              background: "#0b0b0b",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 6,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            + Post a job
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "2px solid #e2e8f0",
            marginBottom: 24,
          }}
        >
          {["overview", "jobs", "profile", ...(applicantsVerification ? ["applicants"] : []), ...(confirm ? ["applicant-details"] : [])].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "profile") {
                  setProfileLoading(true);
                  fetchingProfile();
                }
                setActiveTab(tab as any)
              }}
              style={{
                padding: "12px 20px",
                background: "transparent",
                border: "none",
                borderBottom:
                  activeTab === tab ? "2px solid #0b0b0b" : "none",
                cursor: "pointer",
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#0b0b0b" : "#6b7280",
                fontSize: 15,
                textTransform: "capitalize",
              }}
            >
              {tab === "applicant-details" ? "Applicant Details" : tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  padding: 20,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div className="text-gray-700" style={{ color: "#6b7280", fontSize: 12, fontWeight: 500 }}>
                  Total Earnings
                </div>
                <div className="text-gray-800" style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>
                  $4,320
                </div>
                <div style={{ color: "#10b981", fontSize: 12, marginTop: 8 }}>
                  ↑ 12% from last month
                </div>
              </div>

              <div
                style={{
                  padding: 20,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 500 }}>
                  Active Projects
                </div>
                <div className="text-gray-800" style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>
                  {bids.length}
                </div>
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
                  Available jobs
                </div>
              </div>

              <div
                style={{
                  padding: 20,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 500 }}>
                  Completion Rate
                </div>
                <div className="text-gray-800" style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>
                  98%
                </div>
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
                  Above average
                </div>
              </div>

              <div
                style={{
                  padding: 20,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 500 }}>
                  Rating
                </div>
                <div  className="text-gray-800"style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>
                  4.9★
                </div>
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
                  From 48 clients
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {/* Quick Actions */}
              <div
                style={{
                  padding: 24,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                  height: "fit-content",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                   className="text-gray-800"
                >
                  Quick Actions
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button
                    onClick={() => router.push("/dashboard/post")}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 6,
                      background: "#0b0b0b",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Post a new job
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/feedback")}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 6,
                      background: "transparent",
                      border: "1px solid #e5e7eb",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                     className="text-gray-800"
                  >
                    Send Feedback
                  </button>
                  <button
                    style={{
                      padding: "12px 16px",
                      borderRadius: 6,
                      background: "transparent",
                      border: "1px solid #e5e7eb",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                     className="text-gray-800"
                  >
                    View Messages
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div
                style={{
                  padding: 24,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                   className="text-gray-800"
                >
                  Recent Activity
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {bids.slice(-3).map((bid, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 12,
                        borderRadius: 6,
                        background: "#f8fafc",
                        borderLeft: "3px solid #3b82f6",
                      }}
                    >
                      <div className="text-gray-950" style={{ fontWeight: 600, fontSize: 13 }}>
                        {bid.job}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>
                        ${bid.money} • {bid.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div>
            {error && (
              <div
                style={{
                  padding: 16,
                  marginBottom: 16,
                  borderRadius: 6,
                  background: "#fee2e2",
                  color: "#991b1b",
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}

            {filteredBids.length === 0 ? (
              <div
                style={{
                  padding: 40,
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 10,
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                }}
              >
                <p style={{ color: "#6b7280", fontSize: 16 }}>
                  No jobs found. Try adjusting your search.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: 20,
                }}
              >
                {filteredBids.map((bid) => (
                  <div
                    key={bid._id}
                    style={{
                      padding: 20,
                      borderRadius: 10,
                      background: "#fff",
                      boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: 12,
                      }}
                    >
                      <div>
                        <h4 className="text-gray-700 font-semibold" style={{ margin: "0 0 4px 0", fontSize: 16 }}>
                          {bid.name}
                        </h4>
                        <div
                          style={{
                            display: "inline-block",
                            background: "#dbeafe",
                            color: "#1e40af",
                            padding: "4px 8px",
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {bid.job}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#10b981",
                        }}
                      >
                        ${bid.money}
                      </div>
                    </div>

                    <p
                      style={{
                        margin: "12px 0",
                        color: "#6b7280",
                        fontSize: 13,
                        lineHeight: "1.5",
                        flex: 1,
                      }}
                    >
                      {bid.describtion?.substring(0, 100)}
                      {bid.describtion?.length > 100 ? "..." : ""}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 16,
                      }}
                    >
                      <button
                        onClick={() => {
                          localStorage.setItem("bid-data", bid._id);
                          router.push("/dashboard/bid");
                        }}
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          background: "#0b0b0b",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontSize: 13,
                        }}
                      >
                        Place Bid
                      </button>
                      <button
                        onClick={() => {
                          localStorage.setItem("applicant-id", bid._id);
                          setSelectedBidId(bid._id);
                          applicant();
                          setActiveTab("applicants");
                        }}
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          background: "transparent",
                          border: "1px solid #0b0b0b",
                          borderRadius: 6,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontSize: 13,
                        }}
                        className="text-gray-800"
                      >
                        View Bids
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            {profileLoading ? (
              <div
                style={{
                  padding: 40,
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 10,
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                }}
              >
                <p style={{ color: "#6b7280", fontSize: 16 }}>
                  Loading profile...
                </p>
              </div>
            ) : profileData ? (
              <div
                style={{
                  padding: 32,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 32,
                    marginBottom: 32,
                  }}
                >
                  {/* Profile Picture */}
                  <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                    {profileData.profilePictureUrl ? (
                      <img
                        src={`http://localhost:5000${profileData.profilePictureUrl}`}
                        alt="Profile"
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "3px solid #e2e8f0",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: "50%",
                          background: "#e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6b7280",
                          fontSize: 40,
                        }}
                      >
                        👤
                      </div>
                    )}
                  </div>

                  {/* Profile Information */}
                  <div>
                    <div style={{ marginBottom: 24 }}>
                      <h1
                        style={{
                          margin: "0 0 8px 0",
                          fontSize: 28,
                          fontWeight: 700,
                        }}
                      >
                        {profileData.data.firstname} {profileData.data.lastname}
                      </h1>
                      <p
                        style={{
                          margin: 0,
                          color: "#6b7280",
                          fontSize: 14,
                        }}
                      >
                        {profileData.data.group}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 16,
                        marginBottom: 24,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6b7280",
                            marginBottom: 4,
                          }}
                        >
                          Email
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#1f2937" }}>
                          {profileData.data.email}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6b7280",
                            marginBottom: 4,
                          }}
                        >
                          Category
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#1f2937" }}>
                          {profileData.data.category}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#6b7280",
                          marginBottom: 8,
                        }}
                      >
                        About
                      </div>
                      <p
                        style={{
                          margin: 0,
                          color: "#4b5563",
                          fontSize: 14,
                          lineHeight: "1.6",
                        }}
                      >
                        {profileData.data.bio}
                      </p>
                    </div>

                    <button
                      onClick={() => router.push("/dashboard/profile")}
                      style={{
                        padding: "12px 24px",
                        background: "#0b0b0b",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Additional Stats */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: 16,
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: 24,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#6b7280",
                        marginBottom: 4,
                      }}
                    >
                      Profile Created
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {new Date(profileData.data.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#6b7280",
                        marginBottom: 4,
                      }}
                    >
                      Last Updated
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {new Date(profileData.data.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: 40,
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 10,
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 48,
                      marginBottom: 16,
                    }}
                  >
                    👤
                  </div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: 16,
                      marginBottom: 8,
                    }}
                  >
                    No profile created yet
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>
                    Create a profile to showcase your skills and get hired
                  </p>
                </div>
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  style={{
                    padding: "12px 24px",
                    background: "#0b0b0b",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  Create Profile
                </button>
              </div>
            )}
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === "applicants" && (
          <div>
            {error && (
              <div
                style={{
                  padding: 16,
                  marginBottom: 16,
                  borderRadius: 6,
                  background: "#fee2e2",
                  color: "#991b1b",
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}

            {applicants.length === 0 ? (
              <div
                style={{
                  padding: 40,
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 10,
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                }}
              >
                <p style={{ color: "#6b7280", fontSize: 16 }}>
                  No applicants for this job yet.
                </p>
              </div>
            ) : (
              <div
                style={{
                  padding: 24,
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  Applicants for this job
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  {applicants.map((applicant, index) => (
                    <div
                      key={index}
                      style={{
                        padding: 16,
                        borderRadius: 8,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          marginBottom: 12,
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600 }}>
                            {applicant.data.name}
                          </div>
                          <div style={{ fontSize: 12, color: "#6b7280" }}>
                            ${applicant.data.amount}
                          </div>
                        </div>
                        <button
                          onClick={() => setAccept(applicant.data.id)}
                          style={{
                            background: accept === applicant.data.id ? "#10b981" : "#0b0b0b",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: 4,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontSize: 12,
                          }}
                        >
                          {accept === applicant.data.id
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>

                      <p
                        style={{
                          margin: "8px 0",
                          color: "#6b7280",
                          fontSize: 12,
                          lineHeight: "1.4",
                        }}
                      >
                        {applicant.data.describtion}
                      </p>

                      {accept === applicant.data.id && !confirm && (
                        <div style={{ marginTop: 12 }}>
                          <input
                            onChange={(e) => setConfirmData(e.target.value)}
                            placeholder="Enter secret code"
                            type="password"
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "1px solid #e2e8f0",
                              borderRadius: 4,
                              marginBottom: 8,
                              fontSize: 12,
                            }}
                          />
                          <button
                            disabled={!confirmData}
                            onClick={() => {
                              setApplicantData(applicant.data);
                              setSelectedApplicantId(applicant.data.id);
                              handleConfirmation();
                            }}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              background: confirmData ? "#0b0b0b" : "#cbd5e1",
                              color: "#fff",
                              border: "none",
                              borderRadius: 4,
                              fontWeight: 600,
                              cursor: confirmData ? "pointer" : "not-allowed",
                              fontSize: 12,
                            }}
                          >
                            Confirm
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Applicant Details Tab */}
        {activeTab === "applicant-details" && confirm && (
          <div
            style={{
              padding: 32,
              borderRadius: 10,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: "0 0 8px 0", fontSize: 28, fontWeight: 700 }}>
                  {applicantData.name}
                </h2>
                <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
                  {applicantData.email}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#10b981" }}>
                  ${applicantData.amount}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                  Proposed Rate
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 24, marginTop: 24 }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 600 }}>
                About
              </h3>
              <p style={{ margin: 0, color: "#6b7280", fontSize: 14, lineHeight: "1.6" }}>
                {applicantData.describtion}
              </p>
            </div>

            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 24, marginTop: 24 }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 600 }}>
                Portfolio
              </h3>
              <a
                href={applicantData.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#3b82f6",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  wordBreak: "break-all",
                }}
              >
                {applicantData.portfolio || "No portfolio link provided"}
              </a>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button
                onClick={() => {
                  setConfirm(false);
                  setAccept("");
                  setConfirmData("");
                  setActiveTab("applicants");
                }}
                style={{
                  padding: "12px 24px",
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Back to Applicants
              </button>
              <button
                style={{
                  padding: "12px 24px",
                  background: "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ✓ Confirmed
              </button>
            </div>
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default Dashboard;
