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
  const [teacherBorrow, setTeacherborrow] = useState({});

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
    requestApprove(
      id,
      selectedNumber,
      "teacher",
      filters,
      dispatch,
      setTeacherborrow
    );
  };

  useEffect(() => {
    getBorrowBooks(filters, "teacher", dispatch, setTeacherborrow);
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
    <div className="min-h-screen">
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
                ? "bg-button1 dark:bg-button3 text-light2 dark:text-dark2 border-blue-600 shadow-sm"
                : "bg-light1 dark:bg-dark1 text-dark1 dark:text-light1 border-lborder dark:border-dborder hover:bg-light1 dark:bg-dark1"
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
          <table className="min-w-full text-sm text-left text-dark1 dark:text-light1 bg-light1 dark:bg-dark1">
            <thead className="bg-light1 dark:bg-dark1 text-xs uppercase text-dark1 dark:text-light1">
              <tr className="">
                <th className="px-4 py-3 border">Book</th>
                <th className="px-4 py-3 border">Number</th>
                <th className="px-4 py-3 border">Author</th>
                <th className="px-4 py-3 border">Department</th>
                <th className="px-4 py-3 border">Shelf</th>
                <th className="px-4 py-3 border">Price</th>
                <th className="px-4 py-3 border">Teacher</th>
                <th className="px-4 py-3 border">Id</th>
                <th className="px-4 py-3 border">Department</th>
                <th className="px-4 py-3 border">Post</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teacherBorrow.bookTeachers.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  {/* Book */}
                  <td className="px-4 py-3 border flex items-center gap-2">
                    <div className="w-14 h-14 flex items-center justify-center bg-light1 dark:bg-dark1 border rounded-md">
                      {item.book?.images?.[0]?.url ? (
                        <img
                          src={item.book.images[0].url}
                          alt={item.book.bookName}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <span className="text-xs text-light1 dark:text-dark1">No Image</span>
                      )}
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/books/${item.book?.slug || "#"}`}
                        target="_blank"
                        className="font-medium text-dark1 dark:text-light1 hover:underline"
                      >
                        {item.book?.bookName || "Unknown Book"}
                      </Link>
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-4 py-3 border">
                    {item?.bookNumber || "N/A"}
                  </td>

                  <td className="px-4 py-3 border">
                    {item.book?.bookAuthor || "N/A"}
                  </td>

                  {/* Department */}
                  <td className="px-4 py-3 border">
                    {item.book?.department?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 border">
                    {item.book?.shelf?.name || "N/A"}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 border font-semibold text-green-600">
                    ৳{item.book?.mrp ?? "N/A"}
                  </td>

                  <td className="px-4 py-3 border">
                    <Link
                      href={`/dashboard/teachers/${item.teacherId._id}`}
                      target="_blank"
                      className="font-medium text-dark1 dark:text-light1 hover:underline"
                    >
                      {item.teacherId?.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 border">
                    {item.teacherId?.teacherId}
                  </td>
                  <td className="px-4 py-3 border">
                    {item.teacherId?.department?.name}
                  </td>
                  <td className="px-4 py-3 border">
                    {item.teacherId?.post?.name}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 border space-y-2 rounded-r-lg">
                    {!item.takingApproveBy && (
                      <>
                        <select
                          disabled={isDisabled}
                          className="w-full border border-lborder dark:border-dborder rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            className={`w-1/2 px-2 py-1 text-light2 dark:text-dark2 text-xs rounded ${
                              isDisabled
                                ? "bg-light1 dark:bg-dark1"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            Approve
                          </button>
                          <button
                            disabled={isDisabled}
                            onClick={() =>
                              handleWithDelay(() => {
                                gettingRequestCancel(
                                  item._id,
                                  "teacher",
                                  filters,
                                  dispatch,
                                  setTeacherborrow
                                );
                              })
                            }
                            className={`w-1/2 px-2 py-1 text-light2 dark:text-dark2 text-xs rounded ${
                              isDisabled
                                ? "bg-light1 dark:bg-dark1"
                                : "bg-button2 dark:bg-button4 hover:bg-button2 dark:bg-button4"
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
                              directReturn(
                                item._id,
                                "teacher",
                                filters,
                                dispatch,
                                setTeacherborrow
                              );
                            })
                          }
                          className={`w-full px-2 py-1 text-xs text-light2 dark:text-dark2 rounded ${
                            isDisabled
                              ? "bg-light1 dark:bg-dark1"
                              : "bg-button1 dark:bg-button3 hover:bg-button1 dark:bg-button3"
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
                              returnApprove(
                                item._id,
                                "teacher",
                                filters,
                                dispatch,
                                setTeacherborrow
                              );
                            })
                          }
                          className={`w-full px-2 py-1 text-xs text-light2 dark:text-dark2 rounded ${
                            isDisabled
                              ? "bg-light1 dark:bg-dark1"
                              : "bg-indigo-600 hover:bg-indigo-700"
                          }`}
                        >
                          Return Approve
                        </button>
                      )}
                    {item.takingApproveBy && item.returnApproveBy && (
                      <span className="text-green-600 font-semibold text-sm">
                        Returned
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-dark1 dark:text-light1 mt-10 text-sm">
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
            pageClassName="px-3 py-1 rounded bg-light1 dark:bg-dark1 text-sm cursor-pointer"
            activeClassName="bg-green-100 text-dark2 dark:text-light2"
            previousClassName="px-3 py-1 rounded bg-light1 dark:bg-dark1 text-sm cursor-pointer"
            nextClassName="px-3 py-1 rounded bg-light1 dark:bg-dark1 text-sm cursor-pointer"
            breakClassName="px-3 py-1 rounded bg-light1 dark:bg-dark1"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default Page;
