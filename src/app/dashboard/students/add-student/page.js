"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fixdeValues, addStudent } from "@/store/Action";
import imageCompression from "browser-image-compression";

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
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
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
      addmissionRoll: Yup.string().notRequired(),
      boardRoll: Yup.string().notRequired(),
      registration: Yup.string().notRequired(),
      session: Yup.string().required("Session is required"),
      shift: Yup.string().required("Shift is required"),
      district: Yup.string().required("District is required"),
      upazila: Yup.string().required("Upazila is required"),
      union: Yup.string().required("Union is required"),
      village: Yup.string().required("Village is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      for (const key in values) {
        if (key === "image" && values.image) {
          try {
            const options = {
              maxSizeMB: 0.8,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };

            const compressedImage = await imageCompression(
              values.image,
              options
            );
            formData.append("image", compressedImage);
          } catch (error) {
            console.error("Image compression failed:", error);
            formData.append("image", values.image);
          }
        } else {
          formData.append(key, values[key]);
        }
      }

      dispatch(addStudent(formData));
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-start py-8 px-4">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="dark:bg-bgd1 border border-borl dark:border-bord bg-bgl1 w-full max-w-4xl p-6 sm:p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 col-span-1 md:col-span-2">
          Add Student
        </h2>

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
            <label className="text-sm font-medium text-bgd1 dark:text-bgl1 mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="dark:bg-bgd1 border border-borl dark:border-bord rounded-md p-3"
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}
        {[
          { label: "Password", name: "password", type: "password" },
          {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
          },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-bgd1 dark:text-bgl1 mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="dark:bg-bgd1 border border-borl dark:border-bord rounded-md p-3"
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}

        {[
          { id: "session", label: "Session", options: fixedValues?.sessions },
          { id: "shift", label: "Shift", options: fixedValues?.shifts },
          {
            id: "department",
            label: "Department",
            options: fixedValues?.departments,
          },
        ].map(({ id, label, options }) => (
          <div key={id} className="flex flex-col">
            <label
              htmlFor={id}
              className="text-sm font-medium text-bgd1 dark:text-bgl1 mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2"
            >
              {label}
            </label>
            <select
              id={id}
              name={id}
              value={formik.values[id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="dark:bg-bgd1 border border-borl dark:border-bord rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">{`-- Select ${label} --`}</option>
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
                (opt) => opt?.districtId?._id === formik.values.district
              )
            : options;

          return (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="text-sm font-medium text-bgd1 dark:text-bgl1 mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2"
              >
                {label}
              </label>
              <select
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={(e) => formik.setFieldValue(name, e.target.value)}
                onBlur={formik.handleBlur}
                disabled={isUpazila && !formik.values.district}
                className="dark:bg-bgd1 border border-borl dark:border-bord rounded-md px-3 py-2 focus:outline-none"
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

        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-bgd1 dark:text-bgl1 mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2">
            Address
          </label>
          <textarea
            name="address"
            rows="3"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="dark:bg-bgd1 border border-borl dark:border-bord rounded-md p-3 resize-none"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 mb-4 flex flex-wrap gap-4">
          {formik.values.image ? (
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md dark:bg-bgd1 border border-borl dark:border-bord"
              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
            />
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-bgd1 dark:text-bgl1 mb-1 relative top-[15px] left-[5px] bg-bgl1 dark:bg-bgd1 z-10 w-fit px-2">
            Image (Upload new image)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) =>
              formik.setFieldValue("image", event.currentTarget.files[0])
            }
            className="dark:bg-bgd1 border border-borl dark:border-bord rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-buttonp hover:bg-buttona text-textd py-2 px-4 rounded-md transition"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
