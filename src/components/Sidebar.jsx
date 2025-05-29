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

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center text-black w-full">
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
        } md:block w-full border-b md:border-none md:w-[300px] bg-white text-black p-4 min-w-[300px]`}
      >
        <ul className="space-y-2">
          {links.map(({ href, label, icon: Icon }) => {
            let isActive =
              href == "/dashboard" ? href == pathname : pathname.includes(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`shadow flex items-center gap-3 text-black text-lg p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-700 hover:bg-red-800 hover:text-white text-white"
                      : "hover:bg-red-500 hover:text-white"
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
              onClick={() => dispatch(logout())}
              className="shadow flex items-center gap-3 w-full border-none text-black hover:bg-red-500 hover:text-white text-lg p-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}
