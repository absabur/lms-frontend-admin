"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const profile = useSelector((state) => state.profile);
  const pathname = usePathname();

  useEffect(() => {
    if (profile && profile.isSuperAdmin) {
      setLinks([
        { href: "/dashboard", label: "Dashboard" },
        { href: "/dashboard/borrow", label: "Lended Books" },
        { href: "/dashboard/books", label: "Manage Books" },
        { href: "/dashboard/teachers", label: "Teachers" },
        { href: "/dashboard/students", label: "Students" },
        { href: "/dashboard/admins", label: "Admins" },
        { href: "/dashboard/form-values", label: "Form Values" },
      ]);
    } else {
      setLinks([
        { href: "/dashboard", label: "Dashboard" },
        { href: "/dashboard/borrow", label: "Lended Books" },
        { href: "/dashboard/books", label: "Manage Books" },
        { href: "/dashboard/teachers", label: "Teachers" },
        { href: "/dashboard/students", label: "Students" },
        { href: "/dashboard/form-values", label: "Form Values" },
      ]);
    }
  }, [profile]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center text-white w-full">
        <button onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-[200px] bg-gray-800 text-white p-4`}
      >
        <ul className="space-y-4">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block text-white text-center text-lg p-2 rounded-lg shadow-[0_0_5px_rgba(200,100,100,0.3)] transition-colors ${
                    isActive
                      ? "bg-blue-700 hover:bg-blue-800"
                      : "hover:bg-blue-600"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
