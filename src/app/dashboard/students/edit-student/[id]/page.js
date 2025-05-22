"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fixdeValues, getStudentById, updateStudent } from "@/store/Action";

const UpdateStudentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentDetails);

  const fixedValues = useSelector((state) => state.fixedValues);

  useEffect(() => {
    if (id) {
      dispatch(getStudentById(id));
    }
  }, [id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: student?.name || "",
      email: student?.email || "",
      phone: student?.phone || "",
      banglaName: student?.banglaName || "",
      fathersName: student?.fathersName || "",
      mothersName: student?.mothersName || "",
      addmissionRoll: student?.addmissionRoll || "",
      boardRoll: student?.boardRoll || "",
      registration: student?.registration || "",
      session: student?.session || "",
      shift: student?.shift || "",
      district: student?.district || "",
      upazila: student?.upazila || "",
      union: student?.union || "",
      village: student?.village || "",
      department: student?.department || "",
      post: student?.post || "",
      studentId: student?.studentId || "",
      password: student?.password || "",
      confirmPassword: student?.confirmPassword || "",
      address: student?.address || "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      department: Yup.string().required("Department is required"),
      address: Yup.string().required("Address is required"),
      banglaName: Yup.string().required("Bangla Name is required"),
      fathersName: Yup.string().required("Father's Name is required"),
      mothersName: Yup.string().required("Mother's Name is required"),
      addmissionRoll: Yup.string().required("Admission Roll is required"),
      boardRoll: Yup.string().required("Board Roll is required"),
      registration: Yup.string().required("Registration is required"),
      session: Yup.string().required("Session is required"),
      shift: Yup.string().required("Shift is required"),
      district: Yup.string().required("District is required"),
      upazila: Yup.string().required("Upazila is required"),
      union: Yup.string().required("Union is required"),
      village: Yup.string().required("Village is required"),
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
      dispatch(updateStudent(student._id, formData));
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-8 px-4">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6 col-span-2">
          Update Student
        </h2>

        {/* Name */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Bangla Name", name: "banglaName", type: "text" },
          { label: "Fathers Name", name: "fathersName", type: "text" },
          { label: "Mothers Name", name: "mothersName", type: "text" },
          { label: "Addmission Roll", name: "addmissionRoll", type: "text" },
          { label: "Board Roll", name: "boardRoll", type: "text" },
          { label: "Registration", name: "registration", type: "text" },
          { label: "Union", name: "union", type: "text" },
          { label: "Village", name: "village", type: "text" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
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

        {/* Post */}
        <div className="flex flex-col">
          <label
            htmlFor="session"
            className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
          >
            Session
          </label>
          <select
            id="session"
            name="session"
            value={formik.values.session}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Session --</option>
            {fixedValues?.sessions?.map((option) => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="shift"
            className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
          >
            Shift
          </label>
          <select
            id="shift"
            name="shift"
            value={formik.values.shift}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Shift --</option>
            {fixedValues?.shifts?.map((option) => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label
            htmlFor="department"
            className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
          >
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Department --</option>
            {fixedValues?.departments?.map((option) => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {[
          ["district", "District", fixedValues?.districts],
          ["upazila", "Upazila", fixedValues?.upazilas],
        ].map(([name, label, options]) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
            >
              {label}
            </label>
            <input
              list={`${name}-options`}
              id={name}
              name={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Select ${label}`}
            />
            <datalist id={`${name}-options`}>
              {options?.map((option) => (
                <option key={option._id} value={option.name} />
              ))}
            </datalist>
          </div>
        ))}

        {/* Address (full width) */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
            Address
          </label>
          <textarea
            name="address"
            rows="3"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-md p-3 resize-none"
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
              className="w-24 h-24 object-cover rounded-md border border-gray-300"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
          ) : (
            <img
              src={student?.avatar?.url}
              alt="Student Avatar"
              className="w-24 h-24 object-cover rounded-md border border-gray-300"
            />
          )}
        </div>

        {/* Image Upload (full width) */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
            Image (Upload new image)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Submit Button (full width) */}
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateStudentPage;
