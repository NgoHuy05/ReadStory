import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/slice/authSlice";
import { useSignOutMutation } from "../services/authApi";
import { FaUser, FaSearch } from "react-icons/fa";

const categorys = [
  {
    id: 1,
    name: "Manhua",
  },
  {
    id: 2,
    name: "Manwa",
  },
  {
    id: 3,
    name: "Manga",
  },
];

const sort = [
  {
    id: 1,
    name: "Top yêu thích",
  },
  {
    id: 2,
    name: "Top lượt xem",
  },
  {
    id: 3,
    name: "Top ngày",
  },
  {
    id: 4,
    name: "Top Tuần",
  },
  {
    id: 5,
    name: "Top Tháng",
  },
  {
    id: 6,
    name: "Truyện mới",
  },
];

const status = [
  {
    id: 1,
    name: "Đang hoàn thành",
  },
  {
    id: 2,
    name: "Đã hoàn thành",
  },
];
const Header = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [dropdown, setDropDown] = useState(null);
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();
  const handleDropdown = (type) => {
    setDropDown((prev) => (prev === type ? null : type));
  };
  const navRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropDown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
      dispatch(logOut());
    } catch (err) {
      console.error("Đăng xuất thất bại", err);
    }
  };

  return (
    <header className="bg-[var(--header-bg)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto h-[70px] flex items-center justify-between px-4">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="text-3xl font-bold">📚</div>
          <h1 className="text-2xl font-semibold">Truyện Hay</h1>
        </div>

        <nav ref={navRef} className="hidden lg:flex items-center gap-6">
          <div
            onClick={() => handleDropdown("Type")}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition ${
              dropdown === "Type" ? "bg-white/10" : ""
            }`}
          >
            <span>Thể loại</span>

            {dropdown === "Type" ? (
              <>
                <span>
                  <IoIosArrowUp />
                </span>
                <div className="absolute left-0 top-full mt-5 bg-[var(--header-bg)] p-3 rounded-lg shadow-lg grid grid-cols-2 gap-2 z-50 w-max">
                  {categorys.map((cat) => (
                    <div
                      key={cat.id}
                      className="hover:bg-white/10 px-3 py-2 rounded cursor-pointer"
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <span>
                <IoIosArrowDown />
              </span>
            )}
          </div>

          <div
            onClick={() => handleDropdown("Sort")}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition ${
              dropdown === "Sort" ? "bg-white/10" : ""
            }`}
          >
            <span>Sắp xếp</span>
            {dropdown === "Sort" ? (
              <>
                <span>
                  <IoIosArrowUp />
                </span>
                <div className="absolute left-0 top-full mt-5 bg-[#1b253a] p-3 rounded-lg shadow-lg grid grid-cols-2 gap-2 z-50 w-max">
                  {sort.map((s) => (
                    <div
                      key={s.id}
                      className="hover:bg-white/10 px-3 py-2 rounded cursor-pointer"
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <span>
                <IoIosArrowDown />
              </span>
            )}
          </div>

          <div
            onClick={() => handleDropdown("Status")}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition ${
              dropdown === "Status" ? "bg-white/10" : ""
            }`}
          >
            <span>Trạng thái</span>
            {dropdown === "Status" ? (
              <>
                <span>
                  <IoIosArrowUp />
                </span>
                <div className="absolute left-0 top-full mt-5 bg-[#1b253a] p-3 rounded-lg shadow-lg gap-2 z-50 w-max">
                  {status.map((s) => (
                    <div
                      key={s.id}
                      className="hover:bg-white/10 px-3 py-2 rounded cursor-pointer"
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <span>
                <IoIosArrowDown />
              </span>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm truyện..."
              className="px-4 py-2 rounded-full bg-white text-black w-[180px] md:w-[250px] focus:outline-none"
            />
            <div className="absolute text-2xl right-2 top-2 text-black cursor-pointer">
              <FaSearch />
            </div>
          </div>
          {!isLogin ? (
            <Link
              to="/sign-in"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 rounded-lg cursor-pointer  transition"
            >
              Đăng nhập
            </Link>
          ) : (
            <>
              <div ref={navRef}  className="relative">
                <div
                  onClick={() => setDropDown("User")}
                  className="text-2xl bg-red-500 rounded-full p-2 hover:bg-red-700 cursor-pointer"
                >
                  <FaUser />
                </div>

                {dropdown === "User" && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute flex flex-col left-0 top-full mt-5 bg-[#1b253a] p-3 rounded-lg shadow-lg gap-2 z-50 w-max"
                  >
                    <Link
                      to="/profile"
                      className="px-4 py-2 bg-sky-700 hover:bg-sky-800 rounded-lg cursor-pointer transition"
                    >
                      Profile
                    </Link>
                    <button
                      className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg cursor-pointer  transition"
                      onClick={handleSignOut}
                    >
                      Dang xuat
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex lg:hidden items-center text-2xl px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
          <IoMdMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
