"use client";
import { CLEAR_MESSAGE } from "@/store/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
    const message = useSelector((state) => state.message)
    const dispatch = useDispatch()
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
      })
    }
  }, [message]);

  return <ToastContainer />;
};

export default Toast;
