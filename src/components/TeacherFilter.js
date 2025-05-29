"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fixdeValues, getTeachers } from "@/store/Action"; // Your redux async thunk
import { FaLongArrowAltRight } from "react-icons/fa";

const TeacherFilterForm = ({ filters, setFilters, teachers }) => {
  const dispatch = useDispatch();

  const fixedValues = useSelector((state) => state.fixedValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    sessionStorage.setItem("teacherFilters", JSON.stringify(newFilters));
    dispatch(getTeachers(newFilters)); // Send filters to backend
  };

  useEffect(() => {
    dispatch(
      fixdeValues({
        posts: true,
        departments: true,
      })
    );
  }, []);

  return (
    <tr>
      {/* # and Image and Actions don't have filters, so render empty td */}
      <td colSpan={2} className="border px-2 py-1 font-semibold">
        <div className="flex items-center gap-2">
          Filters <FaLongArrowAltRight />
        </div>
      </td>
      {/* Name filter */}
      <td>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          placeholder="Filter Name"
          className="border rounded border-lborder dark:border-dborder px-2 py-1 w-full"
        />
      </td>
      {/* Email filter */}
      <td>
        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleInputChange}
          placeholder="Filter Email"
          className="border rounded border-lborder dark:border-dborder px-2 py-1 w-full"
        />
      </td>
      {/* Phone filter */}
      <td>
        <input
          type="text"
          name="phone"
          value={filters.phone}
          onChange={handleInputChange}
          placeholder="Filter Phone"
          className="border rounded border-lborder dark:border-dborder px-2 py-1 w-full"
        />
      </td>
      {/* Post filter (select) */}
      <td>
        <select
          name="post"
          value={filters.post}
          onChange={handleInputChange}
          className="border rounded border-lborder dark:border-dborder px-2 py-1 w-full"
        >
          <option value="">-- All Posts --</option>
          {fixedValues.posts?.map((post) => (
            <option key={post._id} value={post._id}>
              {post.name}
            </option>
          ))}
        </select>
      </td>
      {/* Department filter (select) */}
      <td>
        <select
          name="department"
          value={filters.department}
          onChange={handleInputChange}
          className="border rounded border-lborder dark:border-dborder px-2 py-1 w-full"
        >
          <option value="">-- All Departments --</option>
          {fixedValues.departments?.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
      </td>
      {/* Approved filter (boolean) */}
      <td>
        <select
          name="isApproved"
          value={filters.isApproved}
          onChange={handleInputChange}
          className="border rounded border-lborder dark:border-dborder px-2 py-1 w-full"
        >
          <option value="">-- All --</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </td>
      {/* Banned filter (boolean) */}
      <td>
        <select
          name="isBan"
          value={filters.isBan}
          onChange={handleInputChange}
          className="border rounded border-lborder dark:border-dborder px-2 py-1 w-full"
        >
          <option value="">-- All --</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </td>
      {/* Created At & Updated At - usually date filters, leave empty or add date inputs */}
      <td className="flex justify-center">
        <button
          type="button"
          className="bg-button2 dark:bg-button4 hover:bg-button2 dark:bg-button4 text-light2 dark:text-dark2 m-1 px-1 py-1 rounded-md font-medium shadow-sm"
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
            sessionStorage.removeItem("teacherFilters");
            dispatch(getTeachers(defaultFilters));
          }}
        >
          Reset
        </button>
      </td>
      {/* Actions - no filter */}
    </tr>
  );
};

export default TeacherFilterForm;
