import { FaEye, FaHeart } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const truyenHot = [
  {
    id: 1,
    title: "Thanh Kiếm Huyễn Thú",
    description: "Hành trình săn thú và rèn luyện kiếm pháp.",
    author: "Nguyễn Huy",
    viewsCount: 12000,
    followsCount: 4500,
    totalChapters: 52,
    status: "Đang tiến hành",
  },
  {
    id: 2,
    title: "Phong Lôi Thần Tướng",
    description: "Truyện về thần tướng đánh bại giặc ngoại xâm.",
    author: "Lê Minh",
    viewsCount: 9800,
    followsCount: 3100,
    totalChapters: 68,
    status: "Đang tiến hành",
  },
  {
    id: 3,
    title: "Ma Thần Học Viện",
    description: "Học viện phép thuật huyền bí và những trận chiến.",
    author: "Trần Quốc",
    viewsCount: 15000,
    followsCount: 5000,
    totalChapters: 75,
    status: "Đang tiến hành",
  },
  {
    id: 4,
    title: "Chiến Thần Vô Song",
    description: "Hành trình từ kẻ vô danh trở thành chiến thần.",
    author: "Phạm Anh",
    viewsCount: 8700,
    followsCount: 2800,
    totalChapters: 60,
    status: "Đang tiến hành",
  },
  {
    id: 5,
    title: "Hồn Ma Kiếm",
    description: "Bí ẩn về thanh kiếm và linh hồn chiến binh.",
    author: "Đỗ Minh",
    viewsCount: 11300,
    followsCount: 3900,
    totalChapters: 48,
    status: "Đang tiến hành",
  },
];
const truyenDeXuat = [
  {
    id: 1,
    title: "Thanh Kiếm Huyễn Thú",
    description: "Hành trình săn thú và rèn luyện kiếm pháp.",
    author: "Nguyễn Huy",
    viewsCount: 12000,
    followsCount: 4500,
    totalChapters: 52,
    status: "Đang tiến hành",
  },
  {
    id: 2,
    title: "Phong Lôi Thần Tướng",
    description: "Truyện về thần tướng đánh bại giặc ngoại xâm.",
    author: "Lê Minh",
    viewsCount: 9800,
    followsCount: 3100,
    totalChapters: 68,
    status: "Đang tiến hành",
  },
  {
    id: 3,
    title: "Ma Thần Học Viện",
    description: "Học viện phép thuật huyền bí và những trận chiến.",
    author: "Trần Quốc",
    viewsCount: 15000,
    followsCount: 5000,
    totalChapters: 75,
    status: "Đang tiến hành",
  },
  {
    id: 4,
    title: "Chiến Thần Vô Song",
    description: "Hành trình từ kẻ vô danh trở thành chiến thần.",
    author: "Phạm Anh",
    viewsCount: 8700,
    followsCount: 2800,
    totalChapters: 60,
    status: "Đang tiến hành",
  },
  {
    id: 5,
    title: "Hồn Ma Kiếm",
    description: "Bí ẩn về thanh kiếm và linh hồn chiến binh.",
    author: "Đỗ Minh",
    viewsCount: 11300,
    followsCount: 3900,
    totalChapters: 48,
    status: "Đang tiến hành",
  },
];
const truyenMoi = [
  {
    id: 1,
    title: "Sát Thủ Huyền Thoại",
    description: "Cuộc sống bí ẩn của sát thủ.",
    author: "Nguyễn Hoàng",
    viewsCount: 3000,
    followsCount: 1200,
    totalChapters: 12,
    status: "Mới",
  },
  {
    id: 2,
    title: "Bí Kíp Võ Lâm",
    description: "Những bí kíp võ công truyền đời.",
    author: "Trần Huy",
    viewsCount: 2500,
    followsCount: 900,
    totalChapters: 10,
    status: "Mới",
  },
  {
    id: 3,
    title: "Học Viện Pháp Thuật",
    description: "Các môn học phép thuật tại học viện.",
    author: "Lê Văn",
    viewsCount: 2800,
    followsCount: 1000,
    totalChapters: 15,
    status: "Mới",
  },
  {
    id: 4,
    title: "Thế Giới Huyền Bí",
    description: "Khám phá các thế giới song song kỳ bí.",
    author: "Phạm Quốc",
    viewsCount: 3200,
    followsCount: 1100,
    totalChapters: 18,
    status: "Mới",
  },
  {
    id: 5,
    title: "Võ Thuật Thần Kỳ",
    description: "Những trận đấu võ thuật đỉnh cao.",
    author: "Đặng Minh",
    viewsCount: 2700,
    followsCount: 950,
    totalChapters: 14,
    status: "Mới",
  },
  {
    id: 6,
    title: "Kỹ Năng Sinh Tồn",
    description: "Trải nghiệm sinh tồn trong thế giới hoang dã.",
    author: "Ngô Huy",
    viewsCount: 2900,
    followsCount: 980,
    totalChapters: 16,
    status: "Mới",
  },
  {
    id: 7,
    title: "Hành Trình Chiến Binh",
    description: "Từ kẻ yếu trở thành chiến binh mạnh mẽ.",
    author: "Hoàng Anh",
    viewsCount: 3100,
    followsCount: 1150,
    totalChapters: 20,
    status: "Mới",
  },
  {
    id: 8,
    title: "Kiếm Hiệp Tân Thế Kỷ",
    description: "Câu chuyện kiếm hiệp hiện đại pha trộn fantasy.",
    author: "Trần Anh",
    viewsCount: 2400,
    followsCount: 880,
    totalChapters: 13,
    status: "Mới",
  },
  {
    id: 9,
    title: "Vương Quốc Bóng Tối",
    description: "Chiến đấu chống lại thế lực bóng tối.",
    author: "Nguyễn Quốc",
    viewsCount: 2600,
    followsCount: 920,
    totalChapters: 15,
    status: "Mới",
  },
  {
    id: 10,
    title: "Thần Thoại Huyền Bí",
    description: "Khám phá các truyền thuyết thần thoại cổ xưa.",
    author: "Lê Minh",
    viewsCount: 2800,
    followsCount: 1020,
    totalChapters: 17,
    status: "Mới",
  },
];

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section>
        <h3
          className="[font-size:var(--title-text)] font-bold mb-5"
        >
          Truyện Hot
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {truyenHot.map((truyen) => (
            <div
              key={truyen.id}
              className="bg-[var(--card-bg)] transition rounded-lg flex flex-col h-full"
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

      <section>
        <h3 className="[font-size:var(--title-text)] font-bold mb-5">Truyện mới cập nhật</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {truyenMoi.map((truyen) => (
            <div
              key={truyen.id}
              className="bg-[var(--card-bg)] transition rounded-lg flex flex-col h-full"
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
        <div className="flex items-center justify-center gap-2 mt-10 mb-10">
          <div className="flex-1 h-px bg-black"></div>
          <div className="p-2 rounded-xl hover:bg-gray-200 transition cursor-pointer">
            Xem Thêm
          </div>
        </div>
      </section>

      <section>
        <h3 className="[font-size:var(--title-text)] font-bold mb-5">Truyện đề xuất</h3>
        <div className="flex flex-col gap-4">
          {truyenDeXuat.map((truyen) => (
            <div
              key={truyen.id}
              className="bg-[var(--card-bg)] transition rounded-lg "
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
            <div className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
              <IoIosArrowBack />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
