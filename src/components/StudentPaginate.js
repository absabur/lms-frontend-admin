import { getStudents } from "@/store/Action";
import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

const StudentPaginate = ({ students, filters, setFilters }) => {
    const dispatch = useDispatch()
  const changePage = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    sessionStorage.setItem("studentFilters", JSON.stringify(newFilters));
    dispatch(getStudents(newFilters));
  };
  return (
    <>
      {students?.total > 0 && (
        <div className="pb-2 mt-6">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            onPageChange={({ selected }) => changePage(selected + 1)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(students.total / filters.limit)}
            forcePage={filters.page - 1}
            previousLabel="← Previous"
            containerClassName="flex flex-wrap gap-2 items-center justify-center"
            pageClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            activeClassName="bg-buttonp text-textd dark:bg-buttonp dark:text-bgd1"
            previousClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            nextClassName="px-3 py-1 rounded text-sm transition-colors bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 hover:bg-gray-100 dark:hover:bg-gray-800"
            breakClassName="px-3 py-1 rounded text-bgd2 dark:text-bgl2 bg-bgl1 dark:bg-bgd1"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </>
  );
};

export default StudentPaginate;
