'use client'
import { useState } from "react";

const page = () => {
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

    try {
      const response = await fetch("https://detailed-renata-lms-bpi-b7c9011f.koyeb.app/api/admin/register", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="" required />
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="" required />
      <input type="text" name="verificationCode" value={formData.verificationCode} onChange={handleChange} placeholder="Verification Code" className="" required />
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="" required />
      <input type="text" name="nId" value={formData.nId} onChange={handleChange} placeholder="nId" className="" required />
      <input type="file" accept="image/*" onChange={handleFileChange} className="" required />
      <button type="submit" className="">Submit</button>
    </form>
  );
};

export default page;
