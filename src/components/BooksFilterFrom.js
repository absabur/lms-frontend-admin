"use client";
import { fixdeValues, getBooks } from "@/store/Action";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const BooksFilterFrom = ({ filters, setFilters, setBooks }) => {
  const fixedValues = useSelector((state) => state.fixedValues);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fixdeValues({
        countries: true,
        languages: true,
        shelves: true,
        departments: true,
      })
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    sessionStorage.setItem("bookFilters", JSON.stringify(newFilters));
    getBooks(newFilters, dispatch, setBooks);
  };

  return (
    <>
      <tr>
        <td colSpan={2} className="px-2 py-1 font-semibold">
          <div className="flex items-center gap-2">
            Filters <FaLongArrowAltRight />
          </div>
        </td>
        {/* Book Name */}
        <td className="px-2 py-1">
          <input
            type="text"
            name="bookName"
            value={filters.bookName}
            onChange={handleInputChange}
            placeholder="Book Name"
            className="w-full border border-borl dark:border-bord rounded px-2 py-1"
          />
        </td>
        {/* Author */}
        <td className="px-2 py-1">
          <input
            type="text"
            name="bookAuthor"
            value={filters.bookAuthor}
            onChange={handleInputChange}
            placeholder="Author"
            className="w-full border border-borl dark:border-bord rounded px-2 py-1"
          />
        </td>
        {/* Publisher */}
        <td className="px-2 py-1">
          <input
            type="text"
            name="publisher"
            value={filters.publisher}
            onChange={handleInputChange}
            placeholder="Publisher"
            className="w-full border border-borl dark:border-bord rounded px-2 py-1"
          />
        </td>
        {/* Edition */}
        <td className="px-2 py-1">
          <input
            type="text"
            name="edition"
            value={filters.edition}
            onChange={handleInputChange}
            placeholder="Edition"
            className="w-full border border-borl dark:border-bord rounded px-2 py-1"
          />
        </td>
        {/* Pages (optional filter?) */}
        <td className="px-2 py-1" />

        {/* Country Dropdown */}
        <td className="px-2 py-1">
          <select
            name="country"
            value={filters.country}
            onChange={handleInputChange}
            className="w-full border border-borl dark:border-bord rounded px-2 py-1"
          >
            <option value="">Country</option>
            {fixedValues?.countries?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </td>

        {/* Language Dropdown */}
        <td className="px-2 py-1">
          <select
            name="language"
            value={filters.language}
            onChange={handleInputChange}
            className="w-full border border-borl dark:border-bord rounded px-2 py-1"
          >
            <option value="">Language</option>
            {fixedValues?.languages?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </td>

        {/* MRP Min/Max */}
        <td className="px-2 py-1">
          <div className="flex gap-1">
            <input
              type="number"
              name="mrpMin"
              value={filters.mrpMin}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-1/2 border border-borl dark:border-bord rounded px-1 py-1"
            />
            <input
              type="number"
              name="mrpMax"
              value={filters.mrpMax}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-1/2 border border-borl dark:border-bord rounded px-1 py-1"
            />
          </div>
        </td>

        {/* Shelf Dropdown */}
        <td className="px-2 py-1">
          <select
            name="shelf"
            value={filters.shelf}
            onChange={handleInputChange}
            className="w-full border border-borl dark:border-bord rounded px-2 py-1"
          >
            <option value="">Shelf</option>
            {fixedValues?.shelves?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </td>

        {/* Department Dropdown */}
        <td className="px-2 py-1">
          <select
            name="department"
            value={filters.department}
            onChange={handleInputChange}
            className="w-full border border-borl dark:border-bord rounded px-2 py-1"
          >
            <option value="">Department</option>
            {fixedValues?.departments?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </td>

        {/* Quantity */}
        <td className="px-2 py-1" />

        <td className="px-2 py-1" />

        {/* Actions (reset/search etc.) */}
        <td className="px-2 py-1 text-center">
          <button
            className="bg-buttona hover:bg-buttonp text-bgl2 px-2 py-1 rounded"
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
                limit: 10,
              };
              setFilters(defaultFilters);
              sessionStorage.removeItem("bookFilters");
              getBooks(defaultFilters, dispatch, setBooks);
            }}
          >
            Reset
          </button>
        </td>
      </tr>
    </>
  );
};

export default BooksFilterFrom;
