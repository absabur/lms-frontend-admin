"use client";
import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import FindBook from "@/components/FindBook";
import FindStudent from "@/components/FindStudent";
import { useDispatch, useSelector } from "react-redux";
import { assignBook, getBookBySlug } from "@/store/Action";

const AddCardOptions = () => {
  const [modalType, setModalType] = useState("");
  const [bookValues, setBookValues] = useState({});
  const [studentValues, setStudentValues] = useState({});
  const [selectedBookNumber, setSelectedBookNumber] = useState("");
  const singleBook = useSelector((state) => state.singleBook);

  const dispatch = useDispatch();

  const closeModal = () => setModalType(null);

  useEffect(() => {
    dispatch(getBookBySlug(bookValues.slug));
  }, [bookValues]);

  const handleAssign = () => {
    dispatch(assignBook(studentValues.id, bookValues.id, selectedBookNumber));
  };

  return (
    <>
      {/* Main Card Section */}
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-light1 dark:bg-dark1 rounded-xl shadow space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Add Book Card */}
          <div
            onClick={() => setModalType("book")}
            className="relative flex items-center gap-4 p-4 border-2 border-dashed border-lborder dark:border-dborder rounded-lg cursor-pointer hover:border-blue-500 transition"
          >
            {bookValues.slug && (singleBook.quantity <= 0) && (
              <div className="flex items-center justify-center absolute top-[0] left-[0] w-full h-full bg-dark1 dark:bg-light1 bg-opacity-70 z-[2]">
                Book is out of stock
              </div>
            )}
            {bookValues?.id ? (
              <>
                <div className="relative w-20 h-20 flex-shrink-0 bg-light1 dark:bg-dark1 rounded overflow-hidden">
                  {bookValues?.image ? (
                    <img
                      src={bookValues.image}
                      alt={bookValues.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-light1 dark:text-dark1 text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark1 dark:text-light1 line-clamp-1">
                    {bookValues.name}
                  </h3>
                  <p className="text-sm text-dark1 dark:text-light1">
                    Author: {bookValues.author || "N/A"}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                <Plus className="w-6 h-6 text-dark1 dark:text-light1" />
                <p className="text-sm text-dark1 dark:text-light1 mt-1">Add Book</p>
              </div>
            )}
          </div>

          {/* Add Student Card */}
          <div
            onClick={() => setModalType("student")}
            className="flex items-center gap-4 p-4 border-2 border-dashed border-lborder dark:border-dborder rounded-lg cursor-pointer hover:border-blue-500 transition"
          >
            {studentValues?.id ? (
              <>
                <div className="w-20 h-20 flex-shrink-0 bg-light1 dark:bg-dark1 rounded overflow-hidden">
                  {studentValues?.image ? (
                    <img
                      src={studentValues.image}
                      alt={studentValues.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-light1 dark:text-dark1 text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark1 dark:text-light1 line-clamp-1">
                    {studentValues.name}
                  </h3>
                  <p className="text-sm text-dark1 dark:text-light1">
                    Roll: {studentValues.roll || "N/A"}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                <Plus className="w-6 h-6 text-dark1 dark:text-light1" />
                <p className="text-sm text-dark1 dark:text-light1 mt-1">Add Student</p>
              </div>
            )}
          </div>
        </div>
        {bookValues.bookNumbers?.length > 0 && (
          <>
            <select
              value={selectedBookNumber}
              onChange={(e) => setSelectedBookNumber(e.target.value)}
              className="mt-2 p-2 border rounded"
            >
              <option value="">--Select Book Number--</option>
              {bookValues.bookNumbers.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Submit Button */}
        <button
          onClick={handleAssign}
          className="w-full bg-button1 dark:bg-button3 hover:bg-button1 dark:bg-button3 text-light2 dark:text-dark2 font-semibold py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* Modal for Book */}
      {modalType === "book" && (
        <div className="fixed inset-0 z-50 bg-dark1 dark:bg-light1 bg-opacity-60 flex items-center justify-center px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-light1 dark:bg-dark1 rounded-lg p-6 shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-dark1 dark:text-light1 hover:text-red-500 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <FindBook closeModal={closeModal} setBookId={setBookValues} />
          </div>
        </div>
      )}

      {/* Modal for Student */}
      {modalType === "student" && (
        <div className="fixed inset-0 z-50 bg-dark1 dark:bg-light1 bg-opacity-60 flex items-center justify-center px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-light1 dark:bg-dark1 rounded-lg p-6 shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-dark1 dark:text-light1 hover:text-red-500 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <FindStudent
              closeModal={closeModal}
              setStudentValues={setStudentValues}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddCardOptions;
