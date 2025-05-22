"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const loaded = useSelector((state) => state.loaded);
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        if (isAuthenticated) {
          router.push("/dashboard", { scroll: false });
        }
        if (!isAuthenticated) {
          router.push("/auth/login", { scroll: false });
        }
      }, 1000);
    }
  }, [loaded]);
  return <></>;
}
