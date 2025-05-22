"use client";
import { getStudentById } from "@/store/Action";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const StudentCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentDetails);
  
  useEffect(() => {
    if (id) {
      dispatch(getStudentById(id));
    }
  }, [id]);
  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Avatar */}
        <img
          src={student?.avatar?.url}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover mx-auto md:mx-0"
        />

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{student?.name}</h2>
          <p className="text-sm text-gray-500">{student?.department}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Email" value={student?.email} />
        <Info label="Phone" value={student?.phone} />
        <Info label="Bangla Name" value={student?.banglaName || "N/A"} />
        <Info label="Fathers name" value={student?.fathersName || "N/A"} />
        <Info label="Mothers Name" value={student?.mothersName || "N/A"} />
        <Info label="addmissionRoll" value={student?.addmissionRoll || "N/A"} />
        <Info label="boardRoll" value={student?.boardRoll || "N/A"} />
        <Info label="registration" value={student?.registration || "N/A"} />
        <Info label="department" value={student?.department || "N/A"} />
        <Info label="session" value={student?.session || "N/A"} />
        <Info label="shift" value={student?.shift || "N/A"} />
        <Info label="district" value={student?.district || "N/A"} />
        <Info label="upazila" value={student?.upazila || "N/A"} />
        <Info label="union" value={student?.union || "N/A"} />
        <Info label="village" value={student?.village || "N/A"} />
        <Info label="address" value={student?.address || "N/A"} />
      </div>

      {/* Status Tags */}
      <div className="flex gap-4 flex-wrap">
        <StatusBadge label="Approved" active={student?.isApproved} />
        <StatusBadge label="Banned" active={student?.isBan} inverse />
      </div>

      {/* Metadata */}
      <div className="text-xs text-gray-500">
        <p>Created: {student?.createDate?.date || "N/A"}</p>
        <p>Updated: {student?.updateDate?.date || "N/A"}</p>
        <p>Updated By: {student?.updatedBy || "N/A"}</p>
      </div>
      <div className="flex gap-3">
        {student?.name && student?.isBan ? (
          <button
            onClick={() => {
              fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/unban-student/${student._id}`,
                {
                  method: "GET", // or "PUT"/"POST" depending on your API
                  credentials: "include",
                }
              )
                .then((res) => res.json())
                .then((data) => dispatch(getStudentById(id)))
                .catch((err) => console.error("API error:", err));
            }}
            className="cursor-pointer bg-green-400 hover:bg-green-500 hover:shadow-xl text-black px-3 py-1 rounded text-xs border-none"
          >
            Unban
          </button>
        ) : (
          <button
            onClick={() => {
              fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/ban-student/${student._id}`,
                {
                  method: "GET", // or "PUT"/"POST" depending on your API
                  credentials: "include",
                }
              )
                .then((res) => res.json())
                .then((data) => dispatch(getStudentById(id)))
                .catch((err) => console.error("API error:", err));
            }}
            className="cursor-pointer bg-red-400 hover:bg-red-500 hover:shadow-xl text-black px-3 py-1 rounded text-xs border-none"
          >
            Ban
          </button>
        )}
        {student?.name && !student?.isApproved && (
          <button
            onClick={() => {
              fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/approve-student/${student._id}`,
                {
                  method: "GET", // or "PUT"/"POST" depending on your API
                  credentials: "include",
                }
              )
                .then((res) => res.json())
                .then((data) => dispatch(getStudentById(id)))
                .catch((err) => console.error("API error:", err));
            }}
            className="cursor-pointer bg-green-400 hover:bg-green-500 hover:shadow-xl text-black px-3 py-1 rounded text-xs border-none"
          >
            Approved
          </button>
        )}

        <Link
          href={`/dashboard/students/edit-student/${student._id}`}
          className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl text-black px-3 py-1 rounded text-xs"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

// Helper Components
const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-600 text-sm font-medium">{label}</p>
    <p className="text-gray-800 font-semibold">{value}</p>
  </div>
);

const StatusBadge = ({ label, active, inverse = false }) => {
  const color = inverse
    ? active
      ? "bg-red-100 text-red-600"
      : "bg-gray-100 text-gray-400"
    : active
    ? "bg-green-100 text-green-600"
    : "bg-gray-100 text-gray-400";

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${color}`}>
      {label}: {active ? "Yes" : "No"}
    </span>
  );
};

export default StudentCard;
