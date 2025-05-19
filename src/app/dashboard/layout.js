import NavbarDash from "@/components/NavbarDash";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Library Management System",
  description: "Manage books, users, and borrow history.",
};

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDash />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
