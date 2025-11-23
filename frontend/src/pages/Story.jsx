import { FaEye, FaHeart, FaRegCommentDots } from "react-icons/fa";
import { TbEyeCheck } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { CommentStory } from "../components/Comment";

const truyenHot = {
  _id: 1,
  title: "Thanh Kiếm Huyễn Thú",
  slug: "thanh-kiem-huyen-thu",
  description: "Hành trình săn thú và rèn luyện kiếm pháp.",
  author: "Nguyễn Huy",
  viewsCount: 12000,
  followsCount: 4500,
  totalChapters: 52,
  status: "Đang tiến hành",
  chapter: [
    {
      title: "chuong 1",
      slug: "chuong-1",
      content: "abc",
      chapterNumber: 1,
      viewsNumber: 0,
      commentsNumber: 0,
      createdAt: "13/12/2222",
    },
    {
      title: "chuong 2",
      slug: "chuong-2",
      content: "abc",
      chapterNumber: 2,
      viewsNumber: 0,
      commentsNumber: 0,
      createdAt: "13/12/2222",
    },
    {
      title: "chuong 3",
      slug: "chuong-3",
      content: "abc",
      chapterNumber: 3,
      viewsNumber: 0,
      commentsNumber: 0,
      createdAt: "13/12/2222",
    },
  ],
};

const Story = () => {
  const navigate = useNavigate();

  return (
    <main>
      <nav className="flex px-5 pb-5 pt-1 gap-2">
        <Link to="/" className="text-red-500">
          Trang chủ
        </Link>
        <div> / {truyenHot.title}</div>
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
                <div>{truyenHot.viewsCount} </div>
              </div>
              <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl items-center justify-center">
                <div className="[font-size:var(--icon-text)]">
                  <FaHeart />
                </div>
                <div>{truyenHot.followsCount} </div>
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
                {truyenHot.title}
              </div>
              <div className="">category</div>
              <div className="text-gray-200">{truyenHot.description}</div>
            </div>
            <div className="flex flex-col gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
              <h3 className="text-2xl font-bold">Thong tin</h3>
              <div className="flex gap-2">
                <div className="uppercase">Tac gia: </div>
                <div className="text-red-500">
                  {truyenHot?.author || "Updating"}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="uppercase">Trang thai: </div>
                <div className="text-red-500">
                  {truyenHot.status || "Updating"}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-4 py-2 bg-[var(--card-bg)] rounded-xl">
              <div className="flex items-center gap-5">
                <h2 className="font-bold">Danh sach</h2>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
                {truyenHot.chapter.map((c) => (
                  <div onClick={() => navigate('/story/chapter')} className="flex gap-2 w-full bg-[#5d5e63] p-2 rounded-xl cursor-pointer hover:bg-[#5d5e63]/60">
                    <div className="flex [font-size:var(--icon-text)] justify-center items-center bg-red-500 px-6 py-2 rounded-xl">
                      <TbEyeCheck />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex flex-col ">
                        <h3>{c.chapterNumber}</h3>
                        <div> {c.createdAt} </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div>
                            <FaEye />
                          </div>
                          <div>{c.viewsNumber}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <FaRegCommentDots />
                          </div>
                          <div>{c.commentsNumber}</div>
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

      <CommentStory slugStory={truyenHot.slug} />

    </main>
  );
};

export default Story;
