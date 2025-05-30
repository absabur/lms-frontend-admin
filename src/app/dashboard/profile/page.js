"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state) => state.profile);

  useEffect(() => {}, []);
  return (
    <div className="border dark:border-bord relative w-full max-w-3xl mx-auto bg-bgl1 dark:bg-bgd1 shadow-md rounded-2xl p-6 space-y-4">
      {/* Top Section */}
      <Link
        href="/dashboard/profile/edit-profile"
        className="absolute top-[20px] right-[20px] text-textd bg-buttona hover:bg-buttonw hover:shadow-xl text-bgd2 dark:text-bgl2 px-3 py-1 rounded text-xs"
      >
        Edit
      </Link>
      <Link
        href="/dashboard/profile/change-password"
        className="absolute top-[40px] right-[20px] text-textd bg-buttona hover:bg-buttonw hover:shadow-xl text-bgd2 dark:text-bgl2 px-3 py-1 rounded text-xs"
      >
        Change Password
      </Link>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Avatar */}
        <img
          src={profile?.avatar?.url}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover mx-auto md:mx-0"
        />

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-bgd1 dark:text-bgl1">{profile?.name}</h2>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Email" value={profile?.email} />
        <Info label="Phone" value={profile?.phone} />
        <Info label="NID" value={profile?.nId || "N/A"} />
      </div>

      {/* Status Tags */}
      <div className="flex gap-4 flex-wrap">
        <StatusBadge label="Approved" active={profile?.isApproved} />
        <StatusBadge label="Banned" active={profile?.isBan} inverse />
      </div>

      {/* Metadata */}
      <div className="text-xs text-bgd1 dark:text-bgl1">
        <p>Created: {profile?.createDate?.date || "N/A"}</p>
        <p>Updated: {profile?.updateDate?.date || "N/A"}</p>
      </div>
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

export default Profile;
