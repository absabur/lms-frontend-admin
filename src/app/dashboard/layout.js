import NavbarDash from "@/components/NavbarDash";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Libraty Management system",
  description:
    "This is a library management system that is used to manage the library.",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <NavbarDash />
      <div className="flex">
        <div className="flex flex-col w-[10%] bg-gray-800 text-white p-4">
          <Sidebar />
        </div>
        <main className="w-[90%] p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
