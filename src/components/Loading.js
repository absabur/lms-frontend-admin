"use client";
import { useSelector } from "react-redux";

import "../css/loading.css";
import { useEffect, useState } from "react";

const Loading = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const auth_loaded = useSelector((state) => state.auth_loaded);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMessage(
        "I'm currently using free hosting, so it may take a little time for the server to start up."
      );
    }, 2000);
  }, [isLoading, auth_loaded]);

  return (
    <>
      {(isLoading || !auth_loaded) && (
        <div className="loading-overlay">
          <div className="loader">
            <div className="spinner" />
            <p>Loading...</p>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
