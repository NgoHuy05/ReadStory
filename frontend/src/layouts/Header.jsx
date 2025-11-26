// Header.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../services/authApi";
import { useGetListCategoryQuery } from "../services/categoryApi";
import { useGetProfileQuery } from "../services/userApi";
import { saveUser } from "../redux/slice/userSlice";
import MenuItem from "../components/MenuItem";
import UserMenu from "../components/UserMenu";
import SearchBox from "../components/SearchBox";
import MobileDropdown from "../components/MobileDropdown";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [dropdown, setDropDown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Lấy profile
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !isLogin || !accessToken,
  });

  useEffect(() => {
    if (profileData?.user) {
      dispatch(saveUser(profileData.user));
    }
  }, [profileData, dispatch]);

  // Lấy danh sách category
  const { data: categoriesData } = useGetListCategoryQuery();
  const categoryArr = categoriesData?.category || [];

  const [signOut] = useSignOutMutation();
  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
      dispatch({ type: "auth/logOut" });
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <header className="bg-[var(--header-bg)] text-white shadow-xl relative">
      <div className="max-w-7xl mx-auto h-[70px] flex items-center justify-between px-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="text-3xl font-bold">📚</div>
          <h1 className="text-2xl font-semibold">Truyện Hay</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <MenuItem
            title="Thể loại"
            items={categoryArr}
            active={dropdown === "Type"}
            onClick={() => setDropDown(dropdown === "Type" ? null : "Type")}
            setDropDown={setDropDown}
            cols={4}
            navigate={navigate}
          />
          {(profileData?.user?.role === "manager" || profileData?.user?.role === "admin") && (
            <MenuItem title="Quản lí" onClick={() => navigate("/manage")} />
          )}
          {profileData?.user?.role === "admin" && (
            <MenuItem title="Admin" onClick={() => navigate("/admin")} />
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <SearchBox />
          <UserMenu user={profileData?.user} onSignOut={handleSignOut} />

          {/* Mobile Menu Toggle */}
          <div
            onClick={() => setMobileMenu((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 cursor-pointer"
          >
            <IoMdMenu className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="fixed left-0 top-[70px] w-full bg-[#1b253a] p-5 shadow-2xl z-[999999] flex flex-col gap-4 rounded-b-2xl animate-fadeIn">
          <MobileDropdown
            title="Thể loại"
            items={categoryArr}
            navigate={navigate}
            setMobileMenu={setMobileMenu}
            cols={4}
          />
          {(profileData?.user?.role === "manager" || profileData?.user?.role === "admin") && (
            <MobileDropdown
              title="Quản lí"
              onClick={() => navigate("/manage")}
              setMobileMenu={setMobileMenu}
            />
          )}
          {profileData?.user?.role === "admin" && (
            <MobileDropdown
              title="Admin"
              onClick={() => navigate("/admin")}
              setMobileMenu={setMobileMenu}
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
