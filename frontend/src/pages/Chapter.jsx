import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import useScrollToTop from "../hooks/useScrollToTop";
import { Link, useParams } from "react-router-dom";
import {
  useCreateCommentMutation,
  useGetListCommentByChapterQuery,
} from "../services/commentApi";
import { useGetDetailChapterQuery } from "../services/chapterApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetDetailStoryQuery } from "../services/storyApi";

const Chapter = () => {
  const { slugStory, slugChapter } = useParams();
  const { data: cmts } = useGetListCommentByChapterQuery(slugChapter);
  const [createComment] = useCreateCommentMutation();
  const { data: chapter } = useGetDetailChapterQuery(slugChapter);
  const { data: story } = useGetDetailStoryQuery(slugStory);

  const [content, setContent] = useState("");

  const handleCreateComment = async (storyId, chapterId) => {
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận");
      return;
    }

    try {
      await createComment({ storyId, chapterId, content }).unwrap();
      setContent("");
      toast.success("Bình luận thành công");
    } catch (err) {
      toast.error(err?.data?.message || "Lỗi khi bình luận");
    }
  };
  console.log(chapter);
console.log(cmts);

  return (
    <main className="relative">
      <nav className="flex px-5 pb-5 pt-1 gap-2">
        <Link to="/" className="text-red-500">
          Trang chủ
        </Link>
        <Link to={`/story/${slugStory}`}> / {story?.story.title}</Link>
        <div> / {story?.story.title}</div>
      </nav>

      <section>
        <div className="min-h-screen max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-3xl">
              Chương {chapter?.chapter.chapterNumber}: {chapter?.chapter.title}{" "}
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
                <div> Chương {chapter?.chapter.chapterNumber}</div>
              </div>
              <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-bg)]/60 cursor-pointer transition duration-300">
                <div className="[font-size:var(--icon-text)]">
                  <IoIosArrowForward />
                </div>
                <div> Sau </div>
              </div>
            </div>
            <div className="whitespace-pre-line my-15">
              {chapter?.chapter.content}
            </div>
          </div>
        </div>
      </section>
      <button
        onClick={useScrollToTop}
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
              onClick={() =>
                handleCreateComment(story?.story._id, chapter?.chapter._id)
              }
              className="absolute bottom-0 right-0 mb-5 mr-5 px-4 py-2 bg-red-500 rounded-2xl hover:bg-red-400 transition duration-300 cursor-pointer"
            >
              Gửi
            </button>
          </div>

          {cmts?.comments?.map((comment) => (
            <div className="flex gap-4 my-5" key={comment._id}>
              <div className="rounded-full bg-red-500 size-[50px] flex items-center justify-center">avt</div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-5">
                <div className="text-[16px] font-bold"> {comment.userId.displayName}  </div>
                <div className="rounded bg-red-500"> Chương {chapter?.chapter.chapterNumber}</div>
                </div>
                <div className="text-[15px]"> {comment.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Chapter;
