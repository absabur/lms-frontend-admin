"use client";
import { authenticated } from "@/store/Action";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

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
    <nav className="sticky top-0 z-[30] lg:z-[50] bg-bgl1 dark:bg-bgd1 text-bgd2 dark:text-bgl2 px-4 py-3 shadow shadow-shadl dark:shadow-shadd flex justify-between items-center">
      <div className="text-bgl2 dark:text-bgd2 flex justify-center flex-wrap gap-[20px]">
        <h1 className="text-3xl font-semibold text-bgd1 dark:text-bgl1 text-center">
          <Link href="/dashboard">BPI-LMS</Link>
        </h1>
      </div>
      <div className="flex justify-center items-center gap-8">
        <ThemeToggle />
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
