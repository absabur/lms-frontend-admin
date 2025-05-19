"use client";
import { fixdeValues, getBooks } from "@/store/Action";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const BooksFilterFrom = () => {
  const fixedValues = useSelector((state) => state.fixedValues);
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [collaps, setCollaps] = useState(true);

  useEffect(() => {
    dispatch(fixdeValues());
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    localStorage.setItem("bookFilters", JSON.stringify(newFilters));
    dispatch(getBooks(newFilters));
  };

  const changePage = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    localStorage.setItem("bookFilters", JSON.stringify(newFilters));
    dispatch(getBooks(newFilters));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleFilterSubmit}
      className="bg-white p-6 rounded-xl shadow-lg space-y-6 mb-3 overflow-hidden transition-all duration-300"
      style={{
        maxHeight: collaps ? "90px" : "2200px", // Set 1000px or a large enough value to cover content
      }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Filters</h2>
        <button
          className="rounded-full border-none shadow-xl text-4xl"
          onClick={() => setCollaps(!collaps)}
        >
          {collaps ? <FaChevronCircleDown /> : <FaChevronCircleUp />}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          ["bookName", "Book Name"],
          ["bookAuthor", "Author"],
          ["publisher", "Publisher"],
          //   ["edition", "Edition"],
        ].map(([name, label]) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
            >
              {label}
            </label>
            <input
              type="text"
              id={name}
              name={name}
              value={filters[name]}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${label}`}
            />
          </div>
        ))}

        {/* Select Dropdowns */}
        {[
          ["country", "Country", fixedValues?.countries],
          ["language", "Language", fixedValues?.languages],
          ["shelf", "Shelf", fixedValues?.shelves],
          ["department", "Department", fixedValues?.departments],
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

        {/* Min/Max Inputs */}
        {[
          ["mrpMin", "Min MRP"],
          ["mrpMax", "Max MRP"],
          //   ["quantityMin", "Min Qty"],
          //   ["quantityMax", "Max Qty"],
        ].map(([name, label]) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
            >
              {label}
            </label>
            <input
              type="number"
              id={name}
              name={name}
              value={filters[name]}
              onChange={handleInputChange}
              placeholder={label}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Global Search Field */}
        <div className="flex flex-col sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <label
            htmlFor="search"
            className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
          >
            Search Anything
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search by any field"
            value={filters.search}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-1">
        {/* Sort Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="sortBy"
              className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Field</option>
              <option value="bookName">Book Name</option>
              <option value="bookAuthor">Author</option>
              <option value="publisher">Publisher</option>
              <option value="mrp">MRP</option>
              <option value="quantity">Quantity</option>
              <option value="edition">Edition</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="sortOrder"
              className="text-sm font-medium text-gray-700 mb-1 relative top-[15px] left-[5px] bg-white z-10 w-fit px-2"
            >
              Sort Order
            </label>
            <select
              id="sortOrder"
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Order</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Pagination & Limit Selector */}
        {books?.total > 0 && (
          <div className="flex m-auto flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next →"
              onPageChange={({ selected }) => changePage(selected + 1)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={Math.ceil(books.total / filters.limit)}
              forcePage={filters.page - 1}
              previousLabel="← Previous"
              containerClassName="flex flex-wrap gap-2 items-center justify-center sm:justify-start"
              pageClassName="px-3 py-1 rounded bg-gray-200 text-sm"
              activeClassName="bg-blue-500 text-white"
              previousClassName="px-3 py-1 rounded bg-gray-300 text-sm"
              nextClassName="px-3 py-1 rounded bg-gray-300 text-sm"
              breakClassName="px-3 py-1 rounded bg-gray-100"
              disabledClassName="opacity-50 cursor-not-allowed"
            />

            {/* <div className="flex gap-2 items-center text-sm">
              <span>Rows per page:</span>
              <select
                value={filters.limit}
                onChange={(e) => {
                  const newLimit = parseInt(e.target.value);
                  const newFilters = { ...filters, limit: newLimit, page: 1 };
                  setFilters(newFilters);
                  localStorage.setItem(
                    "bookFilters",
                    JSON.stringify(newFilters)
                  );
                  dispatch(getBooks(newFilters));
                }}
                className="border border-gray-300 px-2 py-1 rounded focus:outline-none"
              >
                {[10, 1, 5, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        )}

        {/* Reset Button */}
        <div className="flex justify-center pt-3">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-medium shadow border-none"
            onClick={() => {
              const defaultFilters = {
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
                limit: 10, // make sure you include `limit` and `page`
              };
              setFilters(defaultFilters);
              localStorage.removeItem("bookFilters");
              dispatch(getBooks(defaultFilters)); // <-- fix here
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default BooksFilterFrom;
