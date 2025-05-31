"use client";
import StudentLibraryCard from "@/components/StudentCard";
import { getStudentById } from "@/store/Action";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StudentCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentDetails);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleWithDelay = (callback) => {
    if (isDisabled) return;
    setIsDisabled(true);
    callback();
    setTimeout(() => setIsDisabled(false), 5000);
  };

  useEffect(() => {
    if (id) {
      dispatch(getStudentById(id));
    }
  }, [id]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-bgl1 dark:bg-bgd1 border dark:border-bord shadow-md rounded-2xl p-6 space-y-4">
      {student?._id && <StudentLibraryCard student={student} />}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <img
          src={student?.avatar?.url}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover mx-auto md:mx-0"
        />

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-bgd1 dark:text-bgl1">
            {student?.name}
          </h2>
          <p className="text-sm text-bgd1 dark:text-bgl1">
            {student?.department?.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Email" value={student?.email} />
        <Info label="Phone" value={student?.phone} />
        <Info label="Bangla Name" value={student?.banglaName || "N/A"} />
        <Info label="Fathers name" value={student?.fathersName || "N/A"} />
        <Info label="Mothers Name" value={student?.mothersName || "N/A"} />
        <Info label="addmissionRoll" value={student?.addmissionRoll || "N/A"} />
        <Info label="boardRoll" value={student?.boardRoll || "N/A"} />
        <Info label="registration" value={student?.registration || "N/A"} />
        <Info label="department" value={student?.department?.name || "N/A"} />
        <Info label="session" value={student?.session?.name || "N/A"} />
        <Info label="shift" value={student?.shift?.name || "N/A"} />
        <Info label="district" value={student?.district?.name || "N/A"} />
        <Info label="upazila" value={student?.upazila?.name || "N/A"} />
        <Info label="union" value={student?.union || "N/A"} />
        <Info label="village" value={student?.village || "N/A"} />
        <Info label="address" value={student?.address || "N/A"} />
      </div>

      <div className="flex gap-4 flex-wrap">
        <StatusBadge label="Approved" active={student?.isApproved} />
        <StatusBadge label="Banned" active={student?.isBan} inverse />
      </div>

      <div className="text-xs text-bgd1 dark:text-bgl1">
        <p>Created: {student?.createDate?.date || "N/A"}</p>
        <p>Updated: {student?.updateDate?.date || "N/A"}</p>
      </div>
      <div className="flex gap-3">
        {student?._id && student?.isBan ? (
          <button
            disabled={isDisabled}
            onClick={() =>
              handleWithDelay(() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/unban-student/${student._id}`,
                  {
                    method: "GET",
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then(() => dispatch(getStudentById(id)))
                  .catch((err) => console.error("API error:", err));
              })
            }
            className={`cursor-pointer px-3 py-1 rounded text-xs border-none text-bgd2 dark:text-bgl2 transition-all ${
              isDisabled
                ? "bg-bgl1 dark:bg-bgd1"
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
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/ban-student/${student._id}`,
                  {
                    method: "GET",
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then(() => dispatch(getStudentById(id)))
                  .catch((err) => console.error("API error:", err));
              })
            }
            className={`cursor-pointer px-3 py-1 rounded text-xs border-none text-bgd2 dark:text-bgl2 transition-all ${
              isDisabled
                ? "bg-bgl1 dark:bg-bgd1"
                : "bg-red-400 hover:bg-button2 dark:bg-button4 hover:shadow-xl"
            }`}
          >
            Ban
          </button>
        )}

        {student?._id && !student?.isApproved && (
          <button
            disabled={isDisabled}
            onClick={() =>
              handleWithDelay(() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/approve-student/${student._id}`,
                  {
                    method: "GET",
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then(() => dispatch(getStudentById(id)))
                  .catch((err) => console.error("API error:", err));
              })
            }
            className={`cursor-pointer px-3 py-1 rounded text-xs border-none text-bgd2 dark:text-bgl2 transition-all ${
              isDisabled
                ? "bg-bgl1 dark:bg-bgd1"
                : "bg-green-400 hover:bg-green-500 hover:shadow-xl"
            }`}
          >
            Approve
          </button>
        )}

        <Link
          href={`/dashboard/students/edit-student/${student._id}`}
          className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-xl text-bgd2 dark:text-bgl2 px-3 py-1 rounded text-xs"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-bgd1 dark:text-bgl1 text-sm font-medium">{label}</p>
    <p className="text-bgd1 dark:text-bgl1 font-semibold">{value}</p>
  </div>
);

const StatusBadge = ({ label, active, inverse = false }) => {
  const color = inverse
    ? active
      ? "bg-red-100 text-red-600"
      : "bg-bgl1 dark:bg-bgd1 text-bgl1 dark:text-bgd1"
    : active
    ? "bg-green-100 text-green-600"
    : "bg-bgl1 dark:bg-bgd1 text-bgl1 dark:text-bgd1";

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${color}`}>
      {label}: {active ? "Yes" : "No"}
    </span>
  );
};

export default StudentCard;
