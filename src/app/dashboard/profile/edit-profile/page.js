"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProfile } from "@/store/Action";

const UpdateProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile?.name || "",
      phone: profile?.phone || "",
      nId: profile?.nId || "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      nId: Yup.string().required("NID is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === "image" && values.image) {
          formData.append("image", values.image);
        } else {
          formData.append(key, values[key]);
        }
      }
      dispatch(updateProfile(formData));
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-8 px-4">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="bg-light1 dark:bg-dark1 w-full max-w-4xl p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6 col-span-2">
          Update Profile
        </h2>

        {/* Name */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "NID", name: "nId", type: "text" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-lborder dark:border-dborder rounded-md p-3"
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}


        {/* Image Preview (full width) */}
        <div className="col-span-2 mb-4 flex flex-wrap gap-4">
          {formik.values.image ? (
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt={`Preview`}
              className="w-24 h-24 object-cover rounded-md border border-lborder dark:border-dborder"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
          ) : (
            <img
              src={profile?.avatar?.url}
              alt="Profile Avatar"
              className="w-24 h-24 object-cover rounded-md border border-lborder dark:border-dborder"
            />
          )}
        </div>

        {/* Image Upload (full width) */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">Image (Upload new image)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
        </div>

        {/* Submit Button (full width) */}
        <button
          type="submit"
          className="col-span-2 bg-button1 dark:bg-button3 hover:bg-button1 dark:bg-button3 text-light2 dark:text-dark2 py-3 rounded-md font-semibold transition disabled:opacity-50"
          disabled={formik.isSubmitting}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
