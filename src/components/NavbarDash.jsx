"use client";
import { logout } from "@/store/Action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarDash() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const loaded = useSelector((state) => state.loaded);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (loaded && !isAuthenticated) {
        router.push("/auth/login", { scroll: false });
      }
    }, 1000);
  }, [loaded]);

  return (
    <nav className="h-20 bg-red-500 text-white flex justify-around items-center flex-wrap gap-[20px]">
      <div className="bg-red-500 text-white flex justify-center flex-wrap gap-[20px]">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          <Link href="/dashboard">BPI-LMS</Link>
        </h1>
      </div>
      <div className="bg-red-500 text-white flex justify-center flex-wrap gap-[20px]">
        <button
          onClick={() => dispatch(logout())}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
