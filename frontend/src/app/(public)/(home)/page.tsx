"use client";

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
import { FaEye, FaHeart } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { listStoryHot, listStoryNew, listStoryRecommend, loading } =
    useSelector((state: RootState) => state.story);

  useEffect(() => {
    dispatch(getListStoryHot());
    dispatch(getListStoryNew());
    dispatch(getListStoryRecommend());
  }, [dispatch]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section>
        <h3 className="[font-size:var(--title-text)] font-bold mb-5">
          Truyện Hot
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {listStoryHot.map((truyen) => (
            <div
              onClick={() => router.push(`/story/${truyen.slug}`)}
              key={truyen._id}
              className="bg-[var(--card-bg)] rounded-lg flex flex-col h-full hover:bg-[var(--card-bg)]/40  transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-[260px] w-full rounded overflow-hidden">
                {truyen?.bannerImage ? (
                  <Image
                    src={truyen.bannerImage}
                    alt={truyen.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl text-center">
                      {truyen.title}
                    </span>{" "}
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

              <div className="flex flex-col justify-between p-3 flex-1">
                <h4 className="text-white text-lg font-semibold text-center">
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

      <section>
        <h3 className="[font-size:var(--title-text)] font-bold mb-5">
          Truyện mới cập nhật
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {listStoryNew.map((truyen) => (
            <div
              onClick={() => router.push(`/story/${truyen.slug}`)}
              key={truyen._id}
              className="bg-[var(--card-bg)] rounded-lg flex flex-col h-full hover:bg-[var(--card-bg)]/40  transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-[260px] w-full rounded overflow-hidden">
                {truyen?.bannerImage ? (
                  <Image
                    src={truyen.bannerImage}
                    alt={truyen.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl text-center">
                      {truyen.title}
                    </span>{" "}
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

              <div className="flex flex-col justify-between p-3 flex-1">
                <h4 className="text-white text-lg font-semibold text-center">
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
        <div className="flex items-center justify-center gap-2 mt-10 mb-10">
          <div className="flex-1 h-px bg-black"></div>

          <div
            onClick={() => router.push("/list-new-story?page=1")}
            className="p-2 rounded-xl hover:bg-[var(--card-bg)]/80 transition cursor-pointer"
          >
            Xem Thêm
          </div>
        </div>
      </section>

      <section>
        <h3 className="[font-size:var(--title-text)] font-bold mb-5">
          Truyện đề xuất
        </h3>
        <div className="flex flex-col gap-4">
          {listStoryRecommend.map((truyen) => (
            <div
              onClick={() => router.push(`/story/${truyen.slug}`)}
              key={truyen._id}
              className="bg-[var(--card-bg)] rounded-lg flex flex-col h-full hover:bg-[var(--card-bg)]/40  transition-all duration-300 cursor-pointer"
            >
              <div className="flex h-full w-full gap-2">
                {truyen?.bannerImage ? (
                  <div className="relative h-[320px] w-[280px] rounded flex items-center justify-center">
                    <Image
                      src={truyen.bannerImage}
                      alt={truyen.title}
                      priority
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-300 h-[320px] w-[280px] rounded flex items-center justify-center">
                    <span className="text-black font-bold text-2xl text-center">
                      {truyen.title}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-2 p-4 w-full">
                  <div className="flex justify-between">
                    <div> {truyen.totalChapters} chương </div>
                    <div className="flex gap-5">
                      <div className="flex gap-1 items-center">
                        <FaEye /> {truyen.viewsCount}
                      </div>
                      <div className="flex gap-1 items-center">
                        <FaHeart /> {truyen.followsCount}
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">{truyen.title}</div>
                  {/* <div>category</div> */}
                  <div className="text-[15px]">{truyen.description}</div>
                  <div className="px-4 py-2 rounded-xl w-[150px] bg-red-500 hover:bg-red-400 cursor-pointer">
                    Đọc truyện ngay
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 text-2xl">
          <span className="flex-1 h-px bg-black"></span>

          <div className="flex gap-2">
            <div className="p-2 rounded-full hover:bg-[var(--card-bg)]/80 cursor-pointer">
              <IoIosArrowBack />
            </div>
            <div className="p-2 rounded-full hover:bg-[var(--card-bg)]/80 transition cursor-pointer">
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
