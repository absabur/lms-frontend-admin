"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookBySlug } from "@/store/Action";

const BookDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.singleBook);

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
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{book.bookName}</h1>
            <p className="text-sm text-gray-500">by {book.bookAuthor}</p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Description</h2>
            <p className="text-gray-600">{book.description}</p>
          </div>

          {/* Detail Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailItem label="Edition" value={book.edition} />
            <DetailItem label="Publisher" value={book.publisher} />
            <DetailItem label="Shelf" value={book.shelf} />
            <DetailItem label="Quantity" value={book.quantity} />
            <DetailItem label="MRP" value={`৳${book.mrp}`} />
            <DetailItem label="Pages" value={book.numberOfPages} />
            <DetailItem label="Language" value={book.language} />
            <DetailItem label="Country" value={book.country} />
          </div>

          {/* Book Numbers */}
          {book.bookNumbers?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Book Numbers</h2>
              <div className="flex flex-wrap gap-2">
                {book.bookNumbers.map((num, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Created & Updated Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailItem label="Created On" value={`${book.createDate?.date}, ${book.createDate?.formatedTime}`} />
            <DetailItem label="Updated On" value={`${book.updateDate?.date}, ${book.updateDate?.formatedTime}`} />
          </div>
        </div>

        {/* Right: Book Image */}
        <div className="flex justify-center items-start">
          {book.images?.[0]?.url ? (
            <img
              src={book.images[0].url}
              alt="Book Cover"
              className="w-full h-auto max-w-md rounded-xl shadow"
            />
          ) : (
            <div className="w-full max-w-md h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
              No Image Available
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
