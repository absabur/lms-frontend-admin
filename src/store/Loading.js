"use client";
import { useSelector } from "react-redux";

import "@/css/loading.css"

const Loading = () => {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <>
      {isLoading && (
        <div className="loading">
          <p>loading...</p>
        </div>
      )}
    </>
  );
};

export default Loading;
