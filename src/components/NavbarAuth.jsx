"use client";

import { authenticated } from "@/store/Action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarAuth() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const loaded = useSelector((state) => state.loaded);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticated())
  }, []);
  
  useEffect(() => {
    if (isAuthenticated && auth_loaded && loaded) {
      router.push("/dashboard", { scroll: false });
    }
  }, [auth_loaded, isAuthenticated, loaded]);

  return <></>;
}
