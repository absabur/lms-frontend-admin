"use client";
import { CLEAR_MESSAGE, CLEAR_PATH } from "@/store/Constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const message = useSelector((state) => state.message);
  const path = useSelector((state) => state.path);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (message?.status) {
      toast[message?.status](message?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }
    if (path) {
      let pushto = path;
      dispatch({ type: CLEAR_PATH });
      router.push(pushto, { scroll: false });
    }
  }, [message, path]);

  return <ToastContainer />;
};

export default Toast;
