"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookBySlug } from "@/store/Action";
import Link from "next/link";
import BookModal from "@/components/BookModal";

const BookDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.singleBook);
  const [modal, setModal] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = book?.images || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (slug) {
      dispatch(getBookBySlug(slug));
    }
  }, [slug]);

  if (!book?._id) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Book Info */}
        <div className="space-y-6">
          {/* Title */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {book.bookName}
              </h1>
              <p className="text-sm text-gray-500">by {book.bookAuthor}</p>
            </div>
            <Link
              href={`/dashboard/books/edit-book/${book.slug}`}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
            >
              Edit Book
            </Link>
          </div>
          <h2 className="mb-6">
            <button
              onClick={() => setModal(true)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              Read This Book
            </button>
          </h2>

          <BookModal images={book.images} isOpen={modal} setIsOpen={setModal} />
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Description
            </h2>
            <p className="text-gray-600">{book.description}</p>
          </div>

          {/* Detail Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailItem label="Edition" value={book.edition} />
            <DetailItem label="Publisher" value={book.publisher} />
            <DetailItem label="Shelf" value={book.shelf?.name} />
            <DetailItem label="Quantity" value={book.quantity} />
            <DetailItem label="MRP" value={`৳${book.mrp}`} />
            <DetailItem label="Pages" value={book.numberOfPages} />
            <DetailItem label="Language" value={book.language?.name} />
            <DetailItem label="Country" value={book?.country?.name} />
          </div>

          {/* Book Numbers */}
          {book.bookNumbers?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                Book Numbers
              </h2>
              <div className="flex flex-wrap gap-2">
                {book.bookNumbers.map((num, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Created & Updated Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailItem
              label="Created On"
              value={`${book.createDate?.date}, ${book.createDate?.formatedTime}`}
            />
            <DetailItem
              label="Updated On"
              value={`${book.updateDate?.date}, ${book.updateDate?.formatedTime}`}
            />
          </div>
        </div>

        {/* Right: Book Image */}
        <div className="flex justify-center items-center flex-col gap-3">
          {book.images?.[0]?.url ? (
            <div className="relative w-full max-w-md mx-auto aspect-[3/5]">
              <img
                src={images[currentIndex]?.url}
                alt={`Book image ${currentIndex + 1}`}
                className="absolute top-0 left-0 w-full h-full object-contain rounded-xl shadow-xl"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60"
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60"
              >
                ›
              </button>
            </div>
          ) : (
            <div className="w-full max-w-md h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
              No Image Available
            </div>
          )}
          {images.length > 1 && (
            <div className="flex gap-2 flex-wrap justify-center">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  className={`w-16 h-16 object-cover rounded border ${
                    i === currentIndex
                      ? "border-blue-500"
                      : "border-transparent"
                  } cursor-pointer`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

export default BookDetails;
