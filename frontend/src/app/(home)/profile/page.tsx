"use client";

import { RootState } from "@/src/store";
import { useEffect, useState } from "react";
import { FaSpinner, FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const [display, setDisplay] = useState<"Information" | "Setting">(
    "Information"
  );
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    displayName: "",
  });

  const [initialForm, setInitialForm] = useState(form);

  useEffect(() => {
    if (!user) return;

    const init = {
      username: user.username ?? "",
      email: user.email ?? "",
      fullName: user.fullname ?? "",
      displayName: user.displayName ?? "",
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(init);
    setInitialForm(init);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setForm(initialForm);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit:", form);
    setInitialForm(form);
    setIsEditing(false);
  };

  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-[20%_75%] gap-5 ml-5">
        {/* Sidebar */}
        <aside className="flex lg:flex-col gap-2 bg-[var(--card-bg)] lg:h-screen rounded-2xl px-4 py-2">
          <button
            onClick={() => setDisplay("Information")}
            className="flex gap-2 items-center px-4 py-2 hover:bg-[var(--card-hover-bg)] rounded-2xl"
          >
            <FaUser />
            <span>Thông tin tài khoản</span>
          </button>

          <button
            onClick={() => setDisplay("Setting")}
            className="flex gap-2 items-center px-4 py-2 hover:bg-[var(--card-hover-bg)] rounded-2xl"
          >
            <IoIosSettings />
            <span>Cài đặt</span>
          </button>
        </aside>

        {/* Content */}
        <section className="bg-[var(--card-bg)] h-screen rounded-2xl px-4 py-4 overflow-y-auto">
          {loading && (
            <div className="px-4 py-2 rounded-lg flex gap-2 items-center">
              <FaSpinner className="animate-spin text-white" />
              <div>Loading...</div>
            </div>
          )}

          {!loading && display === "Information" && (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Username */}
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="font-bold">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  disabled
                  placeholder="Username"
                  title="Username"
                  className="px-4 py-2 rounded-2xl bg-[var(--card-hover-bg)] outline-none disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  disabled
                  placeholder="Email"
                  title="Email"
                  className="px-4 py-2 rounded-2xl bg-[var(--card-hover-bg)] outline-none disabled:cursor-not-allowed"
                />
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="font-bold">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Full Name"
                  title="Full Name"
                  className="px-4 py-2 rounded-2xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Display Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="displayName" className="font-bold">
                  Display Name
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  value={form.displayName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Display Name"
                  title="Display Name"
                  className="px-4 py-2 rounded-2xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-5 col-span-full">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-green-500 rounded-2xl"
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 rounded-2xl"
                    >
                      Lưu
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-red-500 rounded-2xl"
                    >
                      Hủy
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;
