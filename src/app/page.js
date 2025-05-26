"use client";

import { authenticated } from "@/store/Action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const loaded = useSelector((state) => state.loaded);
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticated())
  }, [])
  

  useEffect(() => {
    if (loaded && auth_loaded) {
      if (isAuthenticated) {
        router.push("/dashboard", { scroll: false });
      }
      if (!isAuthenticated) {
        router.push("/auth/login", { scroll: false });
      }
    }
  }, [loaded, auth_loaded, isAuthenticated]);
  
  return <></>;
}
