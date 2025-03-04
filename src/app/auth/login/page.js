"use client";
import { login } from "@/store/Action";
import { useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();  

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
    dispatch(login({email, password}))    
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
