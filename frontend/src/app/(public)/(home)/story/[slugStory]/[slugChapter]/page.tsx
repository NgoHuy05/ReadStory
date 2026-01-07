"use client";
import SkeletonChapter from "@/src/components/skeleton/SkeletonChapter";
import { useScrollToTop } from "@/src/hook/useScrollToTop";
import { AppDispatch, RootState } from "@/src/store";
import { getDetailChapter } from "@/src/store/chapterSlice";
import {
  createComment,
  getListCommentByChapter,
} from "@/src/store/commentSlice";
import { formatTimeVN } from "@/src/utils/formatTime";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Chapter = () => {
  const scrollToTop = useScrollToTop();
  const { slugStory, slugChapter } = useParams<{
    slugStory: string;
    slugChapter: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const { chapter, loading } = useSelector((state: RootState) => state.chapter);
  const { listCommentChapter } = useSelector(
    (state: RootState) => state.comment
  );
  const [content, setContent] = useState("");
  const [showAllComment, setShowAllComment] = useState(false);
  useEffect(() => {
    dispatch(getDetailChapter({ slugChapter }));
    dispatch(getListCommentByChapter({ slugChapter }));
  }, [dispatch, slugStory, slugChapter]);

  const commentsToShow = showAllComment
    ? listCommentChapter.slice()
    : listCommentChapter.slice(0, 6);

  const handleSubmitComment = () => {
    if (!chapter?.storyId || !chapter?._id || !content) return;

    dispatch(
      createComment({
        storyId: chapter?.storyId._id,
        chapterId: chapter?._id,
        content,
      })
    );

    setContent("");
  };

  if(loading || !chapter) {
    return <> <SkeletonChapter /> </>
  }

  return (
    <main className="relative">
      <nav className="flex px-5 pb-5 pt-1 gap-2">
        <Link href="/" className="text-red-500">
          Trang chủ
        </Link>
        <Link href={`/story/${slugStory}`}> / {chapter?.storyId?.title}</Link>
        <div> / Chương {chapter?.chapterNumber}</div>
      </nav>

      <section>
        <div className="min-h-screen max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-3xl"> {chapter?.storyId?.title} </h2>
            <h2 className="text-3xl">
              Chương {chapter?.chapterNumber}: {chapter?.title}
            </h2>

            <div className="flex gap-5 mt-5">
              <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-bg)]/60 cursor-pointer transition duration-300">
                <div className="[font-size:var(--icon-text)]">
                  <IoIosArrowBack />
                </div>
                <div> Trước </div>
              </div>
              <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-bg)]/60 cursor-pointer transition duration-300">
                <div className="[font-size:var(--icon-text)]">
                  <IoMdMenu />
                </div>
                <div> Chương {chapter?.chapterNumber}</div>
              </div>
              <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-bg)]/60 cursor-pointer transition duration-300">
                <div className="[font-size:var(--icon-text)]">
                  <IoIosArrowForward />
                </div>
                <div> Sau </div>
              </div>
            </div>
            <div className="whitespace-pre-line mx-10 mt-10">
              {chapter?.content}
            </div>
          </div>
        </div>
      </section>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="hidden md:flex p-2 bg-[var(--card-bg)] fixed bottom-0 right-0 mr-5 mb-5 rounded-full hover:bg-[var(--card-bg)]/60 transition duration-300 cursor-pointer"
      >
        <FaArrowUp />
      </button>

      <div className="bg-[var(--card-bg)] max-w-7xl mx-auto px-4 py-2 rounded-xl">
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
              <div className="rounded-full bg-red-500 size-[50px] flex items-center justify-center">
                avt
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <div className="text-[16px] font-bold">
                    {comment?.userId?.displayName}
                  </div>
                  {comment.chapterId ? (
                    <div className="bg-red-400 text-white px-4 rounded-2xl">
                      chương {comment.chapterId.chapterNumber}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="text-gray-400">
                    {formatTimeVN(comment.createdAt)}
                  </div>
                </div>
                <div className="text-[15px]"> {comment.content}</div>
              </div>
            </div>
          ))}
          {(listCommentChapter?.length ?? 0) > 6 && !showAllComment && (
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
export default Chapter;
