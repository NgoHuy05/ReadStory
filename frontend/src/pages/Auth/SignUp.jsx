import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../services/authApi";
import toast from "react-hot-toast";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.username ||
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.repassword
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (form.password !== form.repassword) {
      toast.error("Mật khẩu không trùng nhau");
      return;
    }
    try {
      await signUp(form).unwrap();
      toast.success("Đăng kí thành công");
      navigate("/sign-in");
    } catch (error) {
      console.error("Lỗi đăng kí", error);
      toast.error(error?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="bg-[var(--main-bg)] text-white min-h-screen flex flex-col">
      <header className="bg-[var(--header-bg)] shadow-lg">
        <div className="max-w-7xl mx-auto h-[70px] flex items-center justify-between px-6">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="text-3xl">📚</div>
            <h1 className="text-2xl font-semibold">Truyện Hay</h1>
          </div>
          <div className="flex gap-2 items-center text-white">
            <div className="text-lg font-medium">Welcome</div>
            <FaHeart className="text-red-500 text-xl" />
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center flex-1 mt-5 px-4">
        <div className="w-full max-w-lg bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center">Đăng kí</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {[
              {
                label: "Username",
                name: "username",
                type: "text",
                placeholder: "Nhập username",
                autoComplete: "username",
              },
              {
                label: "Họ và tên",
                name: "fullName",
                type: "text",
                placeholder: "Nhập họ và tên",
                autoComplete: "name",
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "Nhập email",
                autoComplete: "email",
              },
              {
                label: "Mật khẩu",
                name: "password",
                type: "password",
                placeholder: "Nhập mật khẩu",
                autoComplete: "new-password",
              },
              {
                label: "Xác nhận mật khẩu",
                name: "repassword",
                type: "password",
                placeholder: "Nhập lại mật khẩu",
                autoComplete: "new-password",
              },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="font-medium">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  autoComplete={field.autoComplete}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                  className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
            ))}
            <button
              type="submit"
              className="mt-4 h-12 bg-red-500 hover:bg-red-400 rounded-xl font-semibold text-white text-lg transition"
            >
              Đăng kí
            </button>
          </form>
          <div className="text-center text-sm text-white/70">
            Bạn đã có tài khoản?{" "}
            <Link to="/sign-in" className="underline hover:text-red-400">
              Đăng nhập
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
