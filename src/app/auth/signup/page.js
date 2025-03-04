"use client";

import { signup } from "@/store/Action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const signupEmail = useSelector((state)=> state.signupEmail)
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signup(email))
  };

  useEffect(() => {
    if (signupEmail) {
      router.push("/auth/register");
    }
  }, [signupEmail])
  

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
