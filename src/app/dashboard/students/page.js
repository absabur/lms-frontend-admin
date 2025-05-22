"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getStudents } from "@/store/Action";
import StudentFilterForm from "@/components/StudentFilterForm"

const AllStudentsPage = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const router = useRouter();

  useEffect(() => {
    const savedFilters = localStorage.getItem("studentFilters");
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
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          All Students
        </h1>
        <Link
          href="/dashboard/students/add-student"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
        >
          + Add Student
        </Link>
      </div>

      
      <StudentFilterForm />
      {/* Add optional StudentsFilterForm component here if needed */}

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
                "Addmission Roll",
                "Board Roll",
                "Registration",
                "Sesstion",
                "Department",
                "Shift",
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
            {students?.students?.map((student, index) => (
              <tr
                key={index}
                onClick={() =>
                  router.push(`/dashboard/students/${student._id}`)
                }
                className="odd:bg-gray-100 even:bg-white hover:bg-blue-100 border-t border-black-200 cursor-pointer"
              >
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{student.name}</td>
                <td className="px-3 py-2">
                  <img
                    src={student?.avatar?.url}
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
                  />
                </td>
                <td className="px-3 py-2">{student.email}</td>
                <td className="px-3 py-2">{student.phone}</td>
                <td className="px-3 py-2">{student.addmissionRoll}</td>
                <td className="px-3 py-2">{student.boardRoll}</td>
                <td className="px-3 py-2">{student.registration}</td>
                <td className="px-3 py-2">{student.session}</td>
                <td className="px-3 py-2">{student.department}</td>
                <td className="px-3 py-2">{student.shift}</td>
                <td className="px-3 py-2">
                  {student.isApproved ? "Yes" : "No"}
                </td>
                <td className="px-3 py-2">{student.isBan ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  {student.createDate?.date} {student.createDate?.formatedTime}
                </td>
                <td className="px-3 py-2">
                  {student.updateDate?.date} {student.updateDate?.formatedTime}
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/students/edit-student/${student._id}`}
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

export default AllStudentsPage;
