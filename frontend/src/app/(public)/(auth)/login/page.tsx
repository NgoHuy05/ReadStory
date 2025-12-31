"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/src/store";
import { login } from "@/src/store/authSlice";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/"); 
    }
  }, [user, router]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username: form.username, password: form.password }));
  };


  return (
    <div className="bg-[var(--main-bg)] text-white min-h-[95vh] flex flex-col">
      <main className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center">Đăng nhập</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-medium">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, username: e.target.value }))
                }
                placeholder="Nhập username"
                autoComplete="username"
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            <button
              type="submit"
              className={`mt-4 h-12 bg-red-500 hover:bg-red-400 rounded-xl font-semibold text-white text-lg transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
          </form>
          <div className="text-center text-sm text-white/70">
            Bạn chưa có tài khoản?{" "}
            <Link href="/register" className="underline hover:text-red-400">
              Đăng kí
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
