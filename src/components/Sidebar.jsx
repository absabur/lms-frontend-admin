import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard"
            className="text-white text-lg hover:bg-blue-600 p-2 rounded-lg block"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/books"
            className="text-white text-lg hover:bg-blue-600 p-2 rounded-lg block"
          >
            Manage Books
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/users"
            className="text-white text-lg hover:bg-blue-600 p-2 rounded-lg block"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/borrow"
            className="text-white text-lg hover:bg-blue-600 p-2 rounded-lg block"
          >
            Lended Books
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
