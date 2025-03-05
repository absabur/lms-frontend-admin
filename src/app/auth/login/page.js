"use client";
import { login } from "@/store/Action";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className=""
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        className=""
        required
      />
      <button type="submit" className="">
        Login
      </button>
      <p>
        Don't have an account? <Link href="/auth/signup">Sign Up</Link>
      </p>
    </form>
  );
};

export default page;
