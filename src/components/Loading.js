"use client";
import { useSelector } from "react-redux";

import "@/css/loading.css";

const Loading = ({ manualLoading = false }) => {
  const isLoading = useSelector((state) => state.isLoading);
  
  return (
    <>
      {isLoading ||
        (manualLoading && (
          <div className="loading-overlay">
            <div className="loader">
              <div className="spinner" />
              <p>Loading...</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default Loading;
