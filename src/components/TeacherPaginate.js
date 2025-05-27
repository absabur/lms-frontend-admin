import { getTeachers } from "@/store/Action";
import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

const TeacherPaginate = ({ filters, setFilters, teachers }) => {
  const dispatch = useDispatch();
  const changePage = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    localStorage.setItem("teacherFilters", JSON.stringify(newFilters));
    dispatch(getTeachers(newFilters));
  };
  return (
    <>
      {teachers?.total > 0 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            onPageChange={({ selected }) => changePage(selected + 1)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(teachers.total / filters.limit)}
            forcePage={filters.page - 1}
            previousLabel="← Previous"
            containerClassName="flex flex-wrap gap-2 items-center justify-center sm:justify-start"
            pageClassName="px-3 py-1 rounded bg-gray-200 text-sm cursor-pointer"
            activeClassName="bg-green-100 text-black"
            previousClassName="px-3 py-1 rounded bg-gray-300 text-sm cursor-pointer"
            nextClassName="px-3 py-1 rounded bg-gray-300 text-sm cursor-pointer"
            breakClassName="px-3 py-1 rounded bg-gray-100"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </>
  );
};

export default TeacherPaginate;
