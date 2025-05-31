"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import BooksFilterFrom from "@/components/BooksFilterFrom";
import BookPaginate from "@/components/BookPaginate";
import TableHead from "@/components/BookSort";
import { getBooks } from "@/store/Action";

const Page = () => {
  const [filters, setFilters] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("bookFilters");
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
  const [books, setBooks] = useState({});

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("bookFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      getBooks(parsedFilters, dispatch, setBooks); // Re-fetch with saved filters
    } else {
      getBooks(filters, dispatch, setBooks); // Fetch default if no filters
    }
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-bgd1 dark:text-bgl1 text-center md:text-left">
          All Books
        </h1>
        <Link
          href="/dashboard/books/add-book"
          className="bg-buttona hover:bg-buttonp text-bgl2 font-medium px-5 py-2 rounded shadow"
        >
          + Add Book
        </Link>
      </div>

      <div className="overflow-x-auto bg-bgl1 dark:bg-bgd1 rounded-lg shadow-lg">
        <table className="min-w-full table-auto w-full text-sm text-left text-bgd1 dark:text-bgl1 border border-borl dark:border-bord">
          <thead className="bg-buttonp text-bgl2 sticky top-0 z-10">
            <TableHead
              filters={filters}
              setFilters={setFilters}
              setBooks={setBooks}
            />
          </thead>
          <tbody>
            <BooksFilterFrom
              filters={filters}
              setFilters={setFilters}
              setBooks={setBooks}
            />
            {books?.books?.map((book, index) => (
              <tr
                key={index}
                onClick={() => router.push(`/dashboard/books/${book.slug}`)}
                className="odd:bg-bgl2 even:bg-bgl1 dark:odd:bg-bgd1 dark:even:bg-bgd2 hover:bg-buttons dark:hover:bg-buttons hover:text-textd cursor-pointer"
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
                    <span className="text-bgl1 dark:text-bgd1 italic">No image</span>
                  )}
                </td>
                <td className="px-3 py-2"><span className="line-clamp-1">{book.bookName}</span></td>
                <td className="px-3 py-2"><span className="line-clamp-1">{book.bookAuthor}</span></td>
                <td className="px-3 py-2"><span className="line-clamp-1">{book.publisher}</span></td>
                <td className="px-3 py-2 text-center"><span className="line-clamp-1">{book.edition}</span></td>
                <td className="px-3 py-2 text-center"><span className="line-clamp-1">{book.numberOfPages}</span></td>
                <td className="px-3 py-2 text-center"><span className="line-clamp-1">{book?.country?.name}</span></td>
                <td className="px-3 py-2 text-center"><span className="line-clamp-1">{book.language?.name}</span></td>
                <td className="px-3 py-2 text-center"><span className="line-clamp-1">{book.mrp}</span></td>
                <td className="px-3 py-2"><span className="line-clamp-1">{book.shelf?.name}</span></td>
                <td className="px-3 py-2"><span className="line-clamp-1">{book.department?.name}</span></td>
                <td className="px-3 py-2 text-center"><span className="line-clamp-1">{book.quantity}</span></td>
                <td className="px-3 py-2">
                  <span className="line-clamp-1">{book.bookNumbers?.join(", ") || "-"}</span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/books/edit-book/${book.slug}`}
                      className="bg-buttonp text-textd hover:bg-buttona px-3 py-1 rounded text-xs"
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
      <BookPaginate
        books={books}
        filters={filters}
        setFilters={setFilters}
        setBooks={setBooks}
      />
    </div>
  );
};

export default Page;
