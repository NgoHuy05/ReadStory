"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store";
import { FaEye, FaHeart, FaRegCommentDots } from "react-icons/fa";
import { getDetailStory } from "@/src/store/storySlice";
import { useParams, useRouter } from "next/navigation";
import { TbEyeCheck } from "react-icons/tb";
import { formatTimeVN } from "@/src/utils/formatTime";
import Image from "next/image";

const Story = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { story, loading } = useSelector((state: RootState) => state.story);
  const { slugStory } = useParams<{ slugStory: string }>();
  const [showAll, setShowAll] = useState(false);

  const chaptersToShow = showAll
    ? story?.chapters?.slice().reverse()
    : story?.chapters?.slice(-6).reverse();

  useEffect(() => {
    dispatch(getDetailStory({ slugStory }));
  }, [dispatch, slugStory]);

  console.log("story:", story);

  if (loading)
    return (
      <>
        <div className="bg-gray-500">Loading...</div>
      </>
    );

  return (
    <>
      <main>
        <nav className="flex px-5 mb-5 mt-1 gap-2">
          <Link href="/" className="text-red-500">
            Trang chủ
          </Link>
          <div> / {story?.title}</div>
        </nav>

        <section>
          <div className="grid grid-cols-1 lg:grid-cols-[25%_70%] gap-5 max-h-full min-h-[800px]">
            <div className="flex flex-col px-10 gap-4">
              {story?.bannerImage ? (
                <div className="relative w-full h-[350px]">
                  <Image
                    priority
                    src={story.bannerImage}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-[400px] bg-gray-300 rounded">img</div>
              )}

              <div className="flex justify-around">
                <div className="flex flex-col px-4 py-2 bg-[var(--card-bg)] rounded-xl gap-2 items-center justify-center">
                  <div className="[font-size:var(--icon-text)]">
                    <FaEye />
                  </div>
                  <div>{story?.viewsCount} </div>
                </div>
                <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center">
                  <div className="[font-size:var(--icon-text)]">
                    <FaHeart />
                  </div>
                  <div>{story?.followsCount} </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center hover:bg-[var(--card-hover-bg)] transition cursor-pointer duration-300">
                  Đọc từ đầu
                </button>
                <button className="px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center hover:bg-[var(--card-hover-bg)] transition cursor-pointer duration-300">
                  Đọc tiếp
                </button>
              </div>
              <button className="flex flex-wrap gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center hover:bg-[var(--card-hover-bg)] transition cursor-pointer duration-300">
                <div className="[font-size:var(--icon-text)]">
                  <FaHeart />
                </div>
                <div>Theo dõi</div>
              </button>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
                <div className="[font-size:var(--title-text)] font-bold">
                  {story?.title}
                </div>
                <div className="">category</div>
                <div className="text-gray-200">{story?.description}</div>
              </div>

              <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
                <h3 className="text-2xl font-bold">Thông tin</h3>
                <div className="flex gap-2">
                  <div className="uppercase">Tác giả: </div>
                  <div className="text-red-500">
                    {story?.author || "Updating"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="uppercase">Trạng thái: </div>
                  <div className="text-red-500">
                    {story?.status === "ongoing"
                      ? "Đang hoàn thành"
                      : "Đã hoàn thành"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
                <div className="flex items-center gap-5">
                  <h2 className="font-bold">Danh sách chương</h2>
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {chaptersToShow?.map((chapter) => (
                    <div
                      key={chapter._id}
                      onClick={() =>
                        router.push(`/story/${slugStory}/${chapter.slug}`)
                      }
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

                {(story?.chapters?.length ?? 0) > 6 && !showAll && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="bg-[#5d5e63] hover:bg-[#5d5e63]/60 transition px-4 py-2 rounded-xl w-full cursor-pointer"
                  >
                    Xem tất cả chương
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="bg-[var(--card-bg)] max-w-7xl mx-auto mt-10 px-4 py-2 rounded-xl">
          <div className="flex flex-col gap-2">
            <div className="[font-size:var(--title-text)]">Bình luận</div>
            <div className="relative">
              <textarea
                className="w-full h-[100px] bg-white rounded-2xl text-black px-4 py-2 outline-none"
                //value={content}
                //onChange={(e) => setContent(e.target.value)}
                placeholder="Var nhau ít cho đời thêm vui"
              ></textarea>
              <button
                //onClick={() => handleCreateComment(story?._id)}
                className="absolute bottom-0 right-0 mb-5 mr-5 px-4 py-2 bg-red-500 rounded-2xl hover:bg-red-400 transition duration-300 cursor-pointer"
              >
                Gửi
              </button>
            </div>

            {/* {cmts?.comments?.map((comment) => (
            <div className="flex gap-4 my-5" key={comment._id}>
              <div className="rounded-full bg-red-500 size-[50px] flex items-center justify-center">avt</div>
              <div className="flex flex-col gap-1">
                <div className="text-[16px] font-bold"> {comment.userId.displayName}  </div>
                <div className="text-[15px]"> {comment.content}</div>
              </div>
            </div>
          ))} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Story;
