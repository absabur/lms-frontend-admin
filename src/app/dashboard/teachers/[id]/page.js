"use client";
import { getTeacherById } from "@/store/Action";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TeacherCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teacherDetails);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleWithDelay = (callback) => {
    if (isDisabled) return;
    setIsDisabled(true);
    callback(); // execute your logic
    setTimeout(() => setIsDisabled(false), 5000); // re-enable after 5 seconds
  };

  useEffect(() => {
    if (id) {
      dispatch(getTeacherById(id));
    }
  }, [id]);
  return (
    <div className="w-full max-w-3xl mx-auto bg-light1 dark:bg-dark1 shadow-md rounded-2xl p-6 space-y-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Avatar */}
        <img
          src={teacher?.avatar?.url}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover mx-auto md:mx-0"
        />

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-dark1 dark:text-light1">{teacher?.name}</h2>
          <p className="text-sm text-dark1 dark:text-light1">{teacher?.post?.name}</p>
          <p className="text-sm text-dark1 dark:text-light1">{teacher?.department?.name}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Email" value={teacher?.email} />
        <Info label="Phone" value={teacher?.phone} />
        <Info label="NID" value={teacher?.nId || "N/A"} />
        <Info label="Teacher ID" value={teacher?.teacherId || "N/A"} />
        <Info label="Address" value={teacher?.address || "N/A"} />
      </div>

      {/* Status Tags */}
      <div className="flex gap-4 flex-wrap">
        <StatusBadge label="Approved" active={teacher?.isApproved} />
        <StatusBadge label="Banned" active={teacher?.isBan} inverse />
      </div>

      {/* Metadata */}
      <div className="text-xs text-dark1 dark:text-light1">
        <p>Created: {teacher?.createDate?.date || "N/A"}</p>
        <p>Updated: {teacher?.updateDate?.date || "N/A"}</p>
      </div>
      <div className="flex gap-3">
        {teacher?.name && teacher?.isBan ? (
          <button
            disabled={isDisabled}
            onClick={() =>
              handleWithDelay(() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/unban-teacher/${teacher._id}`,
                  {
                    method: "GET",
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then(() => dispatch(getTeacherById(id)))
                  .catch((err) => console.error("API error:", err));
              })
            }
            className={`cursor-pointer px-3 py-1 rounded text-xs border-none text-dark2 dark:text-light2 transition-all ${
              isDisabled
                ? "bg-light1 dark:bg-dark1"
                : "bg-green-400 hover:bg-green-500 hover:shadow-xl"
            }`}
          >
            Unban
          </button>
        ) : (
          <button
            disabled={isDisabled}
            onClick={() =>
              handleWithDelay(() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/ban-teacher/${teacher._id}`,
                  {
                    method: "GET",
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then(() => dispatch(getTeacherById(id)))
                  .catch((err) => console.error("API error:", err));
              })
            }
            className={`cursor-pointer px-3 py-1 rounded text-xs border-none text-dark2 dark:text-light2 transition-all ${
              isDisabled
                ? "bg-light1 dark:bg-dark1"
                : "bg-red-400 hover:bg-button2 dark:bg-button4 hover:shadow-xl"
            }`}
          >
            Ban
          </button>
        )}

        {teacher?.name && !teacher?.isApproved && (
          <button
            disabled={isDisabled}
            onClick={() =>
              handleWithDelay(() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/approve-teacher/${teacher._id}`,
                  {
                    method: "GET",
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then(() => dispatch(getTeacherById(id)))
                  .catch((err) => console.error("API error:", err));
              })
            }
            className={`cursor-pointer px-3 py-1 rounded text-xs border-none text-dark2 dark:text-light2 transition-all ${
              isDisabled
                ? "bg-light1 dark:bg-dark1"
                : "bg-green-400 hover:bg-green-500 hover:shadow-xl"
            }`}
          >
            Approve
          </button>
        )}

        <Link
          href={`/dashboard/teachers/edit-teacher/${teacher._id}`}
          className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl text-dark2 dark:text-light2 px-3 py-1 rounded text-xs"
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
    <p className="text-dark1 dark:text-light1 text-sm font-medium">{label}</p>
    <p className="text-dark1 dark:text-light1 font-semibold">{value}</p>
  </div>
);

const StatusBadge = ({ label, active, inverse = false }) => {
  const color = inverse
    ? active
      ? "bg-red-100 text-red-600"
      : "bg-light1 dark:bg-dark1 text-light1 dark:text-dark1"
    : active
    ? "bg-green-100 text-green-600"
    : "bg-light1 dark:bg-dark1 text-light1 dark:text-dark1";

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${color}`}>
      {label}: {active ? "Yes" : "No"}
    </span>
  );
};

export default TeacherCard;
