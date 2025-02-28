"use client";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://detailed-renata-lms-bpi-b7c9011f.koyeb.app/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // This ensures cookies are sent with the request
      });

      if (!response.ok) {
        throw new Error("Failed to submit email");
      }

      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        className=""
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="password"
        className=""
        required
      />
      <button type="submit" className="">
        Login
      </button>
    </form>
  );
};

export default page;
