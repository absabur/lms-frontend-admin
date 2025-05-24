"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NavbarAuth() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const router = useRouter();

  useEffect(() => {
    if (auth_loaded) {
      setTimeout(() => {
        if (isAuthenticated) {
          router.push("/dashboard", { scroll: false });
        }
      }, 1000);
    }
  }, [auth_loaded]);

  return <></>;
}
