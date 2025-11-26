import { FaEye, FaHeart } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  useGetListStoryHotQuery,
  useGetListStoryNewQuery,
  useGetListStoryRecommendQuery,
} from "../services/storyApi";
import { formatTimeVN } from "../utils";

const Home = () => {

  const { data: hotStories, isLoading: loadingHot } = useGetListStoryHotQuery();
const { data: newStories = { stories: [], pagination: {} }, isLoading: loadingNew } = useGetListStoryNewQuery({page: 1});

  const { data: recommendStories, isLoading: loadingRcm } =
    useGetListStoryRecommendQuery();
  const navigate = useNavigate();

  if (loadingHot || loadingNew || loadingRcm)
    return <div className="text-3xl font-bold">Loading...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        <section>
          <h3 className="[font-size:var(--title-text)] font-bold mb-5">
            Truyện Hot
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {hotStories?.stories.map((truyen) => (
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
                    <div> {formatTimeVN(truyen.createdAt)} </div>
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
                    <div> {formatTimeVN(truyen.createdAt)} </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-10 mb-10">
          <div className="flex-1 h-px bg-black"></div>

            <div
              onClick={() => navigate({
                pathname: '/list-new-story',
                search: "?page=1"
              })}
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
            {recommendStories?.stories.map((truyen) => (
              <div
                onClick={() => navigate(`/story/${truyen.slug}`)}
                key={truyen._id}
                className="bg-[var(--card-bg)] rounded-lg flex flex-col h-full hover:bg-[var(--card-bg)]/40  transition-all duration-300 cursor-pointer"
              >
                <div className="flex h-full w-full gap-2">
                  <div className="bg-gray-300 h-[250px] w-[200px] rounded flex items-center justify-center">
                    <span>200x300</span>
                  </div>
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
