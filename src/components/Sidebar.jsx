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
      <div className="md:hidden bg-light1 dark:bg-dark1 p-4 flex justify-between items-center text-dark2 dark:text-light2 w-full">
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
        } shadow shadow-dshadow dark:shadow-lshadow x-10 md:block w-full border-b md:border-none md:w-[300px] bg-transparent text-dark2 dark:text-light2 p-4 min-w-[300px]`}
      >
        <ul className="space-y-2 pt-4">
          {links.map(({ href, label, icon: Icon }) => {
            let isActive =
              href == "/dashboard" ? href == pathname : pathname.includes(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`shadow shadow-dshadow dark:shadow-lshadow flex items-center gap-3 text-dark2 dark:text-light2 text-lg p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-light1 dark:bg-dark1 hover:bg-button4 hover:text-light1 text-dark2 dark:text-light2 dark:hover:bg-button2"
                      : "shadow shadow-dshadow dark:shadow-lshadow flex items-center gap-3 w-full border-none bg-light2 dark:bg-dark2 hover:bg-button4 hover:text-light1 dark:hover:bg-button2 dark:hover:text-light1 dark:text-dark1 text-dark1 dark:text-light1 text-lg p-2 rounded-lg transition-colors"
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
              className="shadow shadow-dshadow dark:shadow-lshadow flex items-center gap-3 w-full border-none bg-light2 dark:bg-dark2 hover:bg-button4 hover:text-light1  dark:hover:bg-button2 dark:hover:text-light1 dark:text-dark1 text-dark1 dark:text-light1 text-lg p-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark1 dark:bg-light1 bg-opacity-50">
          <div className="bg-light1 dark:bg-dark1 rounded-lg p-6 shadow-lg w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-sm text-dark1 dark:text-light1">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-button2 dark:bg-button4 text-light2 dark:text-dark2 px-4 py-2 rounded hover:bg-button2 dark:bg-button4"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-light1 dark:bg-dark1 text-dark2 dark:text-light2 px-4 py-2 rounded hover:bg-light1 dark:bg-dark1"
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
