"use client";
import { authenticated } from "@/store/Action";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarDash() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const profile = useSelector((state) => state.profile);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const loaded = useSelector((state) => state.loaded);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(authenticated());
  }, [pathname]);

  useEffect(() => {
    if (!isAuthenticated && auth_loaded && loaded) {
      router.push("/auth/login", { scroll: false });
    }
  }, [auth_loaded, isAuthenticated, loaded]);

  return (
    <nav className="bg-blue-500 text-white flex justify-around items-center flex-wrap gap-[20px] p-2">
      <div className="text-white flex justify-center flex-wrap gap-[20px]">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          <Link href="/dashboard">BPI-LMS</Link>
        </h1>
      </div>
      <div className="text-white flex justify-center flex-wrap gap-[20px]">
        <Link href={`/dashboard/profile`}>
          <img
            src={profile?.avatar?.url}
            alt="Avatar"
            className="w-10 h-10 rounded-full border object-cover mx-auto md:mx-0"
          />
        </Link>
      </div>
    </nav>
  );
}
