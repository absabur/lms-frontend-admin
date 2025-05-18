"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "@/store/Action.js";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, []);
  const router = useRouter();

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          All Books
        </h1>
        <Link
          href="/dashboard/add-book"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
        >
          + Add Book
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-[1000px] w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-600 text-white sticky top-0 z-10">
            <tr>
              {[
                "#",
                "Book Name",
                "Author",
                "Publisher",
                "Edition",
                "Pages",
                "Country",
                "Language",
                "MRP",
                "Shelf",
                "Department",
                "Quantity",
                "Book Numbers",
                "Description",
                "Image",
                "Created At",
                "Updated At",
                "Actions",
              ].map((head, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2 border border-blue-600 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {books?.books?.map((book, index) => (
              <tr
                key={index}
                onClick={() => router.push(`/dashboard/books/${book.slug}`)}
                className="odd:bg-gray-100 even:bg-white hover:bg-blue-100 border-t border-black-200 cursor-pointer"
              >
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{book.bookName}</td>
                <td className="px-3 py-2">{book.bookAuthor}</td>
                <td className="px-3 py-2">{book.publisher}</td>
                <td className="px-3 py-2">{book.edition}</td>
                <td className="px-3 py-2">{book.numberOfPages}</td>
                <td className="px-3 py-2">{book.country}</td>
                <td className="px-3 py-2">{book.language}</td>
                <td className="px-3 py-2">{book.mrp}</td>
                <td className="px-3 py-2">{book.shelf}</td>
                <td className="px-3 py-2">{book.department}</td>
                <td className="px-3 py-2">{book.quantity}</td>
                <td className="px-3 py-2">
                  {book.bookNumbers?.join(", ") || "-"}
                </td>
                <td className="px-3 py-2 truncate max-w-[200px]">
                  {book.description || "-"}
                </td>
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
                <td className="px-3 py-2">
                  {book.createDate?.date} {book.createDate?.formatedTime}
                </td>
                <td className="px-3 py-2">
                  {book.updateDate?.date} {book.updateDate?.formatedTime}
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/books/edit-book/${book.slug}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                      onClick={(e) => e.stopPropagation()} // <-- add this
                    >
                      Edit
                    </Link>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // <-- add this
                        handleDelete(book._id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleDelete(id) {
    if (confirm("Are you sure you want to delete this book?")) {
      // Dispatch your delete action here
      console.log("Delete book ID:", id);
    }
  }
};

export default Page;
