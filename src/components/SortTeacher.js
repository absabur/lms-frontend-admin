import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const TableHeaderTeacher = ({ filters, setFilters }) => {
  const columns = [
    { key: null, label: "#" },
    { key: null, label: "Image" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "post", label: "Post" },
    { key: "department", label: "Department" },
    { key: "isApproved", label: "Approved" },
    { key: "isBan", label: "Banned" },
    { key: null, label: "Actions" },
  ];

  const toggleSort = (key) => {
    if (!key) return; // no sorting for columns without key

    if (filters.sortBy === key) {
      // toggle order
      const newOrder = filters.sortOrder === "asc" ? "desc" : "asc";
      setFilters({ ...filters, sortBy: key, sortOrder: newOrder, page: 1 });
    } else {
      // new sort key, default asc
      setFilters({ ...filters, sortBy: key, sortOrder: "asc", page: 1 });
    }
  };

  const renderSortIcon = (key) => {
    if (!key) return null;

    if (filters.sortBy === key) {
      return filters.sortOrder === "asc" ? (
        <FaSortUp className="inline ml-1 text-green-600" />
      ) : (
        <FaSortDown className="inline ml-1 text-green-600" />
      );
    }

    return <FaSort className="inline ml-1" />;
  };

  return (
    <tr>
      {columns.map(({ key, label }, idx) => (
        <th
          key={idx}
          onClick={() => toggleSort(key)}
          className={`px-3 py-2 border border-blue-600 whitespace-nowrap select-none cursor-pointer`}
          title={key ? `Sort by ${label}` : ""}
        >
          {label}
          {renderSortIcon(key)}
        </th>
      ))}
    </tr>
  );
};

export default TableHeaderTeacher;
