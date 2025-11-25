import { FaEye, FaHeart, FaRegCommentDots } from "react-icons/fa";
import { TbEyeCheck } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCreateCommentMutation,
  useGetListCommentByStoryQuery,
} from "../services/commentApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { useGetDetailStoryQuery } from "../services/storyApi";
import { formatTimeVN } from "../utils";

const Story = () => {
  const { slugStory } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const { data: cmts } = useGetListCommentByStoryQuery(slugStory);
  const [createComment] = useCreateCommentMutation();
  const {data: story} = useGetDetailStoryQuery(slugStory);
  console.log(story);
  
  const handleCreateComment = async (storyId) => {
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận");
      return;
    }

    try {
      await createComment({ storyId, content }).unwrap();
      setContent("");
      toast.success("Bình luận thành công");
    } catch (err) {
      toast.error(err?.data?.message || "Lỗi khi bình luận");
    }
  };

  return (
    <main>
      <nav className="flex px-5 pb-5 pt-1 gap-2">
        <Link to="/" className="text-red-500">
          Trang chủ
        </Link>
        <div> / {story?.story.title}</div>
      </nav>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-[25%_70%] gap-5 max-h-[1300px] min-h-[1000px]">
          <div className="flex flex-col px-10 gap-4">
            <div className="w-full h-[400px] bg-gray-300 rounded">img</div>
            <div className="flex justify-around">
              <div className="flex flex-col px-4 py-2 bg-[var(--card-bg)] rounded-xl gap-2 items-center justify-center">
                <div className="[font-size:var(--icon-text)]">
                  <FaEye />
                </div>
                <div>{story?.story.viewsCount} </div>
              </div>
              <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center">
                <div className="[font-size:var(--icon-text)]">
                  <FaHeart />
                </div>
                <div>{story?.story.followsCount} </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center hover:bg-[var(--card-hover-bg)] transition cursor-pointer duration-300">
                Đọc từ đầu
              </button>
              <button className="px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center hover:bg-[var(--card-hover-bg)] transition cursor-pointer duration-300">
                Đọc cuối
              </button>
              <button className="flex flex-wrap gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center hover:bg-[var(--card-hover-bg)] transition cursor-pointer duration-300">
                <div className="[font-size:var(--icon-text)]">
                  <FaHeart />
                </div>
                <div>Theo dõi</div>
              </button>
              <button className="px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center hover:bg-[var(--card-hover-bg)] transition cursor-pointer duration-300">
                Đọc tiếp
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
              <div className="[font-size:var(--title-text)] font-bold">
                {story?.story.title}
              </div>
              <div className="">category</div>
              <div className="text-gray-200">{story?.story.description}</div>
            </div>
            <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
              <h3 className="text-2xl font-bold">Thong tin</h3>
              <div className="flex gap-2">
                <div className="uppercase">Tác giả: </div>
                <div className="text-red-500">
                  {story?.story?.author || "Updating"}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="uppercase">Trạng thái: </div>
                <div className="text-red-500">
                  {(story?.story.status === "ongoing" ? "Đang hoàn thành" : "Đã hoàn thành" )|| "updating"}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
              <div className="flex items-center gap-5">
                <h2 className="font-bold">Danh sach</h2>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
                {story?.chapters.map((chapter) => (
                  <div
                  key={chapter._id}
                    onClick={() => navigate(`/story/${slugStory}/${chapter.slug}`)}
                    className="flex gap-2 w-full bg-[#5d5e63] p-2 rounded-xl cursor-pointer hover:bg-[#5d5e63]/60"
                  >
                    <div className="flex [font-size:var(--icon-text)] justify-center items-center bg-red-500 px-6 py-2 rounded-xl">
                      <TbEyeCheck />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex flex-col ">
                        <h3>{chapter.chapterNumber}</h3>
                        <div> {formatTimeVN(chapter.createdAt)} </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div>
                            <FaEye />
                          </div>
                          <div>{chapter.viewsNumber}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <FaRegCommentDots />
                          </div>
                          <div>{chapter.commentsNumber}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
              onClick={() => handleCreateComment(story?.story._id)}
              className="absolute bottom-0 right-0 mb-5 mr-5 px-4 py-2 bg-red-500 rounded-2xl hover:bg-red-400 transition duration-300 cursor-pointer"
            >
              Gửi
            </button>
          </div>


          {cmts?.comments?.map((comment) => (
            <div className="flex gap-4 my-5" key={comment._id}>
              <div className="rounded-full bg-red-500 size-[50px] flex items-center justify-center">avt</div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px] font-bold"> {comment.userId.displayName}  </div>
                <div className="text-[15px]"> {comment.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Story;
