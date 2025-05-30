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
    <div className="p-4 md:p-6">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:w-96 border border-borl dark:border-bord rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
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
              className="bg-bgl1 dark:bg-bgd1 rounded-xl shadow border dark:border-bord  hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
            >
              <div className="aspect-square bg-bgl1 dark:bg-bgd1">
                {teacher?.avatar?.url ? (
                  <img
                    src={teacher.avatar.url}
                    alt={teacher.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-bgl1 dark:text-bgd1 italic">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-bgd1 dark:text-bgl1 truncate">
                  {teacher.name}
                </h3>
                <p className="text-sm text-bgd1 dark:text-bgl1">
                  Post: {teacher.post?.name}
                </p>
                <p className="text-sm text-bgd1 dark:text-bgl1">
                  Dept: {teacher.department?.name || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-bgd1 dark:text-bgl1 italic col-span-full">
            No Teachers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindTeacher;
