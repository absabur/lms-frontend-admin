"use client";

import { authenticated } from "@/store/Action";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Authentication = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authenticated());
  }, [pathname]);

  return <></>;
};

export default Authentication;
