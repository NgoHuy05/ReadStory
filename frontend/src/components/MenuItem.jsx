import { useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MenuItem = ({ title, items, active, onClick, cols = 2, navigate, setDropDown }) => {
  const itemRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (active && itemRef.current && !itemRef.current.contains(e.target)) {
        onClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active, onClick]);

  return (
    <div ref={itemRef} className="relative">
      <div
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/10 ${
          active ? "bg-white/10" : ""
        }`}
      >
        <span>{title}</span>
        {items && (active ? <IoIosArrowUp /> : <IoIosArrowDown />)}
      </div>

      {active && items && (
        <div
          className={`absolute left-0 top-full mt-5 bg-[#1b253a] p-4 rounded-2xl shadow-2xl z-[9999] grid ${
            cols === 4
              ? "grid-cols-4 min-w-[500px]"
              : "grid-cols-2 min-w-[340px]"
          } gap-3`}
        >
          {items.map((item) => (
            <div
              key={item._id}
  onClick={() => {
    if (item.slug) navigate(`/category/${item.slug}`);
    setDropDown(null); // đóng dropdown sau khi navigate
  }}              className="hover:bg-white/10 px-3 py-2 rounded-xl cursor-pointer transition"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
