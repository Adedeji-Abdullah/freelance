import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, register then go to login
    navigate("/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name</label>
          <input name="name" />
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
