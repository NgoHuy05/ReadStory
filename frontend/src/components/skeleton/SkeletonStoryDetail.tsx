const SkeletonStoryDetail = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-5">
      <div className="h-5 w-1/3 bg-gray-700 animate-pulse rounded"></div>

      <div className="grid grid-cols-1 sm:grid-cols-[45%_50%] md:grid-cols-[35%_60%] lg:grid-cols-[25%_70%] gap-5 min-h-[800px]">
        <div className="flex flex-col gap-4 px-4">
          <div className="relative w-full aspect-[3/4] bg-gray-700 animate-pulse rounded overflow-hidden"></div>

          <div className="flex justify-around gap-4">
            <div className="flex flex-col items-center gap-2 w-24 h-20 bg-gray-700 animate-pulse rounded-xl"></div>
            <div className="flex flex-col items-center gap-2 w-24 h-20 bg-gray-700 animate-pulse rounded-xl"></div>
          </div>

          <div className="flex gap-2">
            <div className="h-10 flex-1 bg-gray-700 animate-pulse rounded-xl"></div>
            <div className="h-10 flex-1 bg-gray-700 animate-pulse rounded-xl"></div>
          </div>

          <div className="h-10 bg-gray-700 animate-pulse rounded-xl"></div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="h-20 bg-gray-700 animate-pulse rounded-xl"></div>
          <div className="h-28 bg-gray-700 animate-pulse rounded-xl"></div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <div className="h-6 w-1/3 bg-gray-700 animate-pulse rounded"></div>
              <div className="h-px flex-1 bg-gray-700"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 w-full bg-gray-700 p-2 rounded-xl animate-pulse"
                  >
                    <div className="h-12 w-12 bg-gray-500 rounded-xl"></div>
                    <div className="flex flex-col flex-1 gap-2">
                      <div className="h-4 w-1/2 bg-gray-500 rounded"></div>
                      <div className="h-3 w-1/3 bg-gray-500 rounded"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

       <div className="bg-[var(--card-bg)] max-w-7xl mx-auto px-4 py-4 rounded-xl mt-10">
        <div className="flex flex-col gap-4">
          <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />

          <div className="h-[100px] w-full bg-gray-700 rounded-2xl animate-pulse" />

          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-12 w-12 bg-gray-600 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/4 bg-gray-600 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-600 rounded animate-pulse" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default SkeletonStoryDetail;
