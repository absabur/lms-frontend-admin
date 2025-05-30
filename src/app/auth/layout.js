import NavbarAuth from "@/components/NavbarAuth";

export const metadata = {
  title: "LMS | LOGIN",
  description:
    "This is a library management system that is used to manage the library.",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <NavbarAuth />
      {children}
    </div>
  );
}
