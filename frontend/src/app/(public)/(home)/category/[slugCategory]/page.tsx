"use client";
import SkeletonCategory from "@/src/components/skeleton/SkeletonCategory";
import { AppDispatch, RootState } from "@/src/store";
import { getListStoryCategoryBySlugCategory } from "@/src/store/categoryStorySlice";
import { formatTimeVN } from "@/src/utils/formatTime";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaBook, FaEye, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const CategoryPage = () => {
  const { slugCategory } = useParams<{ slugCategory: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { listCategoryStory, loading } = useSelector(
    (state: RootState) => state.categoryStory
  );
  const router = useRouter();
  useEffect(() => {
    dispatch(getListStoryCategoryBySlugCategory({ slugCategory }));
  }, [dispatch, slugCategory]);

  console.log("listCategoryStory", listCategoryStory);
  // 1️⃣ ĐANG FETCH → skeleton
  if (loading) {
    return <SkeletonCategory />
  }

  // 2️⃣ FETCH XONG nhưng KHÔNG CÓ DATA
  if (!loading && listCategoryStory.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-center text-xl text-white font-semibold">
          Thể loại này chưa có truyện
        </h2>
      </main>
    )
  }
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section>
        <h1 className="[font-size:var(--title-text)] font-bold mb-5">
          Thể loại: {listCategoryStory[0]?.categoryId.name}
        </h1>
        <p className="text-[18px] mb-5">
          Mô tả: {listCategoryStory[0]?.categoryId.description}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[400px]">
          {listCategoryStory.map((truyen, idx) => (
            <div
              onClick={() => router.push(`/story/${truyen.storyId.slug}`)}
              key={truyen._id}
              className="bg-[var(--card-bg)] rounded-lg flex flex-col hover:bg-[var(--card-bg)]/40 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4]">
                {truyen?.storyId?.bannerImage ? (
                  <Image
                    src={truyen.storyId.bannerImage}
                    alt={truyen.storyId.title}
                    fill
                    sizes="
                            (max-width: 640px) 50vw,
                            (max-width: 768px) 33vw,
                            (max-width: 1024px) 25vw,
                            (max-width: 1280px) 20vw,
                            16vw"
                    priority={idx === 0}
                    className="object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl text-center">
                      {truyen.storyId.title}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gray-600/80 flex justify-around py-1 text-white text-xs">
                  <div className="flex gap-1 items-center">
                    <FaEye /> {truyen.storyId.viewsCount}
                  </div>
                  <div className="flex gap-1 items-center">
                    <FaHeart /> {truyen.storyId.followsCount}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-3 min-h-[70px]">
                <h4 className="text-white text-lg font-semibold text-center line-clamp-2">
                  {truyen.storyId.title}
                </h4>
                <div className="flex justify-between items-center text-white text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <FaBook /> {truyen.storyId.totalChapters}
                  </div>
                  <div>{formatTimeVN(truyen.storyId.createdAt)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
export default CategoryPage;
