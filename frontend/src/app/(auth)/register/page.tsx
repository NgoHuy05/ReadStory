"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/src/store";
import {  signUp } from "@/src/store/authSlice";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      signUp({
        username: form.username,
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        repassword: form.repassword,
      })
    ).unwrap()
     .then(() => {
        router.push("/login"); 
     })
     .catch(() => {}); 
  };


  return (
    <div className="bg-[var(--main-bg)] text-white min-h-[95vh] flex flex-col">
      <main className="flex items-center justify-center flex-1">
        <div className="w-full max-w-lg bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center">Đăng kí</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {/** Username */}
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-medium">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Nhập username"
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/** Full Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname" className="font-medium">Họ và tên</label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Nhập họ và tên"
                autoComplete="name"
                value={form.fullname}
                onChange={(e) => setForm(prev => ({ ...prev, fullname: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/** Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Nhập email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/** Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/** Re-password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="repassword" className="font-medium">Xác nhận mật khẩu</label>
              <input
                id="repassword"
                name="repassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                autoComplete="new-password"
                value={form.repassword}
                onChange={(e) => setForm(prev => ({ ...prev, repassword: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-[var(--card-hover-bg)] outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            <button
              type="submit"
              className={`mt-4 h-12 bg-red-500 hover:bg-red-400 rounded-xl font-semibold text-white text-lg transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng kí"}
            </button>
          </form>

          <div className="text-center text-sm text-white/70">
            Bạn đã có tài khoản?{" "}
            <Link href="/login" className="underline hover:text-red-400">
              Đăng nhập
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
