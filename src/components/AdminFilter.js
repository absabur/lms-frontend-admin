"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fixdeValues, getAdmins } from "@/store/Action"; // Your redux async thunk
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const AdminFilterForm = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);

  const admins = useSelector((state) => state.admins);

  const [filters, setFilters] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("adminFilters");
      return stored
        ? JSON.parse(stored)
        : {
            name: "",
            email: "",
            phone: "",
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
    sessionStorage.setItem("adminFilters", JSON.stringify(newFilters));
    dispatch(getAdmins(newFilters)); // Send filters to backend
  };

  const changePage = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    sessionStorage.setItem("adminFilters", JSON.stringify(newFilters));
    dispatch(getAdmins(newFilters));
  };

  useEffect(() => {
    dispatch(getAdmins(filters));
  }, []);

  return (
    <>
      <form
        className="relative bg-bgl1 dark:bg-bgd1 p-6 rounded-xl shadow-lg space-y-6 mb-3 overflow-hidden transition-all duration-300"
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
              <label className="block text-sm font-medium text-bgd1 dark:text-bgl1">
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

          {/* Boolean Filters */}
          {[
            ["isApproved", "Is Approved"],
            ["isBan", "Is Banned"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-bgd1 dark:text-bgl1">
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
            <label className="block text-sm font-medium text-bgd1 dark:text-bgl1">
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
              <label className="block text-sm font-medium text-bgd1 dark:text-bgl1">
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
                <option value="isApproved">Approved</option>
                <option value="isBan">Ban</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-bgd1 dark:text-bgl1">
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
          {admins?.total > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next →"
                onPageChange={({ selected }) => changePage(selected + 1)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(admins.total / filters.limit)}
                forcePage={filters.page - 1}
                previousLabel="← Previous"
            containerClassName="flex flex-wrap gap-2 items-center justify-center"
            pageClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            activeClassName="bg-buttonp text-textd dark:bg-buttonp dark:text-bgd1"
            previousClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            nextClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            breakClassName="px-3 py-1 rounded text-bgd2 dark:text-bgl2 bg-bgl1 dark:bg-bgd1"
            disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              type="button"
              className="bg-button2 dark:bg-button4 hover:bg-button2 dark:bg-button4 text-bgl2 dark:text-bgd2 px-5 py-2 rounded-md font-medium shadow-sm"
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
                sessionStorage.removeItem("adminFilters");
                dispatch(getAdmins(defaultFilters));
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </form>
      {collapsed && admins?.total > 0 && (
        <div className="pb-2">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            onPageChange={({ selected }) => changePage(selected + 1)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(admins.total / filters.limit)}
            forcePage={filters.page - 1}
            previousLabel="← Previous"
            containerClassName="flex flex-wrap gap-2 items-center justify-center"
            pageClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            activeClassName="bg-buttonp text-textd dark:bg-buttonp dark:text-bgd1"
            previousClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            nextClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            breakClassName="px-3 py-1 rounded text-bgd2 dark:text-bgl2 bg-bgl1 dark:bg-bgd1"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </>
  );
};

export default AdminFilterForm;
