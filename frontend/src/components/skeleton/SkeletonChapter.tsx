const SkeletonChapter = () => {
  return (
    <main className="relative">
      <nav className="flex px-5 pb-5 pt-1 gap-2 max-w-6xl mx-auto">
        <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-40 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
      </nav>

      <section>
        <div className="min-h-screen max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <div className="h-8 w-2/3 bg-gray-700 rounded animate-pulse" />
            <div className="h-8 w-1/2 bg-gray-700 rounded animate-pulse" />

            <div className="flex gap-5 mt-5">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-20 bg-gray-700 rounded-xl animate-pulse"
                  />
                ))}
            </div>

            <div className="w-full px-10 pt-10 space-y-3">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-full bg-gray-700 rounded animate-pulse"
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

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

export default SkeletonChapter;
