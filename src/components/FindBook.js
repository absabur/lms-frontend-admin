"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "@/store/Action.js";

const FindBook = ({ closeModal, setBookId }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks({ search: searchValue }));
  }, [searchValue]);

  const handleAddBook = (values) => {
    setBookId(values);
    closeModal();
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {books?.books?.length > 0 ? (
          books.books.map((book, index) => (
            <div
              key={index}
              onClick={() =>
                handleAddBook({
                  id: book._id,
                  name: book.bookName,
                  image: book.images[0].url,
                  author: book.bookAuthor,
                  bookNumbers: book.bookNumbers,
                  slug: book.slug
                })
              }
              className="bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className={`aspect-[3/2] bg-gray-100`}>
                {book?.images?.[0]?.url ? (
                  <img
                    src={book.images[0].url}
                    alt={book.bookName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                    No Image
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {book.bookName}
                </h3>
                <p className="text-sm text-gray-400">
                  {book.bookAuthor || "Unknown Department"}
                </p>
                <p className="text-sm text-gray-600">
                  {book.department || "Unknown Department"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic col-span-full">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default FindBook;
