"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getStudents } from "@/store/Action";
import StudentFilterForm from "@/components/StudentFilterForm";
import StudentPaginate from "@/components/StudentPaginate";
import SortableTableHeader from "@/components/SortStudent";

const AllStudentsPage = () => {
  const [filters, setFilters] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("studentFilters");
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
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const router = useRouter();

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("studentFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      dispatch(getStudents(parsedFilters));
    } else {
      dispatch(getStudents());
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-dark1 dark:text-light1 text-center md:text-left">
          All Students
        </h1>
        <Link
          href="/dashboard/students/add-student"
          className="bg-button1 dark:bg-button3 hover:bg-button1 dark:bg-button3 text-light2 dark:text-dark2 font-medium px-5 py-2 rounded shadow"
        >
          + Add Student
        </Link>
      </div>

      {/* Add optional StudentsFilterForm component here if needed */}

      <div className="overflow-x-auto bg-light1 dark:bg-dark1 rounded-lg shadow-lg">
        <table className="min-w-full table-auto w-full text-sm text-left text-dark1 dark:text-light1">
          <thead className="bg-button1 dark:bg-button3 text-light2 dark:text-dark2 sticky top-0 z-10">
            <SortableTableHeader filters={filters} setFilters={setFilters} />
          </thead>
          <tbody>
            <StudentFilterForm filters={filters} setFilters={setFilters} />
            {students?.students?.map((student, index) => (
              <tr
                key={index}
                onClick={() =>
                  router.push(`/dashboard/students/${student._id}`)
                }
                className="odd:bg-light2 even:bg-light1 dark:bg-dark1 hover:bg-blue-100 border-t border-black-200 cursor-pointer"
              >
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">
                  <img
                    src={student?.avatar?.url}
                    className="w-12 h-12 object-cover rounded-full border border-lborder dark:border-dborder"
                  />
                </td>
                <td className="px-3 py-2">{student.name}</td>
                <td className="px-3 py-2">{student.email}</td>
                <td className="px-3 py-2">{student.phone}</td>
                <td className="px-3 py-2">{student.addmissionRoll}</td>
                <td className="px-3 py-2">{student.boardRoll}</td>
                <td className="px-3 py-2">{student.registration}</td>
                <td className="px-3 py-2">{student.session?.name}</td>
                <td className="px-3 py-2">{student.department?.name}</td>
                <td className="px-3 py-2">{student.shift?.name}</td>
                <td className="px-3 py-2">
                  {student.isApproved ? "Yes" : "No"}
                </td>
                <td className="px-3 py-2">{student.isBan ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/students/edit-student/${student._id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl text-dark2 dark:text-light2 px-3 py-1 rounded text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StudentPaginate
        filters={filters}
        setFilters={setFilters}
        students={students}
      />
    </div>
  );
};

export default AllStudentsPage;
