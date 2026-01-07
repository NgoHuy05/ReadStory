import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] text-white py-10 px-5 flex flex-col gap-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl bg-[var(--footer-bg)] font-bold">Truyện Hay</h2>
          <p className="text-white/80 leading-relaxed">
            Nền tảng đọc truyện online miễn phí, cập nhật nhanh – trải nghiệm mượt mà.
          </p>
        </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Thông tin</h3>
          <ul className="space-y-2 text-white/80">
            <li className="hover:text-white cursor-pointer transition">
              <Link href="/about">Giới thiệu </Link>
              </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href="/policy">Chính sách bảo mật</Link>
              </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href="/terms">Điều khoản sử dụng</Link>
              </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href="/contact">Liên hệ</Link>
              </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Kết nối</h3>
          <ul className="space-y-2 text-white/80">
            <li className="hover:text-white cursor-pointer transition"> 
              <Link href="https://www.facebook.com/profile.php?id=61579054337647">Facebook</Link>
              </li>
            <li className="hover:text-white cursor-pointer transition">Email</li>
          </ul>
        </div>
      </div>
</div>


      <div className="text-center text-white/70 text-sm">
        © 2025 TruyenHay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;