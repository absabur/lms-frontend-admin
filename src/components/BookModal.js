import React from "react";

export default function BookModal({ images, isOpen, setIsOpen }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={() => setIsOpen(false)} // Close modal on overlay click
    >
      <div
        className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close button top right */}
        <div className="sticky top-0 flex justify-end z-10 mb-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="space-y-6">
          {images.length === 0 ? (
            <p className="text-center text-gray-500">No images available.</p>
          ) : (
            images.map((file, index) => {
              return (
                <img
                  key={index}
                  src={file.url}
                  alt={`Page ${index + 1}`}
                  className="w-full rounded-md shadow-md"
                  onLoad={(e) => {
                    if (typeof file !== "string")
                      URL.revokeObjectURL(e.target.src);
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
