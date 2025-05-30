"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fixdeValues, getStudents } from "@/store/Action";
import { FaLongArrowAltRight } from "react-icons/fa";

const StudentFilterRow = ({ filters, setFilters }) => {
  const dispatch = useDispatch();
  const fixedValues = useSelector((state) => state.fixedValues);

  useEffect(() => {
    dispatch(
      fixdeValues({
        sessions: true,
        departments: true,
        shifts: true,
      })
    );
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    sessionStorage.setItem("studentFilters", JSON.stringify(newFilters));
    dispatch(getStudents(newFilters));
  };

  return (
    <tr>
      {/* # (serial number) - empty cell */}
      <td colSpan={2} className="px-2 py-1 font-semibold">
        <div className="flex items-center gap-2">
          Filters <FaLongArrowAltRight />
        </div>
      </td>

      {/* Name */}
      <td className="">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full border rounded border-borl dark:border-bord px-2 py-1"
        />
      </td>

      {/* Image - no filter input, so empty */}

      {/* Email */}
      <td className="">
        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full border rounded border-borl dark:border-bord px-2 py-1"
        />
      </td>

      {/* Phone */}
      <td className="">
        <input
          type="text"
          name="phone"
          value={filters.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="w-full border rounded border-borl dark:border-bord px-2 py-1"
        />
      </td>

      {/* Admission Roll - no filter input */}
      <td className=""></td>

      {/* Board Roll - no filter input */}
      <td className=""></td>

      {/* Registration - no filter input */}
      <td className=""></td>

      {/* Session */}
      <td className="">
        <select
          name="session"
          value={filters.session}
          onChange={handleInputChange}
          className="w-full border rounded border-borl dark:border-bord px-2 py-1"
        >
          <option value="">-- Select Session --</option>
          {fixedValues.sessions?.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </td>

      {/* Department */}
      <td className="">
        <select
          name="department"
          value={filters.department}
          onChange={handleInputChange}
          className="w-full border rounded border-borl dark:border-bord px-2 py-1"
        >
          <option value="">-- Select Department --</option>
          {fixedValues.departments?.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </td>

      {/* Shift */}
      <td className="">
        <select
          name="shift"
          value={filters.shift}
          onChange={handleInputChange}
          className="w-full border rounded border-borl dark:border-bord px-2 py-1"
        >
          <option value="">-- Select Shift --</option>
          {fixedValues.shifts?.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </td>

      {/* Approved */}
      <td className="">
        <select
          name="isApproved"
          value={filters.isApproved}
          onChange={handleInputChange}
          className="w-full border rounded border-borl dark:border-bord px-2 py-1"
        >
          <option value="">--</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </td>

      {/* Banned */}
      <td className="">
        <select
          name="isBan"
          value={filters.isBan}
          onChange={handleInputChange}
          className="w-full border rounded border-borl dark:border-bord px-2 py-1"
        >
          <option value="">--</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </td>

      {/* Actions - no filter input */}
      <td className="flex justify-center m-1">
        <button
          type="button"
          className="bg-buttonp hover:bg-buttona text-textd px-1 py-1 rounded-md font-medium shadow-sm"
          onClick={() => {
            const defaultFilters = {
              name: "",
              email: "",
              phone: "",
              department: "",
              shift: "",
              isApproved: "",
              isBan: "",
              sortBy: "",
              sortOrder: "",
              page: 1,
              limit: 10,
            };
            setFilters(defaultFilters);
            sessionStorage.removeItem("studentFilters");
            dispatch(getStudents(defaultFilters));
          }}
        >
          Reset
        </button>
      </td>
    </tr>
  );
};

export default StudentFilterRow;
