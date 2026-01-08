"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store";
import { FaEye, FaHeart } from "react-icons/fa";
import { TbEyeCheck } from "react-icons/tb";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { formatTimeVN } from "@/src/utils/formatTime";
import { getDetailStory } from "@/src/store/storySlice";
import { createComment, getListCommentByStory } from "@/src/store/commentSlice";
import SkeletonStoryDetail from "@/src/components/skeleton/SkeletonStoryDetail";

const Story = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { story, status } = useSelector((state: RootState) => state.story);
  const { listCommentStory } = useSelector((state: RootState) => state.comment);
  const { slugStory } = useParams<{ slugStory: string }>();
  const [showAll, setShowAll] = useState(false);
  const [showAllComment, setShowAllComment] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmitComment = () => {
    if (!story?._id || !content) return;
    dispatch(createComment({ storyId: story._id, chapterId: null, content }));
    setContent("");
  };

  const chaptersToShow = showAll ? story?.chapters?.slice() : story?.chapters?.slice(0, 6);
  const commentsToShow = showAllComment ? listCommentStory?.slice() : listCommentStory?.slice(0, 6);

  useEffect(() => {
    dispatch(getDetailStory({ slugStory }));
    dispatch(getListCommentByStory({ slugStory }));
  }, [dispatch, slugStory]);

  if (status === "idle" || status === "loading") {
    return <><SkeletonStoryDetail /> </>
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-5">
      <nav className="flex gap-2 mb-5">
        <Link href="/" className="text-red-500">
          Trang chủ
        </Link>
        <div>/ {story?.title}</div>
      </nav>

      <section className="grid grid-cols-1 sm:grid-cols-[45%_50%] md:grid-cols-[35%_60%] lg:grid-cols-[25%_70%] gap-5 min-h-[800px]">
        <div className="flex flex-col gap-4 px-4">
          {story?.bannerImage ? (
            <div className="relative w-full aspect-[3/4] rounded overflow-hidden">
              <Image
                priority
                src={story.bannerImage}
                alt={story.title}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-[400px] bg-gray-300 rounded">img</div>
          )}

          <div className="flex justify-around gap-4">
            <div className="flex flex-col items-center gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
              <FaEye className="[font-size:var(--icon-text)]" />
              <div>{story?.viewsCount}</div>
            </div>
            <div className="flex flex-col items-center gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
              <FaHeart className="[font-size:var(--icon-text)]" />
              <div>{story?.followsCount}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button type="button" className="flex-1 px-4 py-2 bg-[var(--card-bg)] rounded-xl hover:bg-[var(--card-hover-bg)] transition">
              Đọc từ đầu
            </button>
            <button type="button" className="flex-1 px-4 py-2 bg-[var(--card-bg)] rounded-xl hover:bg-[var(--card-hover-bg)] transition">
              Đọc tiếp
            </button>
          </div>

          <button type="button" className="flex items-center justify-center flex-wrap gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl hover:bg-[var(--card-hover-bg)] transition">
            <FaHeart className="[font-size:var(--icon-text)]" />
            <div>Theo dõi</div>
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
            <div className="[font-size:var(--title-text)] font-bold">{story?.title}</div>
            <div>category</div>
            <div className="text-gray-200">{story?.description}</div>
          </div>

          <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
            <h3 className="text-2xl font-bold">Thông tin</h3>
            <div className="flex gap-2">
              <div className="uppercase">Tác giả: </div>
              <div className="text-red-500">{story?.author || "Updating"}</div>
            </div>
            <div className="flex gap-2">
              <div className="uppercase">Trạng thái: </div>
              <div className="text-red-500">{story?.status === "ongoing" ? "Đang hoàn thành" : "Đã hoàn thành"}</div>
            </div>
          </div>

          <div className="flex flex-col gap-5 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
            <div className="flex items-center gap-5">
              <h2 className="font-bold">Danh sách chương</h2>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {chaptersToShow?.map((chapter) => (
                <div
                  key={chapter._id}
                  onClick={() => router.push(`/story/${slugStory}/${chapter.slug}`)}
                  className="flex gap-2 w-full bg-[#5d5e63] p-2 rounded-xl cursor-pointer hover:bg-[#5d5e63]/60"
                >
                  <div className="flex [font-size:var(--icon-text)] justify-center items-center bg-red-500 px-4 rounded-xl">
                    <TbEyeCheck />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-col">
                      <h3>{chapter.chapterNumber}</h3>
                      <div>{formatTimeVN(chapter.createdAt)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEye />
                      <div>{chapter.viewsNumber}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!showAll && (story?.chapters?.length ?? 0) > 6 && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="bg-[#5d5e63] hover:bg-[#5d5e63]/60 transition px-4 py-2 rounded-xl w-full cursor-pointer"
              >
                Xem tất cả chương
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="bg-[var(--card-bg)] max-w-7xl mx-auto mt-10 px-4 py-2 rounded-xl">
        <div className="flex flex-col gap-2">
          <div className="[font-size:var(--title-text)]">Bình luận</div>
          <div className="relative">
            <textarea
              className="w-full h-[100px] bg-white rounded-2xl text-black px-4 py-2 outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Var nhau ít cho đời thêm vui"
            ></textarea>
            <button
              type="button"
              onClick={() => handleSubmitComment()}
              className="absolute bottom-0 right-0 mb-5 mr-5 px-4 py-2 bg-red-500 rounded-2xl hover:bg-red-400 transition duration-300 cursor-pointer"
            >
              Gửi
            </button>
          </div>

          {commentsToShow?.map((comment) => (
            <div className="flex gap-4 my-5" key={comment._id}>
              <div className="rounded-full bg-red-500 h-12 w-12 flex items-center justify-center">avt</div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <div className="text-[16px] font-bold">{comment?.userId?.displayName}</div>
                  {comment.chapterId && (
                    <div className="bg-red-400 text-white px-4 rounded-2xl">
                      chương {comment.chapterId.chapterNumber}
                    </div>
                  )}
                  <div className="text-gray-400">{formatTimeVN(comment.createdAt)}</div>
                </div>
                <div className="text-[15px]">{comment.content}</div>
              </div>
            </div>
          ))}

          {!showAllComment && (listCommentStory?.length ?? 0) > 6 && (
            <button
              type="button"
              onClick={() => setShowAllComment(true)}
              className="bg-[#5d5e63] hover:bg-[#5d5e63]/60 transition px-4 py-2 rounded-xl w-full cursor-pointer"
            >
              Xem thêm
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Story;
