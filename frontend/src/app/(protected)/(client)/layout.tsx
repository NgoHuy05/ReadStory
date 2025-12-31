import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import AuthGuard from "@/src/components/AuthGuard";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
    <AuthGuard>
      <Header />
      <div className="min-h-screen bg-[var(--main-bg)] text-white dark:bg-darkMode-800 py-4">
          {children}
      </div>
      <Footer />
      </AuthGuard>
    </>
  );
}
