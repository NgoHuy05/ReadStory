"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdMenu } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { signOut } from "../store/authSlice";
import { FaSpinner } from "react-icons/fa";

const categorys = [
  { id: 1, name: "Manhua" },
  { id: 2, name: "Manwa" },
  { id: 3, name: "Manga" },
];

const sort = [
  { id: 1, name: "Top yêu thích" },
  { id: 2, name: "Top lượt xem" },
  { id: 3, name: "Top ngày" },
  { id: 4, name: "Top tuần" },
  { id: 5, name: "Top tháng" },
  { id: 6, name: "Truyện mới" },
];

const status = [
  { id: 1, name: "Đang hoàn thành" },
  { id: 2, name: "Đã hoàn thành" },
];

const Header = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const router = useRouter();
  const handleDropdown = (type: string) => {
    setDropdown((prev) => (prev === type ? null : type));
  };


  return (
    <div className="bg-[var(--header-bg)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto h-[70px] flex items-center justify-between px-4">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="text-3xl font-bold">📚</div>
          <h1 className="text-2xl font-semibold">Truyện Hay</h1>
        </div>

        {/* Menu dropdown */}
        <div className="flex gap-2">
          {/* Thể loại */}
          <div
            onClick={() => handleDropdown("Type")}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition ${
              dropdown === "Type" ? "bg-white/10" : ""
            }`}
          >
            <span>Thể loại</span>
            {dropdown === "Type" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            {dropdown === "Type" && (
              <div className="absolute left-0 top-full mt-2 bg-[var(--header-bg)] p-3 rounded-lg shadow-lg grid grid-cols-2 gap-2 z-50 w-max">
                {categorys.map((cat) => (
                  <div
                    key={cat.id}
                    className="hover:bg-white/10 px-3 py-2 rounded cursor-pointer"
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sắp xếp */}
          <div
            onClick={() => handleDropdown("Sort")}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition ${
              dropdown === "Sort" ? "bg-white/10" : ""
            }`}
          >
            <span>Sắp xếp</span>
            {dropdown === "Sort" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            {dropdown === "Sort" && (
              <div className="absolute left-0 top-full mt-2 bg-[#1b253a] p-3 rounded-lg shadow-lg grid grid-cols-2 gap-2 z-50 w-max">
                {sort.map((s) => (
                  <div
                    key={s.id}
                    className="hover:bg-white/10 px-3 py-2 rounded cursor-pointer"
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trạng thái */}
          <div
            onClick={() => handleDropdown("Status")}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition ${
              dropdown === "Status" ? "bg-white/10" : ""
            }`}
          >
            <span>Trạng thái</span>
            {dropdown === "Status" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            {dropdown === "Status" && (
              <div className="absolute left-0 top-full mt-2 bg-[#1b253a] p-3 rounded-lg shadow-lg gap-2 z-50 w-max">
                {status.map((s) => (
                  <div
                    key={s.id}
                    className="hover:bg-white/10 px-3 py-2 rounded cursor-pointer"
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            className="px-4 py-2 rounded-full bg-white text-black w-[180px] md:w-[250px] focus:outline-none"
          />
          <HeaderRight />
        </div>

        {/* Mobile menu */}
        <div className="flex lg:hidden items-center text-2xl px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
          <IoMdMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;

const HeaderRight = () => {
  const { user, initialized } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => dispatch(signOut());

  if (!initialized) {
    return (
      <div className="px-4 py-2  rounded-lg flex gap-2 items-center">
        <FaSpinner className="animate-spin text-white" />
        <div>Loading...</div>
      </div>
    );
  }

  return !user ? (
    <Link href="/login" className="px-4 py-2 bg-sky-700 rounded-lg">
      Đăng nhập
    </Link>
  ) : (
    <div className="flex gap-2 items-center">
      <Link href="/profile" className="px-4 py-2 bg-sky-700 rounded-lg">
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-300 rounded-lg"
      >
        Đăng xuất
      </button>
    </div>
  );
};
