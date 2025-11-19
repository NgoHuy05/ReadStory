import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slice/authSlice";

const SignIn = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [signIn] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.username || !form.password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      const res = await signIn(form).unwrap();
      dispatch(setCredentials(res.accessToken));
      localStorage.setItem("token", res.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập", error);
      if (error.data) alert(error.data.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="bg-[var(--main-bg)] text-white min-h-screen flex flex-col">
      <header className="bg-[var(--header-bg)] shadow-lg">
        <div className="max-w-7xl mx-auto h-[70px] flex items-center justify-between px-6">
          <Link to='/'
           
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="text-3xl">📚</div>
            <h1 className="text-2xl font-semibold">Truyện Hay</h1>
          </Link>
          <div className="flex gap-2 items-center text-white">
            <div className="text-lg font-medium">Welcome</div>
            <FaHeart className="text-red-500 text-xl" />
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center flex-1 mt-10 px-4">
        <div className="w-full max-w-md bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center">Đăng nhập</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Username</label>
              <input
                value={form.username}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, username: e.target.value }))
                }
                type="text"
                placeholder="Nhập username"
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none  focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium">Mật khẩu</label>
              <input
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                type="password"
                placeholder="Nhập mật khẩu"
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            <button
              type="submit"
              className="mt-4 h-12 bg-red-500 hover:bg-red-400 rounded-xl font-semibold text-white text-lg transition"
            >
              Đăng Nhập
            </button>
          </form>
          <div className="text-center text-sm text-white/70">
            Bạn chưa có tài khoản?{" "}
            <Link to="/sign-up" className="underline hover:text-red-400">
              Đăng kí
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
