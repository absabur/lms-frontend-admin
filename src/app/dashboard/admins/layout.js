"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE } from "@/store/Constant";

export default function RootLayout({ children }) {
  const profile = useSelector((state) => state.profile);
  const loaded = useSelector((state) => state.loaded);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        if (profile._id && !profile.isSuperAdmin) {
          dispatch({
            type: MESSAGE,
            payload: {
              message: "You don't have access for this page",
              status: "error",
              path: "/dashboard",
            },
          });
        }
      }, 1000);
    }
  }, [loaded, profile]);

  return <>{profile.isSuperAdmin && children}</>;
}
