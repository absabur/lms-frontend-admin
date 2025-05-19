"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/books", label: "Manage Books" },
    { href: "/dashboard/users", label: "Users" },
    { href: "/dashboard/borrow", label: "Lended Books" },
  ];

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
