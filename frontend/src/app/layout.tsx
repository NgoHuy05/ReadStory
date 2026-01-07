import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { Providers } from "./providers";
import ScrollToTop from "../components/ScrollToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <ScrollToTop />
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
