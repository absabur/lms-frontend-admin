"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fixdeValues, getStudents } from "@/store/Action"; // Your redux async thunk
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const StudentFilterForm = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);

  const fixedValues = useSelector((state) => state.fixedValues);

  const students = useSelector((state) => state.students);

  const [filters, setFilters] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("studentFilters");
      return stored
        ? JSON.parse(stored)
        : {
            name: "",
            email: "",
            phone: "",
            session: "",
            shift: "",
            department: "",
            isApproved: "",
            isBan: "",
            search: "",
            sortBy: "",
            sortOrder: "",
            page: 1,
            limit: 10,
          };
    }
    return {
      name: "",
      email: "",
      phone: "",
      session: "",
      shift: "",
      department: "",
      isApproved: "",
      isBan: "",
      search: "",
      sortBy: "",
      sortOrder: "",
      page: 1,
      limit: 10,
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    localStorage.setItem("studentFilters", JSON.stringify(newFilters));
    dispatch(getStudents(newFilters)); // Send filters to backend
  };

  const changePage = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    localStorage.setItem("studentFilters", JSON.stringify(newFilters));
    dispatch(getStudents(newFilters));
  };

  useEffect(() => {
    dispatch(getStudents(filters)); // Initial load
    dispatch(fixdeValues());
  }, []);

  return (
    <>
      <form
        className="relative bg-white p-6 rounded-xl shadow-lg space-y-6 mb-3 overflow-hidden transition-all duration-300"
        style={{ maxHeight: collapsed ? "90px" : "1200px" }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Filters</h2>
          <p
            className="rounded-full border-none shadow-xl text-4xl cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FaChevronCircleDown /> : <FaChevronCircleUp />}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["name", "Name"],
            ["email", "Email"],
            ["phone", "Phone"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={filters[name]}
                onChange={handleInputChange}
                placeholder={`Enter ${label}`}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}

          {[
            ["department", "Department", fixedValues?.departments],
            ["session", "Session", fixedValues?.sessions],
            ["shift", "Shift", fixedValues?.shifts],
          ].map(([name, label, options]) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
              >
                {label}
              </label>
              <select
                id={name}
                name={name}
                value={filters[name]}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select {label} --</option>
                {options?.map((option) => (
                  <option key={option._id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Boolean Filters */}
          {[
            ["isApproved", "Is Approved"],
            ["isBan", "Is Banned"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <select
                name={name}
                value={filters[name]}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          ))}

          {/* Global Search */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              Search (name, email, etc.)
            </label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="Search by name, email, etc."
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center">
          {/* Sort Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">--</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="department">Department</option>
                <option value="session">Session</option>
                <option value="shift">shift</option>
                <option value="isApproved">Approved</option>
                <option value="isBan">Ban</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sort Order
              </label>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">--</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Pagination */}
          {students?.total > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next →"
                onPageChange={({ selected }) => changePage(selected + 1)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(students.total / filters.limit)}
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

          {/* Reset Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-medium shadow-sm"
              onClick={() => {
                const defaultFilters = {
                  name: "",
                  email: "",
                  phone: "",
                  post: "",
                  department: "",
                  isApproved: "",
                  isBan: "",
                  search: "",
                  sortBy: "",
                  sortOrder: "",
                  page: 1,
                  limit: 10,
                };
                setFilters(defaultFilters);
                localStorage.removeItem("studentFilters");
                dispatch(getStudents(defaultFilters));
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </form>
      {collapsed && students?.total > 0 && (
        <div className="pb-2">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            onPageChange={({ selected }) => changePage(selected + 1)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(students.total / filters.limit)}
            forcePage={filters.page - 1}
            previousLabel="← Previous"
            containerClassName="flex flex-wrap gap-2 items-center justify-center"
            pageClassName="px-3 py-1 rounded bg-gray-200 text-sm"
            activeClassName="bg-green-100 text-black"
            previousClassName="px-3 py-1 rounded bg-gray-300 text-sm"
            nextClassName="px-3 py-1 rounded bg-gray-300 text-sm"
            breakClassName="px-3 py-1 rounded bg-gray-100"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </>
  );
};

export default StudentFilterForm;
