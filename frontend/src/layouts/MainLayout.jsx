import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useDispatch } from "react-redux";
import { useRefreshTokenMutation } from "../services/authApi";
import { useEffect } from "react";
import { logOut, setCredentials } from "../redux/slice/authSlice";

const MainLayout = () => {
      const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await refreshToken().unwrap();
        dispatch(setCredentials({ accessToken: res.accessToken }));
      } catch {
        dispatch(logOut());
      }
    };
    refresh();
  }, [dispatch, refreshToken]);

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