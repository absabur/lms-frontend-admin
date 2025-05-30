import React from "react";

export default function BookModal({ images, isOpen, setIsOpen }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-[-25px] left-0 inset-0 bg-bgd1 dark:bg-bgl1 bg-opacity-70 flex items-center justify-center z-50"
      onClick={() => setIsOpen(false)} // Close modal on overlay click
    >
      <div
        className="bg-bgl1 dark:bg-bgd1 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close button top right */}
        <div className="sticky top-0 flex justify-end z-10 mb-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-3 text-2xl font-bold text-bgd1 dark:text-bgl1 hover:text-bgd1 dark:text-bgl1"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="space-y-6">
          {images.length === 0 ? (
            <p className="text-center text-bgd1 dark:text-bgl1">No images available.</p>
          ) : (
            images.map((file, index) => {
              return (
                <img
                  key={index}
                  src={file.url}
                  alt={`Page ${index + 1}`}
                  className="w-full rounded-md shadow-md"
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
