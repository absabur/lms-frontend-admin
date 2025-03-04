"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NavbarDash() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const loaded = useSelector((state) => state.loaded);
  const router = useRouter();

  useEffect(() => {
    if (loaded && !isAuthenticated) {
      router.push("/auth/login", { scroll: false });
    }
  }, [loaded]);

  return (
    <nav className="bg-red-500 text-white p-4 flex justify-center flex-wrap gap-[20px]">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/books">Books</Link>
      <Link href="/dashboard/users">Users</Link>
      <Link href="/dashboard/borrow">Borrow</Link>
    </nav>
  );
}
