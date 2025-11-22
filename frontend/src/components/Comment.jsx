import toast from "react-hot-toast";
import {
  useCreateCommentMutation,
  useGetListCommentByChapterQuery,
  useGetListCommentByStoryQuery,
} from "../services/commentApi";
import { useState } from "react";

export const CommentStory = ({ slugStory }) => {
  const [content, setContent] = useState("");
  const { data: comments } = useGetListCommentByStoryQuery(slugStory);

  const [createComment] = useCreateCommentMutation();
  const handleCreateComment = async () => {
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận");
      return;
    }

    try {
      await createComment({ storySlug: slugStory, content }).unwrap();
      setContent("");
      toast.success("Bình luận thành công");
    } catch (err) {
      toast.error(err?.data?.message || "Lỗi khi bình luận");
    }
  };

  return (
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
            onClick={handleCreateComment}
            className="absolute bottom-0 right-0 mb-5 mr-5 px-4 py-2 bg-red-500 rounded-2xl hover:bg-red-400 transition duration-300 cursor-pointer"
          >
            Gửi
          </button>
        </div>

        {comments?.map((c) => (
          <div key={c._id}>{c.content}</div>
        ))}
      </div>
    </div>
  );
};

export const CommentChapter = ({ slugStory, slugChapter }) => {
  const [content, setContent] = useState("");
  const { data: comments } = useGetListCommentByChapterQuery(slugChapter);

  const [createComment] = useCreateCommentMutation();
  const handleCreateComment = async () => {
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận");
      return;
    }

    try {
      await createComment({ storySlug: slugStory, chapterSlug: slugChapter, content }).unwrap();
      setContent("");
      toast.success("Bình luận thành công");
    } catch (err) {
      toast.error(err?.data?.message || "Lỗi khi bình luận");
    }
  };

  return (
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
            onClick={handleCreateComment}
            className="absolute bottom-0 right-0 mb-5 mr-5 px-4 py-2 bg-red-500 rounded-2xl hover:bg-red-400 transition duration-300 cursor-pointer"
          >
            Gửi
          </button>
        </div>

        {comments?.map((c) => (
          <div key={c._id}>{c.content}</div>
        ))}
      </div>
    </div>
  );
};
