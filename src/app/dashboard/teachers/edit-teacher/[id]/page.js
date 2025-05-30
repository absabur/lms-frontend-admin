"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fixdeValues, getTeacherById, updateTeacher } from "@/store/Action";

const UpdateTeacherPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teacherDetails);

  const fixedValues = useSelector((state) => state.fixedValues);

  useEffect(() => {
    if (id) {
      dispatch(getTeacherById(id));
      dispatch(
        fixdeValues({
          departments: true,
          posts: true,
        })
      );
    }
  }, [id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: teacher?.name || "",
      phone: teacher?.phone || "",
      email: teacher?.email || "",
      nId: teacher?.nId || "",
      teacherId: teacher?.teacherId || "",
      department: teacher?.department?._id || "",
      post: teacher?.post?._id || "",
      address: teacher?.address || "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      nId: Yup.string().required("NID is required"),
      teacherId: Yup.string().required("Teacher ID is required"),
      department: Yup.string().required("Department is required"),
      post: Yup.string().required("Post is required"),
      address: Yup.string().required("Address is required"),
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
      dispatch(updateTeacher(teacher._id, formData));
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-start py-8 px-4">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="bg-bgl1 dark:bg-bgd1 bg-bgl1 dark:bg-bgd1 border border-borl dark:border-bord w-full max-w-3xl p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <h2 className="text-3xl font-bold text-center mb-6 col-span-2">
          Update Teacher
        </h2>

        {/* Name */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "NID", name: "nId", type: "text" },
          { label: "Teacher ID", name: "teacherId", type: "text" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-bgl1 dark:bg-bgd1 bg-bgl1 dark:bg-bgd1 border border-borl dark:border-bord rounded-md p-3"
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}

        {/* Post */}
        <div className="flex flex-col">
          <label
            htmlFor="post"
            className="text-sm font-medium mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2"
          >
            Posts
          </label>
          <select
            id="post"
            name="post"
            value={formik.values.post}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-bgl1 dark:bg-bgd1 border border-borl dark:border-bord rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Posts --</option>
            {fixedValues?.posts?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label
            htmlFor="department"
            className="text-sm font-medium mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2"
          >
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-bgl1 dark:bg-bgd1 border border-borl dark:border-bord rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Department --</option>
            {fixedValues?.departments?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address (full width) */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2">
            Address
          </label>
          <textarea
            name="address"
            rows="3"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-bgl1 dark:bg-bgd1 bg-bgl1 dark:bg-bgd1 border border-borl dark:border-bord rounded-md p-3 resize-none"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* Image Preview (full width) */}
        <div className="col-span-2 mb-4 flex flex-wrap gap-4">
          {formik.values.image ? (
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt={`Preview`}
              className="w-24 h-24 object-cover rounded-md bg-bgl1 dark:bg-bgd1 border border-borl dark:border-bord"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
          ) : (
            <img
              src={teacher?.avatar?.url}
              alt="Teacher Avatar"
              className="w-24 h-24 object-cover rounded-md bg-bgl1 dark:bg-bgd1 border border-borl dark:border-bord"
            />
          )}
        </div>

        {/* Image Upload (full width) */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2">
            Image (Upload new image)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            className="bg-bgl1 dark:bg-bgd1 border border-borl dark:border-bord rounded-md p-2"
          />
        </div>

        {/* Submit Button (full width) */}
        <button
          type="submit"
          className="col-span-2 bg-buttonp hover:bg-buttona text-textd py-3 rounded-md font-semibold transition disabled:opacity-50"
          disabled={formik.isSubmitting}
        >
          Update Teacher
        </button>
      </form>
    </div>
  );
};

export default UpdateTeacherPage;
