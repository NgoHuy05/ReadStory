const SkeletonHome = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section>
        <h3 className="[font-size:var(--title-text)] font-bold mb-5">
          Truyện Hot
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[400px]">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-800 animate-pulse h-[325px] w-full rounded-lg"
              />
            ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h3 className="[font-size:var(--title-text)] font-bold">
          Truyện mới cập nhật
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[400px]">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-800 animate-pulse h-[325px] w-full rounded-lg"
              />
            ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h3 className="[font-size:var(--title-text)] font-bold">
          Truyện đề xuất
        </h3>
        <div className="flex flex-col gap-4 min-h-[400px]">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-800 animate-pulse h-[266px] w-full rounded-lg"
              />
            ))}
        </div>
      </section>
    </main>
  );
};

export default SkeletonHome;
