import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <>
        <Header />
        <div className="bg-black">Main Layout</div>
        <Outlet />
        <Footer />
        </>
    );
};

export default MainLayout;