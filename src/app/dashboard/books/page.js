"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "@/store/Action.js";

const page = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, []);
  console.log(books);

  return (
    <div className="bg-gray-50 p-6">
      <Link
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded shadow-md mb-6 inline-block"
        href="/dashboard/add-book"
      >
        Add Book
      </Link>
      <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">
        All Books
      </h1>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border border-gray-300 p-3">#</th>
              <th className="border border-gray-300 p-3">Book Name</th>
              <th className="border border-gray-300 p-3">Author</th>
              <th className="border border-gray-300 p-3">Publisher</th>
              <th className="border border-gray-300 p-3">Edition</th>
              <th className="border border-gray-300 p-3">Pages</th>
              <th className="border border-gray-300 p-3">Country</th>
              <th className="border border-gray-300 p-3">Language</th>
              <th className="border border-gray-300 p-3">MRP</th>
              <th className="border border-gray-300 p-3">Shelf</th>
              <th className="border border-gray-300 p-3">Department</th>
              <th className="border border-gray-300 p-3">Quantity</th>
              <th className="border border-gray-300 p-3">Book Numbers</th>
              <th className="border border-gray-300 p-3">Description</th>
              <th className="border border-gray-300 p-3">Images</th>
              <th className="border border-gray-300 p-3">Created Date</th>
              <th className="border border-gray-300 p-3">Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {books?.books?.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors">
                <td className="border border-gray-300 p-3">{index + 1}</td>
                <td className="border border-gray-300 p-3">{book.bookName}</td>
                <td className="border border-gray-300 p-3">
                  {book.bookAuthor}
                </td>
                <td className="border border-gray-300 p-3">{book.publisher}</td>
                <td className="border border-gray-300 p-3">{book.edition}</td>
                <td className="border border-gray-300 p-3">
                  {book.numberOfPages}
                </td>
                <td className="border border-gray-300 p-3">{book.country}</td>
                <td className="border border-gray-300 p-3">{book.language}</td>
                <td className="border border-gray-300 p-3">{book.mrp}</td>
                <td className="border border-gray-300 p-3">{book.shelf}</td>
                <td className="border border-gray-300 p-3">
                  {book.department}
                </td>
                <td className="border border-gray-300 p-3">{book.quantity}</td>
                <td className="border border-gray-300 p-3">
                  {book.bookNumbers?.join(", ")}
                </td>
                <td className="border border-gray-300 p-3">
                  {book.description}
                </td>
                <td className="border border-gray-300 p-3">
                  <img
                    key={book?.images[0]?._id}
                    src={book?.images[0]?.url} // Change this if your image object has a different key
                    alt={book.bookName}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border border-gray-300 p-3">
                  {book.createDate?.date} {book.createDate?.formatedTime}
                </td>
                <td className="border border-gray-300 p-3">
                  {book.updateDate?.date} {book.updateDate?.formatedTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
