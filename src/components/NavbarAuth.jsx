"use client";
import { logout } from "@/store/Action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarAuth() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const loaded = useSelector((state) => state.loaded);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loaded && isAuthenticated) {
      router.push("/dashboard", { scroll: false });
    }else{
      dispatch(logout())
    }
  }, [loaded, isAuthenticated]);

  return (
    <nav className="bg-red-500 text-white p-4 flex justify-center flex-wrap gap-[20px]">
      <Link href="/auth/login">login</Link>
      <Link href="/auth/signup">signup</Link>
    </nav>
  );
}
