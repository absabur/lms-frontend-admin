"use client";
import { register } from "@/store/Action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const signupEmail = useSelector((state) => state.signupEmail);
  const registerSuccess = useSelector((state) => state.registerSuccess);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!signupEmail) {
      router.push(`/auth/signup`, { scroll: false });
    } else {
      setFormData((prev) => ({ ...prev, email: signupEmail }));
    }
  }, []);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    verificationCode: "",
    name: "",
    email: "",
    phone: "",
    nId: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    dispatch(register(data));
  };

  useEffect(() => {
    if (registerSuccess) {
      router.push("/auth/login");
    }
  }, [registerSuccess]);

  return (
    <form onSubmit={handleSubmit} className="">
      <p>
        Don't refresh the page. Don't change the page. If you do, you will lose
        this page..
      </p>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className=""
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className=""
        required
      />
      <input
        type="text"
        name="verificationCode"
        value={formData.verificationCode}
        onChange={handleChange}
        placeholder="Verification Code"
        className=""
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className=""
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className=""
        required
      />
      <input
        type="text"
        name="nId"
        value={formData.nId}
        onChange={handleChange}
        placeholder="nId"
        className=""
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className=""
        required
      />
      <button type="submit" className="">
        Submit
      </button>
      <p>
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </form>
  );
};

export default page;
