"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getTeachers } from "@/store/Action";
import TeacherFilterForm from "@/components/TeacherFilter";

const AllTeachersPage = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers);
  const router = useRouter();

  useEffect(() => {
    const savedFilters = localStorage.getItem("teacherFilters");
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
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          All Teachers
        </h1>
        <Link
          href="/dashboard/teachers/add-teacher"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
        >
          + Add Teacher
        </Link>
      </div>

      
      <TeacherFilterForm />
      {/* Add optional TeachersFilterForm component here if needed */}

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-600 text-white sticky top-0 z-10">
            <tr>
              {[
                "#",
                "Name",
                "Image",
                "Email",
                "Phone",
                "Post",
                "Department",
                "Approved",
                "Banned",
                "Created At",
                "Updated At",
                "Actions",
              ].map((head, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2 border border-blue-600 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teachers?.teachers?.map((teacher, index) => (
              <tr
                key={index}
                onClick={() =>
                  router.push(`/dashboard/teachers/${teacher._id}`)
                }
                className="odd:bg-gray-100 even:bg-white hover:bg-blue-100 border-t border-black-200 cursor-pointer"
              >
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{teacher.name}</td>
                <td className="px-3 py-2">
                  <img
                    src={teacher?.avatar?.url}
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
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
                  {teacher.createDate?.date} {teacher.createDate?.formatedTime}
                </td>
                <td className="px-3 py-2">
                  {teacher.updateDate?.date} {teacher.updateDate?.formatedTime}
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/teachers/edit-teacher/${teacher._id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl text-black px-3 py-1 rounded text-xs"
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
    </div>
  );
};

export default AllTeachersPage;
