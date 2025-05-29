"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation"; // or 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fixdeValues, getBookBySlug, updateBook } from "@/store/Action";

const UpdateBookPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.singleBook);
  const fixedValues = useSelector((state) => state.fixedValues);
  const bookUpdated = useSelector((state) => state.bookUpdated);

  useEffect(() => {
    if (slug) {
      dispatch(getBookBySlug(slug));
    }
    dispatch(
      fixdeValues({
        countries: true,
        languages: true,
        shelves: true,
        departments: true,
      })
    );
  }, [slug, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bookName: book?.bookName || "",
      bookAuthor: book?.bookAuthor || "",
      publisher: book?.publisher || "",
      edition: book?.edition || "",
      numberOfPages: book?.numberOfPages || "",
      country: book?.country?._id || "",
      language: book?.language?._id || "",
      mrp: book?.mrp || "",
      shelf: book?.shelf?._id || "",
      department: book?.department?._id || "",
      quantity: book?.quantity || "",
      description: book?.description || "",
      bookNumbers: book?.bookNumbers?.map(String).join(", ") || "",
      images: null,
    },
    validationSchema: Yup.object({
      bookName: Yup.string().required("Book Name is required"),
      bookAuthor: Yup.string().required("Book Author is required"),
      publisher: Yup.string().required("Publisher is required"),
      edition: Yup.string().required("Edition is required"),
      numberOfPages: Yup.number()
        .typeError("Must be a number")
        .required("Number of Pages is required"),
      country: Yup.string().required("Country is required"),
      language: Yup.string().required("Language is required"),
      mrp: Yup.number()
        .typeError("Must be a number")
        .required("MRP is required"),
      shelf: Yup.string().required("Shelf is required"),
      department: Yup.string().required("Department is required"),
      quantity: Yup.number()
        .typeError("Must be a number")
        .required("Quantity is required"),
      description: Yup.string(),
      bookNumbers: Yup.string(),
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
      dispatch(updateBook(book._id, formDataToSend));
    },
  });

  useEffect(() => {
    if (bookUpdated) {
      formik.resetForm();
      // Optional: navigate or show success message here
    }
  }, [bookUpdated]);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-8 px-4 rounded-lg">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="w-full rounded-lg gap-6 flex flex-wrap gap-4 items-start justify-center lg:justify-between"
      >
        <h2 className="col-span-full text-3xl font-bold text-center mb-6 w-[100%]">
          Update Book
        </h2>

        {/* Left column inputs */}
        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Book Name
          </label>
          <input
            type="text"
            name="bookName"
            value={formik.values.bookName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.bookName && formik.errors.bookName && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.bookName}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Book Author
          </label>
          <input
            type="text"
            name="bookAuthor"
            value={formik.values.bookAuthor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.bookAuthor && formik.errors.bookAuthor && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.bookAuthor}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Publisher
          </label>
          <input
            type="text"
            name="publisher"
            value={formik.values.publisher}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.publisher && formik.errors.publisher && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.publisher}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Edition
          </label>
          <input
            type="text"
            name="edition"
            value={formik.values.edition}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.edition && formik.errors.edition && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.edition}</p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Number of Pages
          </label>
          <input
            type="number"
            name="numberOfPages"
            value={formik.values.numberOfPages}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.numberOfPages && formik.errors.numberOfPages && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.numberOfPages}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label
            htmlFor="country"
            className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Country --</option>
            {fixedValues?.countries?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label
            htmlFor="language"
            className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            value={formik.values.language}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Language --</option>
            {fixedValues?.languages?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {formik.touched.language && formik.errors.language && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.language}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            MRP
          </label>
          <input
            type="number"
            name="mrp"
            value={formik.values.mrp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.mrp && formik.errors.mrp && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.mrp}</p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label
            htmlFor="shelf"
            className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2"
          >
            Shelf
          </label>
          <select
            id="shelf"
            name="shelf"
            value={formik.values.shelf}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Shelf --</option>
            {fixedValues?.shelves?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {formik.touched.shelf && formik.errors.shelf && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.shelf}</p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label
            htmlFor="department"
            className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2"
          >
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Department --</option>
            {fixedValues?.departments?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {formik.touched.department && formik.errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.department}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%]">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.quantity}
            </p>
          )}
        </div>
        <div className="flex flex-col w-[100%] md:w-[48%] lg:w-[30%] col-span-full">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Book Numbers
          </label>
          <input
            type="text"
            name="bookNumbers"
            value={formik.values.bookNumbers}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.bookNumbers && formik.errors.bookNumbers && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.bookNumbers}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[100%] col-span-full">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>
        {formik.values.images && formik.values.images.length > 0 ? (
          <div className="col-span-full flex flex-wrap gap-4 w-full">
            {Array.from(formik.values.images).map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="relative"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md border border-lborder dark:border-dborder"
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
                    className="text-sm px-2 py-1 bg-light1 dark:bg-dark1 rounded disabled:opacity-50"
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
                    className="text-sm px-2 py-1 bg-light1 dark:bg-dark1 rounded disabled:opacity-50"
                  >
                    →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full mb-4 flex flex-wrap gap-4">
            {book?.images?.map((image) => (
              <img
                key={image.public_id}
                src={image.url}
                alt={`Book Image ${image.public_id + 1}`}
                className="w-24 h-24 object-cover rounded-md border border-lborder dark:border-dborder"
              />
            ))}
          </div>
        )}

        <div className="flex flex-col w-[100%] col-span-full">
          <label className="text-sm font-medium text-dark1 dark:text-light1 mb-1 relative top-[15px] left-[5px] bg-light1 dark:bg-dark1 z-10 w-fit px-2">
            Book Images (You can upload new ones)
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(event) =>
              formik.setFieldValue(
                "images",
                Array.from(event.currentTarget.files)
              )
            }
            className="border border-lborder dark:border-dborder rounded-md p-2"
          />
          {formik.touched.images && formik.errors.images && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.images}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-[100%] col-span-full bg-button1 dark:bg-button3 hover:bg-button1 dark:bg-button3 text-light2 dark:text-dark2 font-semibold py-3 rounded-md transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBookPage;
