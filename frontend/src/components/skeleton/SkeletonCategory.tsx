const SkeletonCategory = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            <div className="h-8 w-1/6 bg-gray-700 rounded animate-pulse" />
            <div className="h-8 w-1/3 bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[400px]">
          {Array(12)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-800 animate-pulse h-[325px] w-full rounded-lg"
              />
            ))}
        </div>

      
    </main>
  );
};

export default SkeletonCategory;
