"use client";

import { authenticated } from "@/store/Action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Authentication = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticated());
  }, []);

  return <></>;
};

export default Authentication;
