"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProfilePassword } from "@/store/Action"; // You can replace this with changePassword if needed

const ChangePasswordPage = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Minimum 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm your new password"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();

      for (const key in values) {
        if (key === "image" && values.image) {
          formData.append("image", values.image);
        } else if (key !== "image") {
          formData.append(key, values[key]);
        }
      }

      dispatch(updateProfilePassword(formData));
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-12 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white w-full max-w-xl p-8 rounded-lg shadow-lg flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center">Change Password</h2>

        {[
          { name: "oldPassword", label: "Old Password" },
          { name: "newPassword", label: "New Password" },
          { name: "confirmPassword", label: "Confirm New Password" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
            >
              {field.label}
            </label>
            <input
              type="password"
              name={field.name}
              id={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md p-3"
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          // disabled={formik.isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition disabled:opacity-50"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
