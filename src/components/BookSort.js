"use client";
import { getBooks } from "@/store/Action";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useDispatch } from "react-redux";

const sortableFields = {
  "Book Name": "bookName",
  Author: "bookAuthor",
  Publisher: "publisher",
  MRP: "mrp",
  Quantity: "quantity",
  Department: "department",
  Shelf: "shelf",
  Language: "language",
  Pages: "numberOfPages",
};

const TableHead = ({ filters, setFilters, setBooks }) => {
  const dispatch = useDispatch();
  const handleSort = (field) => {
    const isCurrent = filters.sortBy === field;
    const newOrder = isCurrent && filters.sortOrder === "asc" ? "desc" : "asc";

    const updatedFilters = {
      ...filters,
      sortBy: field,
      sortOrder: newOrder,
      page: 1,
    };

    setFilters(updatedFilters);
    localStorage.setItem("bookFilters", JSON.stringify(updatedFilters));
    getBooks(updatedFilters, dispatch, setBooks);
  };

  return (
    <tr>
      {[
        "#",
        "Image",
        "Book Name",
        "Author",
        "Publisher",
        "Edition",
        "Pages",
        "Country",
        "Language",
        "MRP",
        "Shelf",
        "Department",
        "Quantity",
        "Book Numbers",
        "Actions",
      ].map((head, idx) => {
        const isSortable = Object.keys(sortableFields).includes(head);
        const fieldKey = sortableFields[head];

        return (
          <th
            key={idx}
            className="px-3 py-2 border border-blue-600 whitespace-nowrap cursor-pointer select-none"
            onClick={() => isSortable && handleSort(fieldKey)}
          >
            <div className="flex items-center gap-1">
              {head}
              {isSortable && (
                <>
                  {filters.sortBy === fieldKey ? (
                    filters.sortOrder === "asc" ? (
                      <FaSortUp className="text-xs" />
                    ) : (
                      <FaSortDown className="text-xs" />
                    )
                  ) : (
                    <FaSort className="text-xs opacity-50" />
                  )}
                </>
              )}
            </div>
          </th>
        );
      })}
    </tr>
  );
};
export default TableHead;
