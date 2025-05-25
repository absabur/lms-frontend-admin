"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "@/store/Action";

const FindTeacher = ({ closeModal, setTeacherValues }) => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getTeachers({ search: searchValue }));
  }, [searchValue]);

  const handleAddBook = (values) => {
    setTeacherValues(values);
    closeModal();
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachers?.teachers?.length > 0 ? (
          teachers.teachers.map((teacher, index) => (
            <div
              key={index}
              onClick={() =>
                handleAddBook({
                  image: teacher.avatar.url,
                  id: teacher._id,
                  name: teacher.name,
                  post: teacher.post,
                  department: teacher.department
                })
              }
              className="bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
            >
              <div className="aspect-square bg-gray-100">
                {teacher?.avatar?.url ? (
                  <img
                    src={teacher.avatar.url}
                    alt={teacher.name}
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
                  {teacher.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Post: {teacher.post}
                </p>
                <p className="text-sm text-gray-600">
                  Dept: {teacher.department || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic col-span-full">
            No Teachers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindTeacher;
