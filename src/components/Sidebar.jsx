"use client";
import {
  Menu,
  X,
  LayoutDashboard,
  Book,
  Users,
  User,
  FileText,
  ClipboardList,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/Action";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [links, setLinks] = useState([]);
  const profile = useSelector((state) => state.profile);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    setLinks([
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      {
        href: "/dashboard/teacher-borrows",
        label: "Teacher Borrows",
        icon: ClipboardList,
      },
      {
        href: "/dashboard/student-borrows",
        label: "Student Borrows",
        icon: ClipboardList,
      },
      { href: "/dashboard/books", label: "Manage Books", icon: Book },
      { href: "/dashboard/teachers", label: "Teachers", icon: User },
      { href: "/dashboard/students", label: "Students", icon: User },
      ...(profile?.isSuperAdmin
        ? [{ href: "/dashboard/admins", label: "Admins", icon: ShieldCheck }]
        : []),
      { href: "/dashboard/form-values", label: "Form Values", icon: FileText },
    ]);
  }, [profile]);

  const confirmLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-bgl1 dark:bg-bgd1 p-4 flex justify-between items-center text-bgd2 dark:text-bgl2 w-full">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="border-none"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } bg-bgl2 shadow shadow-shadl dark:shadow-shadd x-10 md:block w-full border-b md:border-none md:w-[300px] bg-transparent text-textl dark:text-textd p-4 min-w-[300px]`}
      >
        <ul className="space-y-2 pt-4">
          {links.map(({ href, label, icon: Icon }) => {
            let isActive =
              href == "/dashboard" ? href == pathname : pathname.includes(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`bg-bgl1 dark:bg-bgd1 shadow shadow-shadl dark:shadow-shadd hover:bg-buttons dark:hover:bg-buttons hover:text-textd flex items-center gap-3 text-lg p-2 rounded-lg ${
                    isActive
                      ? "bg-buttonp text-textd dark:bg-buttonp dark:text-textd"
                      : ""
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-bgl1 dark:bg-bgd1 shadow shadow-shadl dark:shadow-shadd hover:bg-buttons dark:hover:bg-buttons hover:text-textd flex items-center gap-3 w-full border-none text-lg p-2 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bgl2 dark:bg-bgd2 bg-opacity-20">
          <div className="bg-bgl1 dark:bg-bgd1  border border-borl dark:border-bord rounded-lg p-6 shadow-lg w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-sm text-bgd1 dark:text-bgl1">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-buttonw text-textd px-4 py-2 rounded hover:bg-buttona"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-bgd1 dark:bg-bgl1 text-bgl2 dark:text-bgd2 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
