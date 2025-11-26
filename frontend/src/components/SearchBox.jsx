import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useSearchStoryQuery } from "../services/storyApi";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [openDrop, setOpenDrop] = useState(false);
  const debounced = useDebounce(search, 300);
  const navigate = useNavigate();

  const { data: result } = useSearchStoryQuery(
    { keyword: debounced },
    { skip: debounced.trim() === "" }
  );

  return (
    <div className="relative hidden lg:block">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpenDrop(true);
        }}
        placeholder="Tìm kiếm..."
        className="px-4 py-2 rounded-full bg-white text-black w-[260px] focus:outline-none shadow-inner"
      />
      <div className="absolute right-3 top-2.5 text-black">
        <FaSearch />
      </div>

      {openDrop && debounced && result?.data?.length > 0 && (
        <div className="absolute mt-2 left-0 w-full bg-white text-black rounded-xl shadow-xl max-h-[300px] overflow-y-auto z-[99999]">
          {result.data.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/story/${item.slug}`);
                setOpenDrop(false);
                setSearch("");
              }}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer border-b"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
