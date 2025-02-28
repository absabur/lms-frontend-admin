'use client'
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://detailed-renata-lms-bpi-b7c9011f.koyeb.app/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
        onChange={handleChange}
        placeholder="Email"
        className=""
        required
      />
      <button type="submit" className="">
        Next
      </button>
    </form>
  );
};

export default page;
