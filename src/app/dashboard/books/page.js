"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "@/store/Action.js";
import { useRouter } from "next/navigation";
import BooksFilterFrom from "@/components/BooksFilterFrom";
import BookPaginate from "@/components/BookPaginate";
import TableHead from "@/components/BookSort";

const Page = () => {
  const [filters, setFilters] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bookFilters");
      return stored
        ? JSON.parse(stored)
        : {
            bookName: "",
            bookAuthor: "",
            publisher: "",
            language: "",
            department: "",
            country: "",
            shelf: "",
            edition: "",
            mrpMin: "",
            mrpMax: "",
            quantityMin: "",
            quantityMax: "",
            search: "",
            sortBy: "",
            sortOrder: "",
            page: 1,
            limit: 10,
          };
    }
    return {
      bookName: "",
      bookAuthor: "",
      publisher: "",
      language: "",
      department: "",
      country: "",
      shelf: "",
      edition: "",
      mrpMin: "",
      mrpMax: "",
      quantityMin: "",
      quantityMax: "",
      search: "",
      sortBy: "",
      sortOrder: "",
      page: 1,
      limit: 10,
    };
  });
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    const savedFilters = localStorage.getItem("bookFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      dispatch(getBooks(parsedFilters)); // Re-fetch with saved filters
    } else {
      dispatch(getBooks()); // Fetch default if no filters
    }
  }, []);

  const router = useRouter();
  
  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          All Books
        </h1>
        <Link
          href="/dashboard/books/add-book"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
        >
          + Add Book
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-600 text-white sticky top-0 z-10">
            <TableHead
              filters={filters}
              setFilters={setFilters}
            />
          </thead>
          <tbody>
            <BooksFilterFrom filters={filters} setFilters={setFilters} />
            {books?.books?.map((book, index) => (
              <tr
                key={index}
                onClick={() => router.push(`/dashboard/books/${book.slug}`)}
                className="odd:bg-gray-100 even:bg-white hover:bg-blue-100 border-t border-black-200 cursor-pointer"
              >
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">
                  {book?.images?.[0]?.url ? (
                    <img
                      src={book.images[0].url}
                      alt={book.bookName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="px-3 py-2">{book.bookName}</td>
                <td className="px-3 py-2">{book.bookAuthor}</td>
                <td className="px-3 py-2">{book.publisher}</td>
                <td className="px-3 py-2">{book.edition}</td>
                <td className="px-3 py-2">{book.numberOfPages}</td>
                <td className="px-3 py-2">{book?.country?.name}</td>
                <td className="px-3 py-2">{book.language?.name}</td>
                <td className="px-3 py-2">{book.mrp}</td>
                <td className="px-3 py-2">{book.shelf?.name}</td>
                <td className="px-3 py-2">{book.department?.name}</td>
                <td className="px-3 py-2">{book.quantity}</td>
                <td className="px-3 py-2">
                  {book.bookNumbers?.join(", ") || "-"}
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/books/edit-book/${book.slug}`}
                      className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl text-black px-3 py-1 rounded text-xs"
                      onClick={(e) => e.stopPropagation()} // <-- add this
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BookPaginate books={books} filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default Page;
