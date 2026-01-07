"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdMenu } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/authSlice";
import { useClickOutside } from "../hook/useClickOutside";
import { getListCategory } from "../store/categorySlice";

type DropdownKey = "cat" | null;

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { listCategory } = useSelector((s: RootState) => s.category);
  const { user } = useSelector((s: RootState) => s.auth);

  const [openMenu, setOpenMenu] = useState(false);

  // desktop
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

  // mobile
  const [openMobile, setOpenMobile] = useState<DropdownKey>(null);

  // user dropdown
  const [openUser, setOpenUser] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  useClickOutside(userRef, () => setOpenUser(false));

  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  //const listCategories = listCategory.map((c) => c.name);

  const toggle = (key: DropdownKey) =>
    setOpenDropdown((p) => (p === key ? null : key));

  const toggleMobile = (key: DropdownKey) =>
    setOpenMobile((p) => (p === key ? null : key));

  return (
    <header className="bg-[var(--header-bg)] text-white shadow-lg relative">
      {/* ================= TOP BAR ================= */}
      <div className="max-w-7xl mx-auto h-[70px] flex items-center justify-between px-4">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaBookOpen className="text-3xl text-red-500" />
          <h1 className="text-2xl font-semibold">Truyện Hay</h1>
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden lg:flex items-center gap-2">
          {/* THỂ LOẠI */}
          <div className="relative">
            <button
              onClick={() => toggle("cat")}
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              Thể loại
              {openDropdown === "cat" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            {openDropdown === "cat" && (
  <div className="absolute left-0 top-full mt-4 bg-[#1b253a] rounded-lg p-2 grid md:grid-cols-2 lg:grid-cols-4 gap-1 min-w-[500px] z-50">
    {listCategory.map((c) => (
      <div
        key={c._id}
        className="px-3 py-2 bg-[var(--card-bg)]/50 rounded hover:bg-white/10 text-sm cursor-pointer"
        onClick={() => {
          setOpenDropdown(null);
          router.push(`/category/${c.slug}`);
        }}
      >
        {c.name}
      </div>
    ))}
  </div>
)}

          </div>

          <div className="relative">
            <button
              onClick={() => router.push("/list")}
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              Danh sách
            </button>
          </div>
        </div>

        {/* ================= USER ================= */}
        <div className="hidden lg:flex items-center gap-2">
          <input
            placeholder="Tìm kiếm truyện..."
            className="px-4 py-2 rounded-full bg-white text-black w-[250px]"
          />

          <div ref={userRef} className="relative">
            {!user ? (
              <div className="h-10 w-[90px] bg-white/20 rounded-lg animate-pulse" />
            ) : (
              <>
                <div
                  onClick={() => setOpenUser((p) => !p)}
                  className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center cursor-pointer"
                >
                  AVT
                </div>

                {openUser && (
                  <div className="absolute right-0 top-full mt-4 bg-[#1b253a] rounded-lg p-3 w-[150px] z-50">
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded hover:bg-white/10 cursor-pointer"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => dispatch(logout())}
                      className="w-full mt-2 px-3 py-2 rounded bg-red-500 cursor-pointer"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          type="button"
          aria-label="menu"
          className="lg:hidden text-2xl p-2 cursor-pointer"
          onClick={() => setOpenMenu((p) => !p)}
        >
          <IoMdMenu />
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {openMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpenMenu(false)}
          />
          <div className="absolute top-full w-full bg-[#1b253a] z-50 p-4 space-y-4">
            {!user ? (
              <Link
                href="/login"
                className="block text-center py-3 bg-sky-600 rounded cursor-pointer"
              >
                Đăng nhập
              </Link>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="block py-3 px-4 bg-white/10 rounded cursor-pointer"
                >
                  Trang cá nhân
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="w-full py-3 bg-red-500 rounded cursor-pointer"
                >
                  Đăng xuất
                </button>
              </>
            )}

            {/* MOBILE DROPDOWNS */}
            {/* MOBILE DROPDOWNS */}
{[
  { key: "cat", title: "Thể loại", items: listCategory }, // Category[] từ Redux
  { key: "list", title: "Danh sách" },
].map((m) => (
  <div key={m.key}>
    <button
      onClick={() => {
        if (m.key === "list") {
          router.push("/list");
          setOpenMenu(false);
        } else {
          toggleMobile(m.key as DropdownKey);
        }
      }}
      className="w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer"
    >
      {m.title}
      {/* chỉ hiển thị mũi tên nếu có items */}
      {m.items && (openMobile === m.key ? <IoIosArrowUp /> : <IoIosArrowDown />)}
    </button>

    {/* chỉ render dropdown nếu m.items tồn tại */}
    {m.items && openMobile === m.key && (
      <div className="mt-3 ml-4 grid grid-cols-2 gap-2">
        {m.items.map((c) => (
          <div
            key={c._id}
            className="px-3 py-2 bg-[var(--card-bg)]/50 rounded text-sm hover:bg-white/10 cursor-pointer"
            onClick={() => {
              router.push(`/category/${c.slug}`);
              setOpenMenu(false);
            }}
          >
            {c.name}
          </div>
        ))}
      </div>
    )}
  </div>
))}

          </div>
        </>
      )}
    </header>
  );
}
