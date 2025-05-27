"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { getStudents } from "@/store/Action";
import { FaSortDown, FaSortUp } from "react-icons/fa";

const headers = [
  { key: "#", label: "#" },
  { key: "image", label: "Image" },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "phone", label: "Phone" },
  { key: "admissionRoll", label: "Admission Roll" },
  { key: "boardRoll", label: "Board Roll" },
  { key: "registration", label: "Registration" },
  { key: "session", label: "Session", sortable: true },
  { key: "department", label: "Department", sortable: true },
  { key: "shift", label: "Shift", sortable: true },
  { key: "isApproved", label: "Approved", sortable: true },
  { key: "isBan", label: "Banned", sortable: true },
  { key: "actions", label: "Actions" },
];

const SortableTableHeader = ({ filters, setFilters }) => {
  const dispatch = useDispatch();

  // Toggle sorting state for a column
  const handleSort = (key, sortable) => {
    if (!sortable) return; // ignore non-sortable columns

    let newSortOrder = "asc";
    if (filters.sortBy === key) {
      // toggle sort order
      newSortOrder = filters.sortOrder === "asc" ? "desc" : "asc";
    }
    const newFilters = {
      ...filters,
      sortBy: key,
      sortOrder: newSortOrder,
      page: 1,
    };
    setFilters(newFilters);
    localStorage.setItem("studentFilters", JSON.stringify(newFilters));
    dispatch(getStudents(newFilters));
  };

  // Arrow icon based on sort order
  const renderSortIcons = (fieldKey) => {
    const isActive = filters.sortBy === fieldKey;
    const isAsc = filters.sortOrder === "asc";
    const isDesc = filters.sortOrder === "desc";

    return (
      <span className="flex flex-col">
        <FaSortUp
          className={`text-xs ${
            isActive && isAsc ? "text-green-600" : "text-gray-400"
          }`}
        />
        <FaSortDown
          className={`text-xs ${
            isActive && isDesc ? "text-green-600" : "text-gray-400"
          }`}
        />
      </span>
    );
  };

  return (
    <tr>
      {headers.map(({ key, label, sortable }) => (
        <th
          key={key}
          onClick={() => handleSort(key, sortable)}
          className={`text-center px-3 py-2 border border-blue-600 whitespace-nowrap ${
            sortable ? "cursor-pointer select-none" : ""
          }`}
          style={{ userSelect: "none" }}
          title={sortable ? `Sort by ${label}` : undefined}
        >
          <div className="flex items-center gap-1">
            {label}
            {sortable && renderSortIcons(key)}
          </div>
        </th>
      ))}
    </tr>
  );
};

export default SortableTableHeader;
