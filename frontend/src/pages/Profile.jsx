import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../services/userApi";
import { useSelector } from "react-redux";

const Profile = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [display, setDisplay] = useState("Information");
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();
  const { data, isLoading } = useGetProfileQuery(undefined, {
    skip: !accessToken,
  });
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    displayName: "",
  });

  const [initialForm, setInitialForm] = useState({
    username: "",
    email: "",
    fullName: "",
    displayName: "",
  });

  useEffect(() => {
    if (data?.user) {
      const init = {
        username: data.user.username,
        email: data.user.email,
        fullName: data.user.fullName,
        displayName: data.user.displayName,
      };
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialForm(init);
      setForm(init);
    }
  }, [data]);

  const handleDisplay = (type) => setDisplay(type);

  const handleCancel = () => {
    setIsEditing(false);
    setForm(initialForm);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        fullName: form.fullName,
        displayName: form.displayName,
      }).unwrap();

      setInitialForm((prev) => ({
        ...prev,
        fullName: form.fullName,
        displayName: form.displayName,
      }));

      setIsEditing(false);
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    }
  };

  if (isLoading) return <div className="text-white p-4">Loading...</div>;

  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-[20%_75%] gap-5 ml-5">
        
        <div className="flex lg:flex-col gap-2 bg-[var(--card-bg)] h-full lg:h-screen rounded-2xl px-4 py-2">
          <div
            onClick={() => handleDisplay("Information")}
            className="flex gap-2 items-center px-4 py-2 hover:bg-[var(--card-hover-bg)] rounded-2xl cursor-pointer"
          >
            <FaUser />
            <span>Thông tin tài khoản</span>
          </div>
          <div
            onClick={() => handleDisplay("Setting")}
            className="flex gap-2 items-center px-4 py-2 hover:bg-[var(--card-hover-bg)] rounded-2xl cursor-pointer"
          >
            <IoIosSettings />
            <span>Cài đặt</span>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] h-screen rounded-2xl px-4 py-2 overflow-y-auto">
          {display === "Information" && (
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label className="font-bold">Username</label>
                <input
                  name="username"
                  value={form.username}
                  disabled
                  className="px-4 py-2 rounded-2xl bg-[var(--card-hover-bg)]/60 outline-none cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold">Email</label>
                <input
                  name="email"
                  value={form.email}
                  disabled
                  className="px-4 py-2 rounded-2xl bg-[var(--card-hover-bg)]/60 outline-none cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold">Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-2xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold">Display Name</label>
                <input
                  name="displayName"
                  value={form.displayName}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-2xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-5 col-span-full">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="px-4 py-2 bg-green-500 rounded-2xl hover:bg-green-400 cursor-pointer transition"
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 rounded-2xl hover:bg-green-400 cursor-pointer transition"
                    >
                      Lưu
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleCancel();
                      }}
                      className="px-4 py-2 bg-red-500 rounded-2xl hover:bg-red-400 cursor-pointer transition"
                    >
                      Hủy
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
