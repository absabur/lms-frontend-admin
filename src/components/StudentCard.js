"use client";
import React, { useRef } from "react";
import ScreenshotButton from "./ScreenShot";
import { useReactToPrint } from "react-to-print";

const StudentLibraryCard = ({ student }) => {
  console.log(student);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6">
      <div className="text-center flex flex-col gap-6">
        <div
          ref={contentRef}
          id="library-card"
          className="w-[600px] min-h-[400px] p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-300 shadow-xl text-gray-800 relative font-sans"
          style={{ fontFamily: "Segoe UI, sans-serif" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold text-2xl shadow-inner">
                📚
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold uppercase tracking-wide text-indigo-700">
                  Library Card
                </h1>
                <p className="text-sm text-gray-500">
                  {student?.department?.name}
                </p>
              </div>
            </div>
            <div className="text-sm text-right text-gray-500 space-y-1">
              <p>
                <strong>Session:</strong> {student?.session?.name}
              </p>
              <p>
                <strong>Shift:</strong> {student?.shift?.name}
              </p>
            </div>
          </div>

          {/* Profile */}
          <div className="flex gap-6 items-center mb-6">
            <img
              src={student?.avatar?.url}
              alt={student?.name}
              className="w-28 h-28 rounded-2xl border-2 border-indigo-500 object-cover shadow-md"
            />
            <div className="text-left space-y-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {student?.name}
              </h2>
              <p className="text-sm text-gray-600">{student?.banglaName}</p>
              <p className="text-xs text-gray-500">{student?.email}</p>
              <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded shadow-sm">
                📞 {student?.phone}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-3 text-sm text-left">
            <p>
              <span className="font-semibold">Father:</span>{" "}
              {student?.fathersName}
            </p>
            <p>
              <span className="font-semibold">Mother:</span>{" "}
              {student?.mothersName}
            </p>
            <p>
              <span className="font-semibold">Admission Roll:</span>{" "}
              {student?.addmissionRoll}
            </p>
            <p>
              <span className="font-semibold">Board Roll:</span>{" "}
              {student?.boardRoll}
            </p>
            <p>
              <span className="font-semibold">Reg. No:</span>{" "}
              {student?.registration}
            </p>
            <p>
              <span className="font-semibold">District:</span>{" "}
              {student?.district?.name}
            </p>
            <p>
              <span className="font-semibold">Upazila:</span>{" "}
              {student?.upazila?.name}
            </p>
            <p>
              <span className="font-semibold">Village:</span> {student?.village}
            </p>
          </div>

          {/* Footer Badge */}
          <div className="mt-6 text-center">
            <div className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md tracking-wide">
              Valid for Library Use Only
            </div>
          </div>
          {/* Seal and Signature */}
          <div className="mt-10 flex justify-between items-end px-4">
            {/* Seal */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-10 flex items-center justify-center text-sm text-indigo-600 font-semibold">
                
              </div>
              <p className="text-xs text-gray-500 mt-2">Institutional Seal</p>
            </div>

            {/* Signature */}
            <div className="text-center">
              <div className="border-t border-gray-400 w-48 mx-auto mb-1" />
              <p className="text-sm text-gray-600 font-medium">
                Librarian's Signature
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 flex items-center justify-center gap-2"
            onClick={reactToPrintFn}
          >
            Print
          </button>
          <ScreenshotButton targetId="library-card" year={student?.name} />
        </div>
      </div>
    </div>
  );
};

export default StudentLibraryCard;
