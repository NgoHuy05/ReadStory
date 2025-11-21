import Comment from "../components/Comment";
import {
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import useScrollToTop from "../hooks/useScrollToTop";
import { Link } from "react-router-dom";

const truyenHot = {
  id: 1,
  title: "Thanh Kiếm Huyễn Thú",
  description: "Hành trình săn thú và rèn luyện kiếm pháp.",
  author: "Nguyễn Huy",
  viewsCount: 12000,
  followsCount: 4500,
  totalChapters: 52,
  status: "Đang tiến hành",
  chapter: [
    {
      title: "chuong 1",
      content: `abcasss`,
      chapterNumber: 1,
      viewsNumber: 0,
      commentsNumber: 0,
      createdAt: "13/12/2222",
    },
    {
      title: "chuong 2",
      content: "abc",
      chapterNumber: 2,
      viewsNumber: 0,
      commentsNumber: 0,
      createdAt: "13/12/2222",
    },
    {
      title: "chuong 3",
      content: "abc",
      chapterNumber: 3,
      viewsNumber: 0,
      commentsNumber: 0,
      createdAt: "13/12/2222",
    },
  ],
};

const Chapter = () => {
  return (
    <main className="relative">
      <nav className="flex px-5 pb-5 pt-1 gap-2">
        <Link to="/" className="text-red-500">
          Trang chủ
        </Link>
        <Link to={`/story`}> / {truyenHot.title}</Link>
        <div> / {truyenHot.chapter[0].title}</div>
      </nav>

      <section>
        <div className="min-h-screen max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-3xl"> {truyenHot.title} </h2>
            <div className="[font-size:var(--title-text)]">
              {truyenHot.chapter[0].title}
            </div>
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
                <div> Chương </div>
              </div>
              <div className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-bg)]/60 cursor-pointer transition duration-300">
                <div className="[font-size:var(--icon-text)]">
                  <IoIosArrowForward />
                </div>
                <div> Sau </div>
              </div>
            </div>
            <div className="whitespace-pre-line">
              {truyenHot.chapter[0].content}
            </div>
          </div>
        </div>
      </section>
      <button onClick={useScrollToTop} className="hidden md:flex p-2 bg-[var(--card-bg)] fixed bottom-0 right-0 mr-5 mb-5 rounded-full hover:bg-[var(--card-bg)]/60 transition duration-300 cursor-pointer">
        <FaArrowUp />
      </button>
      <Comment />
    </main>
  );
};

export default Chapter;
