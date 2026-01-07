"use client";

import SkeletonHome from "@/src/components/skeleton/SkeletonHome";
import { AppDispatch, RootState } from "@/src/store";
import {
  getListStoryHot,
  getListStoryNew,
  getListStoryRecommend,
} from "@/src/store/storySlice";
import { formatTimeVN } from "@/src/utils/formatTime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaEye, FaHeart, FaBook } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { listStoryHot, listStoryNew, listStoryRecommend } = useSelector(
    (state: RootState) => state.story
  );

  useEffect(() => {
    dispatch(getListStoryHot());
    dispatch(getListStoryNew());
    dispatch(getListStoryRecommend());
  }, [dispatch]);

  if (
    listStoryHot.length === 0 ||
    listStoryNew.length === 0 ||
    listStoryRecommend.length === 0
  ) {
    return (
      <>
        <SkeletonHome />
      </>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section>
        <h3 className="[font-size:var(--title-text)] font-bold mb-5">
          Truyện Hot
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[400px]">
          {listStoryHot.map((truyen, idx) => (
            <div
              onClick={() => router.push(`/story/${truyen.slug}`)}
              key={truyen._id}
              className="bg-[var(--card-bg)] rounded-lg flex flex-col hover:bg-[var(--card-bg)]/40 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4]">
                {truyen?.bannerImage ? (
                  <Image
                    src={truyen.bannerImage}
                    alt={truyen.title}
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
                      {truyen.title}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gray-600/80 flex justify-around py-1 text-white text-xs">
                  <div className="flex gap-1 items-center">
                    <FaEye /> {truyen.viewsCount}
                  </div>
                  <div className="flex gap-1 items-center">
                    <FaHeart /> {truyen.followsCount}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-3 min-h-[70px]">
                <h4 className="text-white text-lg font-semibold text-center line-clamp-2">
                  {truyen.title}
                </h4>
                <div className="flex justify-between items-center text-white text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <FaBook /> {truyen.totalChapters}
                  </div>
                  <div>{formatTimeVN(truyen.createdAt)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h3 className="[font-size:var(--title-text)] font-bold">
          Truyện mới cập nhật
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[400px]">
          {listStoryNew.map((truyen) => (
            <div
              onClick={() => router.push(`/story/${truyen.slug}`)}
              key={truyen._id}
              className="bg-[var(--card-bg)] rounded-lg flex flex-col hover:bg-[var(--card-bg)]/40 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4]">
                {truyen?.bannerImage ? (
                  <Image
                    src={truyen.bannerImage}
                    alt={truyen.title}
                    fill
                    sizes="
    (max-width: 640px) 50vw,
    (max-width: 768px) 33vw,
    (max-width: 1024px) 25vw,
    (max-width: 1280px) 20vw,
    16vw
  "
                    className="object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl text-center">
                      {truyen.title}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gray-600/80 flex justify-around py-1 text-white text-xs">
                  <div className="flex gap-1 items-center">
                    <FaEye /> {truyen.viewsCount}
                  </div>
                  <div className="flex gap-1 items-center">
                    <FaHeart /> {truyen.followsCount}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-3 min-h-[70px]">
                <h4 className="text-white text-lg font-semibold text-center line-clamp-2">
                  {truyen.title}
                </h4>
                <div className="flex justify-between items-center text-white text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <FaBook /> {truyen.totalChapters}
                  </div>
                  <div>{formatTimeVN(truyen.createdAt)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h3 className="[font-size:var(--title-text)] font-bold">
          Truyện đề xuất
        </h3>
        <div className="flex flex-col gap-4 min-h-[400px]">
          {listStoryRecommend.map((truyen) => (
            <div
              onClick={() => router.push(`/story/${truyen.slug}`)}
              key={truyen._id}
              className="grid grid-cols-[200px_1fr] bg-[var(--card-bg)] rounded-lg hover:bg-[var(--card-bg)]/40 transition-all duration-300 cursor-pointer"
            >
              <div>
                {truyen?.bannerImage ? (
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src={truyen.bannerImage}
                      alt={truyen.title}
                      fill
                      sizes="200px"
                      className="object-cover rounded-l-lg"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-300 h-[266px] w-full rounded flex items-center justify-center">
                    <span className="text-black font-bold text-2xl text-center">
                      {truyen.title}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 p-4 w-full">
                <div className="flex justify-between">
                  <div>{truyen.totalChapters} chương</div>
                  <div className="flex gap-5">
                    <div className="flex gap-1 items-center">
                      <FaEye /> {truyen.viewsCount}
                    </div>
                    <div className="flex gap-1 items-center">
                      <FaHeart /> {truyen.followsCount}
                    </div>
                  </div>
                </div>
                <div className="text-xl font-bold line-clamp-2">
                  {truyen.title}
                </div>
                <div className="text-[15px] line-clamp-3">
                  {truyen.description}
                </div>
                <div className="px-4 py-2 rounded-xl w-[150px] bg-red-500 hover:bg-red-400 cursor-pointer">
                  Đọc truyện ngay
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <span className="flex-1 h-px bg-black"></span>

          <div className="flex gap-2">
            <div className="p-2 w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[var(--card-bg)]/80 cursor-pointer">
              <IoIosArrowBack />
            </div>
            <div className="p-2 w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[var(--card-bg)]/80 cursor-pointer">
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
