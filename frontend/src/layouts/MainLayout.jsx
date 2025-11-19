import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
    return (
        <>
        <ScrollToTop />
        <Header />
        <div className="min-h-screen bg-[var(--main-bg)] text-white dark:bg-darkMode-800 py-4">
            <Outlet />
        </div>
        <Footer />
        </>
    );
};

export default MainLayout;