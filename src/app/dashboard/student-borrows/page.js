"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  directReturn,
  getBorrowBooks,
  gettingRequestCancel,
  requestApprove,
  returnApprove,
} from "@/store/Action.js";
import { MESSAGE } from "@/store/Constant";
import ReactPaginate from "react-paginate";

const Page = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedBookNumbers, setSelectedBookNumbers] = useState({});
  const dispatch = useDispatch();

  const handleSelectChange = (id, value) => {
    setSelectedBookNumbers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleApprove = (id) => {
    const selectedNumber = selectedBookNumbers[id];
    if (!selectedNumber)
      return dispatch({
        type: MESSAGE,
        payload: { message: "Select book number", status: "warn", path: "" },
      });
    dispatch(requestApprove(id, selectedNumber, "student"));
    setActiveFilter("all");
  };

  const studentBorrow = useSelector((state) => state.studentBorrow);

  useEffect(() => {
    dispatch(getBorrowBooks(filters, "student"));
  }, [filters]);

  const filterButtons = [
    { label: "All", value: "all", filters: { page: 1, limit: 10 } },
    {
      label: "Get Requests",
      value: "gettingRequested",
      filters: { takingApproveBy: false, page: 1, limit: 10 },
    },
    {
      label: "Borrowed",
      value: "inCollection",
      filters: {
        takingApproveBy: true,
        returnApproveBy: false,
        page: 1,
        limit: 10,
      },
    },
    {
      label: "Return Requests",
      value: "returnRequested",
      filters: {
        takingApproveBy: true,
        returnRequestDate: true,
        returnApproveBy: false,
        page: 1,
        limit: 10,
      },
    },
  ];

  return (
    <div className="min-h-screen px-4 py-6 md:px-12 bg-gray-50">
      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => {
              setFilters(btn.filters);
              setActiveFilter(btn.value);
            }}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
              activeFilter === btn.value
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
        <Link
          href={`/dashboard/student-borrows/direct-assign`}
          className="px-4 py-2 rounded ml-auto bg-yellow-300 hover:bg-yellow-500 border text-sm font-medium transition-all duration-300"
        >
          Direct Assign A Book
        </Link>
      </div>

      {studentBorrow?.bookStudents?.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {studentBorrow.bookStudents.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-4">
                {/* Top: Book Image */}
                <div className="flex flex-row gap-4 p-4 border rounded-lg shadow-sm bg-white">
                  {/* Book Image */}
                  <div className="w-40 aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden">
                    {item.book?.images?.[0]?.url ? (
                      <img
                        src={item.book.images[0].url}
                        alt={item.book.bookName || "Book Image"}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 italic text-sm">
                        No Book Image
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        <Link
                          target="_blank"
                          href={`/dashboard/books/${item.book?.slug || "#"}`}
                        >
                          {item.book?.bookName || "Unknown Book"}
                        </Link>
                      </h2>
                      <p className="text-sm text-gray-600">
                        Author: {item.book?.bookAuthor || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Department: {item.book?.department || "N/A"}
                      </p>
                    </div>

                    <p className="text-green-600 font-bold text-right mt-2">
                      ৳{item.book?.mrp ?? "N/A"}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <hr className="my-2 border-gray-200" />

                {/* Teacher Info */}
                <div className="flex items-center gap-4">
                  {item.studentId?.avatar?.url ? (
                    <img
                      src={item.studentId.avatar.url}
                      alt={item.studentId.name}
                      className="w-14 h-14 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}

                  <div>
                    <Link
                      href={`/dashboard/teachers/${item.studentId._id}`}
                      target="_blank"
                      className="font-medium text-gray-800"
                    >
                      {item.studentId?.name}
                    </Link>
                    <p className="text-xs text-gray-500">
                      {item.studentId?.department} | {item.studentId?.session}
                    </p>
                    <p className="text-xs text-gray-400">
                      Shift: {item.studentId?.shift}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.studentId?.boardRoll ? (
                        <span>Board Roll: {item.studentId?.boardRoll}</span>
                      ) : (
                        <span>Board Roll: {item.studentId?.boardRoll}</span>
                      )}
                    </p>
                  </div>
                </div>

                {item.takingApproveBy == null && (
                  <div className="flex gap-3 mt-4">
                    <select
                      className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedBookNumbers[item._id] || ""}
                      onChange={(e) =>
                        handleSelectChange(item._id, e.target.value)
                      }
                    >
                      <option value="">Book Number</option>
                      {item.book.bookNumbers?.map((num, index) => (
                        <option key={index} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleApprove(item._id)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all duration-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        dispatch(gettingRequestCancel(item._id, "student"));
                        setActiveFilter("all");
                      }}
                      className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-all duration-300"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {item.takingApproveBy &&
                  item.returnApproveBy == null &&
                  item.returnRequestDate == null && (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => {
                          dispatch(directReturn(item._id, "student"));
                          setActiveFilter("all");
                        }}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all duration-300"
                      >
                        Direct Return
                      </button>
                    </div>
                  )}

                {item.takingApproveBy &&
                  item.returnApproveBy == null &&
                  item.returnRequestDate && (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => {
                          dispatch(returnApprove(item._id, "student"));
                          setActiveFilter("all");
                        }}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all duration-300"
                      >
                        Retrun Approve
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-sm">
          No books found.
        </p>
      )}
      {studentBorrow?.bookStudents?.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            onPageChange={({ selected }) =>
              setFilters({ ...filters, page: selected + 1 })
            }
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(studentBorrow.total / filters.limit)}
            forcePage={filters.page - 1}
            previousLabel="← Previous"
            containerClassName="flex flex-wrap gap-2 items-center justify-center sm:justify-start"
            pageClassName="px-3 py-1 rounded bg-gray-200 text-sm cursor-pointer"
            activeClassName="bg-green-100 text-black"
            previousClassName="px-3 py-1 rounded bg-gray-300 text-sm cursor-pointer"
            nextClassName="px-3 py-1 rounded bg-gray-300 text-sm cursor-pointer"
            breakClassName="px-3 py-1 rounded bg-gray-100"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default Page;
