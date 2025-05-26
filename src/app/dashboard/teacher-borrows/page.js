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
  const [filters, setFilters] = useState({
    takingApproveBy: true,
    returnApproveBy: false,
    page: 1,
    limit: 10,
  });
  const [activeFilter, setActiveFilter] = useState("inCollection");
  const [selectedBookNumbers, setSelectedBookNumbers] = useState({});
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleWithDelay = (callback) => {
    if (isDisabled) return;
    setIsDisabled(true);
    callback(); // call your logic immediately
    setTimeout(() => setIsDisabled(false), 5000); // re-enable after 5s
  };

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
    dispatch(requestApprove(id, selectedNumber, "teacher"));
    setActiveFilter("inCollection");
  };

  const teacherBorrow = useSelector((state) => state.teacherBorrow);

  useEffect(() => {
    dispatch(getBorrowBooks(filters, "teacher"));
  }, [filters]);

  const filterButtons = [
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
    {
      label: "Returned",
      value: "returned",
      filters: {
        takingApproveBy: true,
        returnApproveBy: true,
        page: 1,
        limit: 10,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
          href={`/dashboard/teacher-borrows/direct-assign`}
          className="px-4 py-2 rounded ml-auto bg-yellow-300 hover:bg-yellow-500 border text-sm font-medium transition-all duration-300"
        >
          Direct Assign A Book
        </Link>
      </div>

      {teacherBorrow?.bookTeachers?.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="min-w-[1000px] w-full border-separate">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-600">
                <th className="px-4 py-3 text-left rounded-l-lg">Book</th>
                <th className="px-4 py-3 text-left rounded-l-lg">Number</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Shelf</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Teacher</th>
                <th className="px-4 py-3 text-left">Id</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Post</th>
                <th className="px-4 py-3 text-left rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teacherBorrow.bookTeachers.map((item) => (
                <tr key={item._id} className="bg-white shadow-md rounded-lg">
                  {/* Book */}
                  <td className="px-4 py-3 flex items-center gap-4 rounded-l-lg">
                    <div className="w-14 h-14 flex items-center justify-center bg-gray-100 border rounded-md">
                      {item.book?.images?.[0]?.url ? (
                        <img
                          src={item.book.images[0].url}
                          alt={item.book.bookName}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                      )}
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/books/${item.book?.slug || "#"}`}
                        target="_blank"
                        className="font-medium text-gray-800 hover:underline"
                      >
                        {item.book?.bookName || "Unknown Book"}
                      </Link>
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item?.bookNumber || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.book?.bookAuthor || "N/A"}
                  </td>

                  {/* Department */}
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.book?.department?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.book?.shelf?.name || "N/A"}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 font-semibold text-green-600">
                    ৳{item.book?.mrp ?? "N/A"}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-700">
                    <Link
                      href={`/dashboard/teachers/${item.teacherId._id}`}
                      target="_blank"
                      className="font-medium text-gray-800 hover:underline"
                    >
                      {item.teacherId?.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.teacherId?.teacherId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.teacherId?.department?.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.teacherId?.post?.name}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 space-y-2 rounded-r-lg">
                    {!item.takingApproveBy && (
                      <>
                        <select
                          disabled={isDisabled}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={selectedBookNumbers[item._id] || ""}
                          onChange={(e) =>
                            handleSelectChange(item._id, e.target.value)
                          }
                        >
                          <option value="">Book Number</option>
                          {item.book.bookNumbers?.map((num, idx) => (
                            <option key={idx} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>

                        <div className="flex gap-2">
                          <button
                            disabled={isDisabled}
                            onClick={() =>
                              handleWithDelay(() => handleApprove(item._id))
                            }
                            className={`w-1/2 px-2 py-1 text-white text-xs rounded ${
                              isDisabled
                                ? "bg-gray-400"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            Approve
                          </button>
                          <button
                            disabled={isDisabled}
                            onClick={() =>
                              handleWithDelay(() => {
                                dispatch(
                                  gettingRequestCancel(item._id, "teacher")
                                );
                                setActiveFilter("inCollection");
                              })
                            }
                            className={`w-1/2 px-2 py-1 text-white text-xs rounded ${
                              isDisabled
                                ? "bg-gray-400"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                          >
                            Reject
                          </button>
                        </div>
                      </>
                    )}

                    {item.takingApproveBy &&
                      item.returnApproveBy == null &&
                      item.returnRequestDate == null && (
                        <button
                          disabled={isDisabled}
                          onClick={() =>
                            handleWithDelay(() => {
                              dispatch(directReturn(item._id, "teacher"));
                              setActiveFilter("inCollection");
                            })
                          }
                          className={`w-full px-2 py-1 text-xs text-white rounded ${
                            isDisabled
                              ? "bg-gray-400"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          Direct Return
                        </button>
                      )}

                    {item.takingApproveBy &&
                      item.returnApproveBy == null &&
                      item.returnRequestDate && (
                        <button
                          disabled={isDisabled}
                          onClick={() =>
                            handleWithDelay(() => {
                              dispatch(returnApprove(item._id, "teacher"));
                              setActiveFilter("inCollection");
                            })
                          }
                          className={`w-full px-2 py-1 text-xs text-white rounded ${
                            isDisabled
                              ? "bg-gray-400"
                              : "bg-indigo-600 hover:bg-indigo-700"
                          }`}
                        >
                          Return Approve
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-sm">
          No books found.
        </p>
      )}
      {teacherBorrow?.bookTeachers?.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            onPageChange={({ selected }) =>
              setFilters({ ...filters, page: selected + 1 })
            }
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(teacherBorrow.total / filters.limit)}
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
