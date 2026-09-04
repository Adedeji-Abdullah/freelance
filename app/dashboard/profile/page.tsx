"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [category, setCategory] = useState("Freelancing agent");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [group, setGroup] = useState("Frontend developer");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setProfilePicture(file);
      setError("");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect( () => {
    const resp = async() => {
      const user = localStorage.getItem("loggedIn-ID")
    const response = await fetch(`http://localhost:5000/api/profile/${user}`)
    console.log(response)
    }
    resp()
  }, [])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!firstname || !lastname || !email || !bio) {
      setError("Please fill in all required fields");
      return;
    }

    if (!profilePicture) {
      setError("Please upload a profile picture");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = await new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("category", category);
      formData.append("group", group);
      formData.append("bio", bio);
      formData.append("profilePicture", profilePicture);
      
      const response = await fetch(`http://localhost:5000/api/profile3/${localStorage.getItem("loggedIn-ID")}`, {
        method: "POST",
        body: formData,
      });
      // const data = await fetch("http://localhost:5000/")

      const result = await response.json();
      console.log(result)
      console.log(result.data.profile.slice(-1))
      const applicant = localStorage.setItem("applicant-profile", result.data.profile.slice(-1)[0].data)
      console.log("applicant-profile", result.data.profile.slice(-1)[0].data)


      if (result.success) {
        setSuccess(true);
        // Save profile ID to localStorage
        if (result.data && result.data._id) {
          localStorage.setItem("profileId", result.data._id);
        }
        // Reset form
        setFirstname("");
        setLastname("");
        setEmail("");
        setBio("");
        setProfilePicture(null);
        setPreviewUrl("");
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError(result.message || "Error creating profile");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error creating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {isAuthorized === false && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "#f8fafc",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "#6b7280" }}>
              Redirecting to login...
            </div>
          </div>
        </div>
      )}

      {isAuthorized === null && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "#f8fafc",
          }}
        >
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
              <h1
                className="text-center"
                style={{ margin: 0, fontSize: 26, fontWeight: 700 }}
              >
                Create Your Profile
              </h1>
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
                ✓ Profile created successfully! Redirecting to dashboard...
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
            {/* Profile Picture Upload */}
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
                Your profile picture *
              </label>
              
              {previewUrl && (
                <div style={{ marginBottom: 16, textAlign: "center" }}>
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: 8,
                      objectFit: "cover",
                      border: "2px solid #e2e8f0"
                    }}
                  />
                  <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
                    Preview
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "2px dashed #e2e8f0",
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
              />
              <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
              </p>
            </div>

            <section className="flex justify-between">
              {/* First Name */}
              <div className="w-2/5" style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "#0f172a",
                  }}
                >
                  First name *
                </label>
                <input
                  required
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  type="text"
                  placeholder="e.g., John"
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

              {/* Last Name */}
              <div className="w-2/5" style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "#0f172a",
                  }}
                >
                  Last name *
                </label>
                <input
                  required
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  type="text"
                  placeholder="e.g., Doe"
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
            </section>

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
                Category *
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
                  cursor: "pointer",
                }}
              >
                <option value="Freelancing agent">Freelancing agent</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>

            {/* Group/Specialization */}
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
                Specialization *
              </label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
              >
                <option value="Frontend developer">Frontend developer</option>
                <option value="Backend developer">Backend developer</option>
                <option value="Full-stack developer">Full-stack developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Software engineer">Software engineer</option>
                <option value="Content writer">Content writer</option>
                <option value="Mobile developer">Mobile developer</option>
                <option value="DevOps">DevOps</option>
                <option value="Other">Other</option>
              </select>
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
                Email *
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

            {/* Bio */}
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
                About You *
              </label>
              <textarea
                required
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                placeholder="Tell us about yourself, your experience, and skills..."
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
                {loading ? "Uploading..." : "Create Profile"}
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
                  color: "#0f172a",
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
            Tips for getting hired
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#6b7280", fontSize: 14 }}>
            <li style={{ marginBottom: 8 }}>
              Make sure you post a clear profile picture 
            </li>
            <li style={{ marginBottom: 8 }}>
              Include all relevant details and requirements
            </li>
            <li style={{ marginBottom: 8 }}>
              provide your name without mistakes
            </li>
            <li style={{ marginBottom: 8 }}>
              Provide your real email
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

export default ProfilePage;
