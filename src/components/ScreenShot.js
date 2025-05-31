"use client";

import { toPng } from "html-to-image";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";

const ScreenshotButton = ({ targetId, year }) => {
  const [loading, setLoading] = useState(false);
  const takeScreenshot = () => {
    setLoading(true);
    const node = document.getElementById(targetId);
    node.style.overflow = "visible";

    toPng(node, {
      cacheBust: true,
      pixelRatio: 4, // 2–4 recommended for high quality
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${year}.png`;
        link.click();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error taking screenshot:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 flex items-center justify-center gap-2"
        onClick={takeScreenshot}
      >
        <FaDownload /> Image
      </button>
      {loading && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "20",
            top: 0,
            left: 0,
          }}
        >
          <h1 style={{ fontSize: "35px", color: "white" }}>
            Preparing Image...
          </h1>
        </div>
      )}
    </>
  );
};

export default ScreenshotButton;
