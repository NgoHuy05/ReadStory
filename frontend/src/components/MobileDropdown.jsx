import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MobileDropdown = ({ title, items, navigate, setMobileMenu, cols = 2, onClick }) => {
  const [open, setOpen] = useState(false);

  if (!items) {
    return (
      <div
        onClick={() => {
          onClick && onClick();
          setMobileMenu(false);
        }}
        className="px-4 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition"
      >
        {title}
      </div>
    );
  }

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
        <div
          className={`mt-3 ml-2 grid bg-[#1b253a] p-4 rounded-2xl shadow-xl ${
            cols === 4 ? "grid-cols-4" : "grid-cols-2"
          } gap-3`}
        >
          {items.map((i) => (
            <div
              key={i._id}
              onClick={() => {
                if (i.slug) navigate(`/category/${i.slug}`);
                setMobileMenu(false);
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

export default MobileDropdown;
