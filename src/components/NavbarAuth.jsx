"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NavbarAuth() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const loaded = useSelector((state) => state.loaded);
  const router = useRouter();

  useEffect(() => {
    if (loaded && isAuthenticated) {
      router.push("/dashboard", { scroll: false });
    }
  }, [loaded, isAuthenticated]);

  return <></>;
}
