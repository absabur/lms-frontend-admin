const BookSkeleton = () => {
  return (
    <div className="mx-auto p-6 animate-puls">
      <div className="flex flex-wrap gap-6 pl-6">
        {/* Title & Author */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="h-10 w-3/5 bg-light1 dark:bg-dark1 rounded-md mb-3"></div>{" "}
          {/* Book title */}
          <div className="h-5 w-1/4 bg-light1 dark:bg-dark1 rounded-md"></div>{" "}
          {/* Author */}
        </div>

        {/* Left side: Image carousel + thumbnails */}
        <div className="w-full lg:w-5/12 flex flex-col items-center gap-4">
          {/* Main image skeleton */}
          <div className="relative w-full max-w-md aspect-[3/4] bg-light1 dark:bg-dark1 rounded-xl shadow-inner"></div>

          {/* Thumbnail images skeleton */}
          <div className="flex gap-3 flex-wrap justify-center mt-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-light1 dark:bg-dark1 rounded-lg shadow-inner"
              />
            ))}
          </div>
        </div>

        {/* Right side: Info, buttons, details */}
        <div className="w-full lg:w-5/12 space-y-8">
          {/* Buttons: Read & Edit */}
          <div className="flex justify-between items-center gap-6">
            <div className="h-12 w-36 bg-light1 dark:bg-dark1 rounded-lg"></div>
            <div className="h-12 w-36 bg-light1 dark:bg-dark1 rounded-lg"></div>
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 gap-5 pl-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-light1 dark:bg-dark1 shadow rounded-lg p-5 flex flex-col gap-2"
              >
                <div className="h-4 w-20 bg-light1 dark:bg-dark1 rounded"></div>
                <div className="h-5 w-32 bg-light1 dark:bg-dark1 rounded"></div>
              </div>
            ))}
          </div>

          {/* Book Numbers section */}
          <div>
            <div className="h-6 w-44 bg-light1 dark:bg-dark1 rounded mb-3"></div>{" "}
            {/* Header */}
            <div className="flex flex-wrap gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 px-4 rounded-full bg-light1 dark:bg-dark1" />
              ))}
            </div>
          </div>

          {/* Created & Updated dates */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-light1 dark:bg-dark1 shadow rounded-lg p-5 flex flex-col gap-2"
              >
                <div className="h-4 w-28 bg-light1 dark:bg-dark1 rounded"></div>
                <div className="h-6 w-40 bg-light1 dark:bg-dark1 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Description section */}
        <div className="w-full mt-8">
          <div className="h-6 w-40 bg-light1 dark:bg-dark1 rounded mb-4"></div>{" "}
          {/* Description header */}
          <div className="space-y-2 max-w-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-light1 dark:bg-dark1 rounded max-w-[95%]"
                style={{ width: `${90 - i * 10}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSkeleton;
