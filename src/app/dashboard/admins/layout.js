"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE } from "@/store/Constant";

export default function RootLayout({ children }) {
  const profile = useSelector((state) => state.profile);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const loaded = useSelector((state) => state.loaded);
  const dispatch = useDispatch();
  useEffect(() => {
    if (profile._id && !profile.isSuperAdmin && auth_loaded && loaded) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: "",
          status: "",
          path: "/dashboard",
        },
      });
    }
  }, [loaded, profile]);

  return <>{profile.isSuperAdmin && children}</>;
}
