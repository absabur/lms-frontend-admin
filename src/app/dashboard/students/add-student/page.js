"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addStudent, fixdeValues } from "@/store/Action";

const AddStudentPage = () => {
  const dispatch = useDispatch();

  const fixedValues = useSelector((state) => state.fixedValues);

  useEffect(() => {
    dispatch(
      fixdeValues({
        sessions: true,
        shifts: true,
        districts: true,
        upazilas: true,
        departments: true,
      })
    );
  }, []);

  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    banglaName: "",
    fathersName: "",
    mothersName: "",
    addmissionRoll: "",
    boardRoll: "",
    registration: "",
    session: "",
    shift: "",
    district: "",
    upazila: "",
    union: "",
    village: "",
    department: "",
    password: "",
    confirmPassword: "",
    address: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Get related options: "districts", "upazilas", etc.
    const options = fixedValues?.[`${name}s`] || [];

    // Find matching option by name
    const matchedOption = options.find((opt) => opt.name === value);

    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [name]: matchedOption?._id || value, // Store _id if matched, else raw value
      };

      // Optional: clear dependent fields if parent changes
      if (name === "district") {
        updatedForm["upazila"] = ""; // Reset upazila when district changes
      }

      return updatedForm;
    });
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    dispatch(addStudent(formData, router));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Student</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          "name",
          "email",
          "phone",
          "banglaName",
          "fathersName",
          "mothersName",
          "addmissionRoll",
          "boardRoll",
          "registration",
          "union",
          "village",
          "password",
          "confirmPassword",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label
              htmlFor={field}
              className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
            >
              {field}
            </label>
            <input
              key={field}
              type={
                field.toLowerCase().includes("password") ? "password" : "text"
              }
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
        ))}

        {[
          ["department", "Department", fixedValues?.departments],
          ["session", "Session", fixedValues?.sessions],
          ["shift", "Shift", fixedValues?.shifts],
        ].map(([name, label, options]) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
            >
              {label}
            </label>
            <select
              id={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select {label} --</option>
              {options?.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        {[
          ["district", "District", fixedValues?.districts],
          ["upazila", "Upazila", fixedValues?.upazilas],
        ].map(([name, label, options]) => {
          const isUpazila = name === "upazila";
          const filteredOptions = isUpazila
            ? options?.filter(
                (option) => option?.districtId?._id === form.district
              )
            : options;

          return (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
              >
                {label}
              </label>
              <select
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                disabled={isUpazila && !form.district}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{`Select ${label}`}</option>
                {filteredOptions?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
            Address
          </label>
          <textarea
            name="address"
            rows="3"
            value={form["address"]}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 resize-none"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
            image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Register Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentPage;
