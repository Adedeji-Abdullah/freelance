"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-bw-900">AL Freelancing</Link>
          </div>

          <div className="flex-1 px-4 hidden md:block">
            <div className="max-w-lg mx-auto">
              <input
                type="search"
                placeholder="Find freelancers or projects"
                className="w-full rounded-md border border-bw-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bw-300"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button to="/dashboard" className="">Dashboard</Button>
            <Button to="/post" className="">Post job</Button>

            {!token ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="text-bw-900">Login</Link>
                <Link to="/register" className="text-bw-900">Register</Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={handleLogout} className="text-bw-900">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}