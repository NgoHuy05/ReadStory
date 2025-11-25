import { FaEye, FaHeart } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetListStoryNewQuery } from "../../services/storyApi";

const NewStory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { data: newStories, isLoading } = useGetListStoryNewQuery({ page });
  const navigate = useNavigate();


  if (isLoading) return <div className="text-3xl font-bold">Loading...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section>
        <h3 className="[font-size:var(--title-text)] font-bold mb-5">
          Truyện mới cập nhật
        </h3>
        <div className="flex gap-2 justify-center my-5">
          <button
            className="rounded px-4 py-2 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] cursor-pointer transition duration-300"
            onClick={() => setSearchParams({ page: page - 1 })}
            disabled={page === 1}
          >
            <IoIosArrowBack />
          </button>
          {page > 3 && (
            <>
              <button
                className="rounded px-4 py-2 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] cursor-pointer transition duration-300"
                onClick={() => setSearchParams({ page: 1 })}
              >
                1
              </button>
              <span className="rounded px-4 py-2 bg-[var(--card-bg)]">...</span>
            </>
          )}

          {Array.from(
            { length: newStories?.pagination?.totalsPage || 1 },
            (_, i) => i + 1
          )
            .filter((p) => p >= page - 1 && p <= page + 1)
            .map((p) => (
              <button
                key={p}
                className={`rounded px-4 py-2  ${
                  p === page
                    ? "bg-red-500 "
                    : "bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] cursor-pointer "
                }  `}
                onClick={() => setSearchParams({ page: p })}
              >
                {p}
              </button>
            ))}

          {page + 2 < newStories?.pagination?.totalsPage && (
            <>
              <span className="rounded px-4 py-2 bg-[var(--card-bg)]">...</span>
              <button
                className="rounded px-4 py-2 bg-[var(--card-bg)]"
                onClick={() =>
                  setSearchParams({ page: newStories?.pagination?.totalsPage })
                }
              >
                {newStories?.pagination?.totalsPage}
              </button>
            </>
          )}

          <button
            className="rounded px-4 py-2 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] cursor-pointer transition duration-300"
            onClick={() => setSearchParams({ page: page + 1 })}
            disabled={page === newStories?.pagination?.totalsPage}
          >
            <IoIosArrowForward />
          </button>


        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {newStories?.stories.map((truyen) => (
            <div
                onClick={() => navigate(`/story/${truyen.slug}`)}
              key={truyen._id}
              className="bg-[var(--card-bg)] rounded-lg flex flex-col h-full hover:bg-[var(--card-bg)]/40  transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <div className="bg-gray-300 h-[250px] w-full rounded flex items-center justify-center">
                  <span>200x300</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gray-600/80 flex justify-around py-1 rounded-b-lg text-white text-xs">
                  <div className="flex gap-1 items-center">
                    <FaEye /> {truyen.viewsCount}
                  </div>
                  <div className="flex gap-1 items-center">
                    <FaHeart /> {truyen.followsCount}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-3 flex-1">
                <h4 className="text-white text-lg font-semibold">
                  {truyen.title}
                </h4>
                <div className="flex justify-between items-center text-white text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <FaBook /> {truyen.totalChapters}
                  </div>
                  <div>5p trước</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default NewStory;
