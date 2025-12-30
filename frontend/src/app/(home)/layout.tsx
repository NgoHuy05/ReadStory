import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[var(--main-bg)] text-white dark:bg-darkMode-800 py-4">
          {children}
      </div>
      <Footer />
    </>
  );
}
