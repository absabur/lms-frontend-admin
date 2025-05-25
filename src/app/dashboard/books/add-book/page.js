"use client";
import { addBook, fixdeValues } from "@/store/Action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const page = () => {
  const dispatch = useDispatch();
  const fixedValues = useSelector((state) => state.fixedValues);
  useEffect(() => {
    dispatch(fixdeValues());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      bookName: "",
      bookAuthor: "",
      publisher: "",
      edition: "",
      numberOfPages: "",
      country: "",
      language: "",
      mrp: "",
      shelf: "",
      department: "",
      quantity: "",
      description: "",
      bookNumbers: "",
      images: null,
    },
    validationSchema: Yup.object({
      bookName: Yup.string().required("Book Name is required"),
      bookAuthor: Yup.string().required("Book Author is required"),
      publisher: Yup.string().required("Publisher is required"),
      edition: Yup.string().required("Edition is required"),
      numberOfPages: Yup.number().required("Number of Pages is required"),
      country: Yup.string().required("Country is required"),
      language: Yup.string().required("Language is required"),
      mrp: Yup.number().required("MRP is required"),
      shelf: Yup.string().required("Shelf is required"),
      department: Yup.string().required("Department is required"),
      quantity: Yup.number().required("Quantity is required"),
      description: Yup.string(),
      bookNumbers: Yup.string(),
      images: Yup.mixed().required("Images are required"),
    }),
    onSubmit: (values) => {
      const formDataToSend = new FormData();
      for (const key in values) {
        if (key === "images" && values.images) {
          for (let i = 0; i < values.images.length; i++) {
            formDataToSend.append("images", values.images[i]);
          }
        } else {
          formDataToSend.append(key, values[key]);
        }
      }
      dispatch(addBook(formDataToSend));
    },
  });

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 py-6">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Add a New Book</h2>

        <div className="space-y-4">
          {/* Book Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Book Name:
            </label>
            <input
              type="text"
              name="bookName"
              value={formik.values.bookName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            />
            {formik.touched.bookName && formik.errors.bookName && (
              <div className="text-red-500 text-sm">
                {formik.errors.bookName}
              </div>
            )}
          </div>

          {/* Book Author */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Book Author:
            </label>
            <input
              type="text"
              name="bookAuthor"
              value={formik.values.bookAuthor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            />
            {formik.touched.bookAuthor && formik.errors.bookAuthor && (
              <div className="text-red-500 text-sm">
                {formik.errors.bookAuthor}
              </div>
            )}
          </div>

          {/* Publisher */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Publisher:
            </label>
            <input
              type="text"
              name="publisher"
              value={formik.values.publisher}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            />
            {formik.touched.publisher && formik.errors.publisher && (
              <div className="text-red-500 text-sm">
                {formik.errors.publisher}
              </div>
            )}
          </div>

          {/* Edition */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Edition:
            </label>
            <input
              type="text"
              name="edition"
              value={formik.values.edition}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            />
            {formik.touched.edition && formik.errors.edition && (
              <div className="text-red-500 text-sm">
                {formik.errors.edition}
              </div>
            )}
          </div>

          {/* Number of Pages */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Number of Pages:
            </label>
            <input
              type="number"
              name="numberOfPages"
              value={formik.values.numberOfPages}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            />
            {formik.touched.numberOfPages && formik.errors.numberOfPages && (
              <div className="text-red-500 text-sm">
                {formik.errors.numberOfPages}
              </div>
            )}
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Country:
            </label>
            <select
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            >
              <option value="">Select Country</option>
              {fixedValues?.countries?.map((country) => (
                <option key={country._id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {formik.touched.country && formik.errors.country && (
              <div className="text-red-500 text-sm">
                {formik.errors.country}
              </div>
            )}
          </div>

          {/* Language */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Language:
            </label>
            <select
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            >
              <option value="">Select Language</option>
              {fixedValues?.languages?.map((lang) => (
                <option key={lang._id} value={lang.name}>
                  {lang.name}
                </option>
              ))}
            </select>
            {formik.touched.language && formik.errors.language && (
              <div className="text-red-500 text-sm">
                {formik.errors.language}
              </div>
            )}
          </div>

          {/* MRP */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              MRP:
            </label>
            <input
              type="number"
              name="mrp"
              value={formik.values.mrp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            />
            {formik.touched.mrp && formik.errors.mrp && (
              <div className="text-red-500 text-sm">{formik.errors.mrp}</div>
            )}
          </div>

          {/* Shelf */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Shelf:
            </label>
            <select
              name="shelf"
              value={formik.values.shelf}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            >
              <option value="">Select Shelf</option>
              {fixedValues?.shelves?.map((shelf) => (
                <option key={shelf._id} value={shelf.name}>
                  {shelf.name}
                </option>
              ))}
            </select>
            {formik.touched.shelf && formik.errors.shelf && (
              <div className="text-red-500 text-sm">{formik.errors.shelf}</div>
            )}
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Department:
            </label>
            <select
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {fixedValues?.departments?.map((department) => (
                <option key={department._id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
            {formik.touched.department && formik.errors.department && (
              <div className="text-red-500 text-sm">
                {formik.errors.department}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Quantity:
            </label>
            <input
              type="number"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
              required
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <div className="text-red-500 text-sm">
                {formik.errors.quantity}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Description:
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
            />
          </div>

          {/* Book Numbers */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Book Numbers:
            </label>
            <input
              type="text"
              name="bookNumbers"
              value={formik.values.bookNumbers}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-md"
            />
          </div>

          {formik.values.images && formik.values.images.length > 0 ? (
            <div className="col-span-full mb-4 flex flex-wrap gap-4">
              {[...formik.values.images].map((file, index) => (
                <div
                  key={`${file.name}-${file.size}-${index}`}
                  className="relative"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md border border-gray-300"
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                  />
                  <div className="flex justify-between mt-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => {
                        const imagesArray = Array.from(formik.values.images);
                        [imagesArray[index - 1], imagesArray[index]] = [
                          imagesArray[index],
                          imagesArray[index - 1],
                        ];
                        formik.setFieldValue("images", imagesArray);
                      }}
                      className="text-sm px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      disabled={index === formik.values.images.length - 1}
                      onClick={() => {
                        const imagesArray = Array.from(formik.values.images);
                        [imagesArray[index], imagesArray[index + 1]] = [
                          imagesArray[index + 1],
                          imagesArray[index],
                        ];
                        formik.setFieldValue("images", imagesArray);
                      }}
                      className="text-sm px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2">
              Book Images:
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              required
              onChange={(event) =>
                formik.setFieldValue("images", Array.from(event.target.files))
              }
              className="border border-gray-300 p-3 rounded-md"
            />
            {formik.touched.images && formik.errors.images && (
              <div className="text-red-500 text-sm">{formik.errors.images}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-md"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default page;
