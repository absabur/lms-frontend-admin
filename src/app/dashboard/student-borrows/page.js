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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [studentBorrow, setStudentborrow] = useState();

  const handleAction = (callback) => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 5000);
    callback();
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
      "student",
      filters,
      dispatch,
      setStudentborrow
    );
  };

  useEffect(() => {
    getBorrowBooks(filters, "student", dispatch, setStudentborrow);
  }, [filters]);

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
                ? "bg-buttonp dark:bg-buttonp text-bgl2 dark:text-bgl2 border-blue-600 shadow-sm"
                : "bg-bgl1 dark:bg-bgd1 text-bgd1 dark:text-bgl1 border-borl dark:border-bord hover:bg-buttons dark:hover:bg-buttons hover:text-textd"
            }`}
          >
            {btn.label}
          </button>
        ))}
        <Link
          href={`/dashboard/student-borrows/direct-assign`}
          className="px-4 py-2 rounded ml-auto border text-sm font-medium transition-all duration-300 bg-buttona text-textd hover:bg-buttonp"
        >
          Direct Assign A Book
        </Link>
      </div>

      {studentBorrow?.bookStudents?.length > 0 ? (
        <div className="overflow-x-auto w-full rounded-lg shadow-sm border border-borl dark:border-bord">
          <table className="min-w-full text-sm text-left text-bgd1 dark:text-bgl1 bg-bgl1 dark:bg-bgd1">
            <thead className="bg-buttonp dark:bg-buttonp text-bgl1 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Book</th>
                <th className="px-4 py-3">Number</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Dept</th>
                <th className="px-4 py-3">Shelf</th>
                <th className="px-4 py-3">MRP</th>
                <th className="px-4 py-3 ">Student</th>
                <th className="px-4 py-3 ">Department</th>
                <th className="px-4 py-3 ">Session</th>
                <th className="px-4 py-3 ">Shift</th>
                <th className="px-4 py-3 ">Roll</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentBorrow.bookStudents.map((item) => (
                <tr
                  key={item._id}
                  className="odd:bg-bgl2 even:bg-bgl1 dark:odd:bg-bgd1 dark:even:bg-bgd2 hover:bg-buttons dark:hover:bg-buttons hover:text-textd"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/books/${item.book?.slug || "#"}`}
                      target="_blank"
                      className="hover:underline"
                    >
                      {item.book?.bookName || "N/A"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item?.bookNumber || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {item.book?.bookAuthor || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {item.book?.department?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {item.book?.shelf?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    ৳{item.book?.mrp ?? "N/A"}
                  </td>
                  <td className="px-4 py-3 ">
                    <Link
                      href={`/dashboard/teachers/${item.studentId._id}`}
                      target="_blank"
                      className="hover:underline"
                    >
                      {item.studentId?.name || "N/A"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 ">
                    {item.studentId?.department?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 ">
                    {item.studentId?.session?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 ">
                    {item.studentId?.shift?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center ">
                    {item.studentId?.boardRoll || "N/A"}
                  </td>
                  <td className="px-4 py-3 space-y-1">
                    {item.takingApproveBy == null ? (
                      <>
                        <select
                          value={selectedBookNumbers[item._id] || ""}
                          onChange={(e) =>
                            handleSelectChange(item._id, e.target.value)
                          }
                          className="border px-2 py-1 rounded w-full text-sm"
                          disabled={isButtonDisabled}
                        >
                          <option value="">Book Number</option>
                          {item.book.bookNumbers?.map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() =>
                            handleAction(() => handleApprove(item._id))
                          }
                          className="w-full bg-green-500 hover:bg-green-600 text-bgl2 dark:text-bgd2 py-1 px-2 rounded text-xs"
                          disabled={isButtonDisabled}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleAction(() => {
                              gettingRequestCancel(
                                item._id,
                                "student",
                                filters,
                                dispatch,
                                setStudentborrow
                              );
                            })
                          }
                          className="w-full bg-button2 dark:bg-button4 hover:bg-button2 dark:bg-button4 text-bgl2 dark:text-bgd2 py-1 px-2 rounded text-xs"
                          disabled={isButtonDisabled}
                        >
                          Reject
                        </button>
                      </>
                    ) : item.returnApproveBy == null &&
                      item.returnRequestDate == null ? (
                      <button
                        onClick={() =>
                          handleAction(() => {
                            directReturn(
                              item._id,
                              "student",
                              filters,
                              dispatch,
                              setStudentborrow
                            );
                          })
                        }
                        className="w-full bg-button1 dark:bg-button3 hover:bg-button1 dark:bg-button3 text-bgl2 dark:text-bgd2 py-1 px-2 rounded text-xs"
                        disabled={isButtonDisabled}
                      >
                        Direct Return
                      </button>
                    ) : item.returnApproveBy == null &&
                      item.returnRequestDate ? (
                      <button
                        onClick={() =>
                          handleAction(() => {
                            returnApprove(
                              item._id,
                              "student",
                              filters,
                              dispatch,
                              setStudentborrow
                            );
                          })
                        }
                        className="w-full bg-purple-500 hover:bg-purple-600 text-bgl2 dark:text-bgd2 py-1 px-2 rounded text-xs"
                        disabled={isButtonDisabled}
                      >
                        Approve Return
                      </button>
                    ) : (
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
        <p className="text-center text-bgd1 dark:text-bgl1 mt-10 text-sm">
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
            pageClassName="px-3 py-1 rounded bg-bgl1 dark:bg-bgd1 text-sm cursor-pointer"
            activeClassName=" text-bgd2 dark:text-bgl2"
            previousClassName="px-3 py-1 rounded bg-bgl1 dark:bg-bgd1 text-sm cursor-pointer"
            nextClassName="px-3 py-1 rounded bg-bgl1 dark:bg-bgd1 text-sm cursor-pointer"
            breakClassName="px-3 py-1 rounded bg-bgl1 dark:bg-bgd1"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default Page;

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
