import Link from "next/link";
import { FaHeart } from "react-icons/fa";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <header className="text-white bg-[var(--header-bg)] shadow-lg">
          <div className="max-w-7xl mx-auto h-[70px] flex items-center justify-between px-6">
            <Link
              href="/"
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
        {children}
    </>
  );
}
