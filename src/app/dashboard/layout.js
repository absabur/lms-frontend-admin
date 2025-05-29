import NavbarDash from "@/components/NavbarDash";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Library Management System",
  description: "Manage books, users, and borrow history.",
};

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-light2 dark:bg-dark2 text-dark1 dark:text-light1">
      <NavbarDash />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <main className="p-4 md:p-8 flex-1 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
