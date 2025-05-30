"use client";
import { getBooks } from "@/store/Action";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FindBook = ({ closeModal, setBookId }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState({});

  useEffect(() => {
    getBooks({ search: searchValue }, dispatch, setBooks);
  }, [searchValue]);

  const handleAddBook = (values) => {
    setBookId(values);
    closeModal();
  };

  return (
    <div className="p-4 md:p-6">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:w-96 border border-borl dark:border-bord rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
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
                  slug: book.slug,
                })
              }
              className="bg-bgl1 dark:bg-bgd1 rounded-xl border dark:border-bord shadow hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className={`aspect-[3/2] bg-bgl1 dark:bg-bgd1`}>
                {book?.images?.[0]?.url ? (
                  <img
                    src={book.images[0].url}
                    alt={book.bookName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-bgl1 dark:text-bgd1 italic">
                    No Image
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-bgd1 dark:text-bgl1 truncate">
                  {book.bookName}
                </h3>
                <p className="text-sm text-bgl1 dark:text-bgd1">
                  {book.bookAuthor || "Unknown Department"}
                </p>
                <p className="text-sm text-bgd1 dark:text-bgl1">
                  {book.department?.name || "Unknown Department"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-bgd1 dark:text-bgl1 italic col-span-full">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default FindBook;
