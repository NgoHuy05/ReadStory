import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/slice/authSlice";
import { useSignOutMutation } from "../services/authApi";
import { FaUser, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useGetListCategoryQuery } from "../services/categoryApi";

const sort = [
  { _id: 1, name: "Top yêu thích", slug: "top-yeu-thich" },
  { _id: 2, name: "Top lượt xem", slug: "top-luot-xem" },
  { _id: 3, name: "Top ngày", slug: "top-ngay" },
  { _id: 4, name: "Top Tuần", slug: "top-tuan" },
  { _id: 5, name: "Top Tháng", slug: "top-thang" },
  { _id: 6, name: "Truyện mới", slug: "truyen-moi" },
];

const status = [
  { _id: 1, name: "Đang hoàn thành", slug: "dang-hoan-thanh" },
  { _id: 2, name: "Đã hoàn thành", slug: "da-hoan-thanh" },
];

const Header = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [dropdown, setDropDown] = useState(null); // Menu chính
  const [userDropdown, setUserDropdown] = useState(false); // Menu user
  const [mobileMenu, setMobileMenu] = useState(false); // Menu mobile
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: categories } = useGetListCategoryQuery();
  const categoryArr = categories?.category || [];

  const navRef = useRef();

  const handleDropdown = (type) => {
    setDropDown((prev) => (prev === type ? null : type));
  };

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
      toast.success("Đăng xuất thành công");
      setUserDropdown(false); // Đóng user menu
    } catch (err) {
      toast.error(err?.data?.message || "Đăng xuất thất bại");
    }
  };

  return (
    <header className="bg-[var(--header-bg)] text-white shadow-xl shadow-black/30 backdrop-blur-md z-[9999] relative">
      <div className="max-w-7xl mx-auto h-[70px] flex items-center justify-between px-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition"
        >
          <div className="text-3xl font-bold drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]">
            📚
          </div>
          <h1 className="text-2xl font-semibold tracking-wide drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)]">
            Truyện Hay
          </h1>
        </div>

        {/* Menu chính */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-6">
          <MenuItem
            title="Thể loại"
            active={dropdown === "Type"}
            onClick={() => handleDropdown("Type")}
            items={categoryArr}
            cols={4}
            navigate={navigate}
            setDropDown={setDropDown}
          />
          <MenuItem
            title="Sắp xếp"
            active={dropdown === "Sort"}
            onClick={() => handleDropdown("Sort")}
            items={sort}
            navigate={navigate}
            setDropDown={setDropDown}
          />
          <MenuItem
            title="Trạng thái"
            active={dropdown === "Status"}
            onClick={() => handleDropdown("Status")}
            items={status}
            navigate={navigate}
            setDropDown={setDropDown}
          />
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-4 py-2 rounded-full bg-white text-black w-[200px] md:w-[260px] focus:outline-none shadow-inner shadow-black/20"
            />
            <div className="absolute right-3 top-2.5 text-black cursor-pointer hover:opacity-70 transition">
              <FaSearch />
            </div>
          </div>

          {!isLogin ? (
            <Link
              to="/sign-in"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 rounded-xl transition shadow-lg shadow-black/30"
            >
              Đăng nhập
            </Link>
          ) : (
            <UserMenu
              userDropdown={userDropdown}
              setUserDropdown={setUserDropdown}
              handleSignOut={handleSignOut}
              categoryArr={categoryArr}
              navigate={navigate}
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          )}
        </div>
      </div>
    </header>
  );
};

/* MENU ITEM */
const MenuItem = ({ title, active, onClick, items, cols = 2, navigate, setDropDown }) => {
  const itemRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (active && itemRef.current && !itemRef.current.contains(e.target)) {
        onClick(); // tắt dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active, onClick]);

  return (
    <div ref={itemRef} className="relative">
      <div
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-150 hover:bg-white/10 ${
          active ? "bg-white/10" : ""
        }`}
      >
        <span>{title}</span>
        {active ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {active && (
        <div
          className={`absolute left-0 top-full mt-5 bg-[#1b253a] p-4 rounded-2xl 
            shadow-2xl shadow-black/40 grid ${
              cols === 4 ? "grid-cols-4 min-w-[500px]" : "grid-cols-2 min-w-[340px]"
            } gap-3 z-[999999] animate-fadeIn`}
        >
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                if (item.slug) navigate(`/${item.slug}`);
                setDropDown(null);
              }}
              className="hover:bg-white/10 px-3 py-2 rounded-xl cursor-pointer transition"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* USER MENU */
const UserMenu = ({ userDropdown, setUserDropdown, handleSignOut, navigate, categoryArr }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="relative flex gap-2">
      {/* User icon */}
      <div
        onClick={() => setUserDropdown((p) => !p)}
        className="text-xl bg-red-500 rounded-full p-2 hover:bg-red-600 shadow-lg shadow-black/40 cursor-pointer transition"
      >
        <FaUser />
      </div>

      {/* User dropdown */}
      {userDropdown && (
        <div className="absolute right-0 top-full mt-5 bg-[#1b253a] p-4 rounded-2xl shadow-2xl shadow-black/40 z-[999999] min-w-[180px] flex flex-col gap-3 animate-fadeIn">
          <Link
            to="/profile"
            className="px-4 py-2 bg-sky-700 hover:bg-sky-800 rounded-xl shadow-md text-center transition"
            onClick={() => setUserDropdown(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-xl shadow-md transition"
          >
            Đăng xuất
          </button>
        </div>
      )}

      {/* Mobile menu icon */}
      <div
        onClick={() => setMobileMenu((p) => !p)}
        className="flex lg:hidden items-center text-2xl px-4 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition"
      >
        <IoMdMenu />
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="fixed left-0 top-[70px] w-full bg-[#1b253a] p-5 shadow-2xl z-[999999] flex flex-col gap-4 rounded-b-2xl animate-fadeIn">
          <MobileDropdown title="Thể loại" items={categoryArr} navigate={navigate} setMobileMenu={setMobileMenu} cols={4} />
          <MobileDropdown title="Sắp xếp" items={sort} navigate={navigate} setMobileMenu={setMobileMenu} />
          <MobileDropdown title="Trạng thái" items={status} navigate={navigate} setMobileMenu={setMobileMenu} />
        </div>
      )}
    </div>
  );
};

/* MOBILE DROPDOWN */
const MobileDropdown = ({ title, items, navigate, setMobileMenu, cols = 2 }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition ${
          open ? "bg-white/10" : ""
        }`}
      >
        <span>{title}</span>
        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
 
      {open && (
        <div className={`mt-3 ml-2 grid bg-[#1b253a] p-4 rounded-2xl shadow-xl ${
              cols === 4 ? "grid-cols-4 " : "grid-cols-2 "
            } gap-3 animate-fadeIn`}>
          {items.map((i) => (
            <div
              key={i._id}
              onClick={() => {
                if (i.slug) navigate(`/${i.slug}`);
                setMobileMenu(false); // đóng menu mobile
              }}
              className="px-3 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition"
            >
              {i.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
