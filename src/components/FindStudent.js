"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "@/store/Action";
import { useRouter } from "next/navigation";

const FindStudent = ({ closeModal, setStudentValues }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getStudents({ search: searchValue }));
  }, [searchValue]);

  const handleAddBook = (values) => {
    setStudentValues(values);
    closeModal();
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search students..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {students?.students?.length > 0 ? (
          students.students.map((student, index) => (
            <div
              key={index}
              onClick={() =>
                handleAddBook({
                  image: student.avatar.url,
                  id: student._id,
                  name: student.name,
                  roll: student.boardRoll || student.addmissionRoll,
                })
              }
              className="bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
            >
              <div className="aspect-square bg-gray-100">
                {student?.avatar?.url ? (
                  <img
                    src={student.avatar.url}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {student.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Roll: {student.boardRoll || student.addmissionRoll}
                </p>
                <p className="text-sm text-gray-600">
                  Dept: {student.department || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic col-span-full">
            No students found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindStudent;
