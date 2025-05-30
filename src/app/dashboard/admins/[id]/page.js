"use client";
import { getAdminById } from "@/store/Action";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminDetails);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (id) {
      dispatch(getAdminById(id));
    }
  }, [id]);
  return (
    <div className="w-full max-w-3xl mx-auto bg-bgl1 dark:bg-bgd1 shadow-md rounded-2xl p-6 space-y-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Avatar */}
        <img
          src={admin?.avatar?.url}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover mx-auto md:mx-0"
        />

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-bgd1 dark:text-bgl1">{admin?.name}</h2>
          <p className="text-sm text-bgd1 dark:text-bgl1">{admin?.department?.name}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Email" value={admin?.email} />
        <Info label="Phone" value={admin?.phone} />
        <Info label="NID" value={admin?.nId || "N/A"} />
      </div>

      {/* Status Tags */}
      <div className="flex gap-4 flex-wrap">
        <StatusBadge label="Approved" active={admin?.isApproved} />
        <StatusBadge label="Banned" active={admin?.isBan} inverse />
      </div>

      {/* Metadata */}
      <div className="text-xs text-bgd1 dark:text-bgl1">
        <p>Created: {admin?.createDate?.date || "N/A"}</p>
        <p>Updated: {admin?.updateDate?.date || "N/A"}</p>
      </div>
      {String(profile._id) != String(admin._id) && (
        <div className="flex gap-3">
          {admin?.name && admin?.isBan ? (
            <button
              onClick={() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/unban-admin/${admin._id}`,
                  {
                    method: "GET", // or "PUT"/"POST" depending on your API
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then((data) => dispatch(getAdminById(id)))
                  .catch((err) => console.error("API error:", err));
              }}
              className="cursor-pointer bg-green-400 hover:bg-green-500 hover:shadow-xl text-bgd2 dark:text-bgl2 px-3 py-1 rounded text-xs border-none"
            >
              Unban
            </button>
          ) : (
            <button
              onClick={() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/ban-admin/${admin._id}`,
                  {
                    method: "GET", // or "PUT"/"POST" depending on your API
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then((data) => dispatch(getAdminById(id)))
                  .catch((err) => console.error("API error:", err));
              }}
              className="cursor-pointer bg-red-400 hover:bg-button2 dark:bg-button4 hover:shadow-xl text-bgd2 dark:text-bgl2 px-3 py-1 rounded text-xs border-none"
            >
              Ban
            </button>
          )}
          {admin?.name && !admin?.isApproved && (
            <button
              onClick={() => {
                fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/approve-admin/${admin._id}`,
                  {
                    method: "GET", // or "PUT"/"POST" depending on your API
                    credentials: "include",
                  }
                )
                  .then((res) => res.json())
                  .then((data) => dispatch(getAdminById(id)))
                  .catch((err) => console.error("API error:", err));
              }}
              className="cursor-pointer bg-green-400 hover:bg-green-500 hover:shadow-xl text-bgd2 dark:text-bgl2 px-3 py-1 rounded text-xs border-none"
            >
              Approved
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Helper Components
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

export default AdminCard;
