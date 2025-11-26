import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserMenu = ({ onSignOut }) => {
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <div className="relative flex gap-2">
      <div
        onClick={() => setUserDropdown((p) => !p)}
        className="text-xl bg-red-500 rounded-full p-2 hover:bg-red-600 cursor-pointer"
      >
        <FaUser />
      </div>

      {userDropdown && (
        <div className="absolute right-0 top-full mt-5 bg-[#1b253a] p-4 rounded-2xl shadow-2xl min-w-[180px] z-[9999] flex flex-col gap-3">
          <Link
            to="/profile"
            className="px-4 py-2 bg-sky-700 rounded-xl text-center"
            onClick={() => setUserDropdown(false)}
          >
            Profile
          </Link>
          <button
            onClick={onSignOut}
            className="px-4 py-2 bg-red-700 rounded-xl"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
