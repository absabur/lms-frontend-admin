"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getTeachers } from "@/store/Action";
import TeacherFilterForm from "@/components/TeacherFilter";
import TeacherPaginate from "@/components/TeacherPaginate";
import TableHeaderTeacher from "@/components/SortTeacher";

const AllTeachersPage = () => {
  const [filters, setFilters] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("teacherFilters");
      return stored
        ? JSON.parse(stored)
        : {
            name: "",
            email: "",
            phone: "",
            post: "",
            department: "",
            isApproved: "",
            isBan: "",
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
      post: "",
      department: "",
      isApproved: "",
      isBan: "",
      sortBy: "",
      sortOrder: "",
      page: 1,
      limit: 10,
    };
  });
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers);
  const router = useRouter();

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("teacherFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      dispatch(getTeachers(parsedFilters));
    } else {
      dispatch(getTeachers());
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-dark1 dark:text-light1 text-center md:text-left">
          All Teachers
        </h1>
        <Link
          href="/dashboard/teachers/add-teacher"
          className="bg-button1 dark:bg-button3 hover:bg-button1 dark:bg-button3 text-light2 dark:text-dark2 font-medium px-5 py-2 rounded shadow"
        >
          + Add Teacher
        </Link>
      </div>
      {/* Add optional TeachersFilterForm component here if needed */}

      <div className="overflow-x-auto bg-light1 dark:bg-dark1 rounded-lg shadow-lg">
        <table className="min-w-full table-auto w-full text-sm text-left text-dark1 dark:text-light1">
          <thead className="bg-button1 dark:bg-button3 text-light2 dark:text-dark2 sticky top-0 z-10">
            <TableHeaderTeacher filters={filters} setFilters={setFilters} />
          </thead>
          <tbody>
            <TeacherFilterForm filters={filters} setFilters={setFilters} />
            {teachers?.teachers?.map((teacher, index) => (
              <tr
                key={index}
                onClick={() =>
                  router.push(`/dashboard/teachers/${teacher._id}`)
                }
                className="odd:bg-light2 even:bg-light1 dark:bg-dark1 hover:bg-blue-100 border-t border-black-200 cursor-pointer"
              >
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{teacher.name}</td>
                <td className="px-3 py-2">
                  <img
                    src={teacher?.avatar?.url}
                    className="w-12 h-12 object-cover rounded-full border border-lborder dark:border-dborder"
                  />
                </td>
                <td className="px-3 py-2">{teacher.email}</td>
                <td className="px-3 py-2">{teacher.phone}</td>
                <td className="px-3 py-2">{teacher.post?.name}</td>
                <td className="px-3 py-2">{teacher.department?.name}</td>
                <td className="px-3 py-2">
                  {teacher.isApproved ? "Yes" : "No"}
                </td>
                <td className="px-3 py-2">{teacher.isBan ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/teachers/edit-teacher/${teacher._id}`}
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
      <TeacherPaginate
        filters={filters}
        setFilters={setFilters}
        teachers={teachers}
      />
    </div>
  );
};

export default AllTeachersPage;
