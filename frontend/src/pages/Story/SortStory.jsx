import { useState, useRef, useEffect } from "react";
import { FaEye, FaHeart, FaBook } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetListStorySortQuery } from "../../services/storyApi";
import { FaFilter } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SortStory = () => {
  const { slugCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") || "1");
  const querySort = searchParams.get("sort") || "new";
  const queryStatus = searchParams.get("status") || "ongoing";

  const [sort, setSort] = useState(querySort);
  const [status, setStatus] = useState(queryStatus);
  const [openSort, setOpenSort] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const sortRef = useRef(null);
  const statusRef = useRef(null);

  const { data: storiesSort, isLoading } = useGetListStorySortQuery({
    slugCategory,
    page,
    sort: querySort,
    status: queryStatus,
  });

  const sortOptions = [
    { id: "truyen-moi", name: "Truyện mới" },
    { id: "top-yeu-thich", name: "Top yêu thích" },
    { id: "top-luot-xem", name: "Top lượt xem" },
    { id: "top-ngay", name: "Top ngày" },
    { id: "top-tuan", name: "Top tuần" },
    { id: "top-thang", name: "Top tháng" },
  ];

  const statusOptions = [
    { id: "dang-hoan-thanh", name: "Đang hoàn thành" },
    { id: "da-hoan-thanh", name: "Đã hoàn thành" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ page: 1, sort, status });
  };

  // Click ngoài dropdown sẽ đóng
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target))
        setOpenSort(false);
      if (statusRef.current && !statusRef.current.contains(e.target))
        setOpenStatus(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <div className="text-3xl font-bold">Loading...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section>
        <h3 className="text-2xl font-bold mb-5">
          Thể loại: {storiesSort?.category.name}
        </h3>
        <div className="mb-5 rounded-2xl bg-[var(--card-bg)] p-4">
          Mô tả thể loại: {storiesSort?.category.description}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 mb-20 relative"
        >
          {/* Sort Dropdown */}
          <div ref={sortRef} className="relative">
            <div
              onClick={() => setOpenSort(!openSort)}
              className="flex gap-2 px-4 py-2 bg-[var(--card-bg)] text-white rounded-lg cursor-pointer select-none justify-between items-center"
            >
              <span>{sortOptions.find((o) => o.id === sort)?.name}</span>
              {openSort ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {openSort && (
              <div className="absolute mt-1 min-w-[200px] bg-[var(--card-bg)] rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      setSort(option.id);
                      setOpenSort(false);
                    }}
                    className={`px-4 py-2 cursor-pointer rounded-lg hover:bg-red-500 hover:text-white ${
                      sort === option.id
                        ? "bg-red-500 text-white"
                        : "text-white"
                    }`}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div ref={statusRef} className="relative">
            <div
              onClick={() => setOpenStatus(!openStatus)}
              className="flex gap-2 px-4 py-2 bg-[var(--card-bg)] text-white rounded-lg cursor-pointer select-none justify-between items-center"
            >
              <span>{statusOptions.find((o) => o.id === status)?.name}</span>
              {openStatus ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {openStatus && (
              <div className="absolute mt-1 w-full bg-[var(--card-bg)] rounded-lg shadow-lg z-10">
                {statusOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      setStatus(option.id);
                      setOpenStatus(false);
                    }}
                    className={`px-4 py-2 cursor-pointer rounded-lg hover:bg-red-500 hover:text-white ${
                      status === option.id
                        ? "bg-red-500 text-white"
                        : "text-white"
                    }`}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="flex px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 cursor-pointer"
          >
            <FaFilter className="inline mr-2" />
            Lọc
          </button>
        </form>

        {/* Story Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {storiesSort?.stories.map((truyen) => (
            <div
              onClick={() => navigate(`/story/${truyen.slug}`)}
              key={truyen._id}
              className="bg-[var(--card-bg)] rounded-lg flex flex-col h-full hover:bg-[var(--card-bg)]/40 transition cursor-pointer"
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

        {/* Pagination */}
        <div className="flex gap-2 justify-center my-5">
          <button
            className="rounded-lg px-4 py-2 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition"
            onClick={() => setSearchParams({ page: page - 1, sort, status })}
            disabled={page === 1}
          >
            <IoIosArrowBack />
          </button>
          {Array.from(
            { length: storiesSort?.pagination?.totalsPage || 1 },
            (_, i) => i + 1
          )
            .filter((p) => p >= page - 1 && p <= page + 1)
            .map((p) => (
              <button
                key={p}
                className={`rounded-lg px-4 py-2 ${
                  p === page
                    ? "bg-red-500 text-white"
                    : "bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] cursor-pointer text-white"
                }`}
                onClick={() => setSearchParams({ page: p, sort, status })}
              >
                {p}
              </button>
            ))}
          <button
            className="rounded-lg px-4 py-2 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition"
            onClick={() => setSearchParams({ page: page + 1, sort, status })}
            disabled={page === storiesSort?.pagination?.totalsPage}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </section>
    </main>
  );
};

export default SortStory;
