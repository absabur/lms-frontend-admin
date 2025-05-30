"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAdmins } from "@/store/Action";
import AdminFilterForm from "@/components/AdminFilter";

const AllAdminsPage = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const router = useRouter();

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("adminFilters");
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      dispatch(getAdmins(parsedFilters));
    } else {
      dispatch(getAdmins());
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-bgd1 dark:text-bgl1 text-center md:text-left">
          All Admins
        </h1>
      </div>

      <AdminFilterForm />
      {/* Add optional AdminsFilterForm component here if needed */}

      <div className="overflow-x-auto bg-bgl1 dark:bg-bgd1 rounded-lg shadow-lg">
        <table className="min-w-full table-auto w-full text-sm text-left text-bgd1 dark:text-bgl1">
          <thead className="bg-button1 dark:bg-button3 text-bgl2 dark:text-bgd2 sticky top-0 z-10">
            <tr>
              {[
                "#",
                "Name",
                "Image",
                "Email",
                "Phone",
                "Approved",
                "Banned",
                "Created At",
                "Updated At",
              ].map((head, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2 border border-blue-600 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {admins?.admins?.map((admin, index) => (
              <tr
                key={index}
                onClick={() => router.push(`/dashboard/admins/${admin._id}`)}
                className="odd:bg-bgl2 even:bg-bgl1 dark:bg-bgd1 hover:bg-blue-100 border-t border-black-200 cursor-pointer"
              >
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{admin.name}</td>
                <td className="px-3 py-2">
                  <img
                    src={admin?.avatar?.url}
                    className="w-12 h-12 object-cover rounded-full border border-borl dark:border-bord"
                  />
                </td>
                <td className="px-3 py-2">{admin.email}</td>
                <td className="px-3 py-2">{admin.phone}</td>
                <td className="px-3 py-2">{admin.isApproved ? "Yes" : "No"}</td>
                <td className="px-3 py-2">{admin.isBan ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  {admin.createDate?.date} {admin.createDate?.formatedTime}
                </td>
                <td className="px-3 py-2">
                  {admin.updateDate?.date} {admin.updateDate?.formatedTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdminsPage;
