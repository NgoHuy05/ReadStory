import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Story from "../pages/Story";
import Chapter from "../pages/Chapter";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                element: <Home />,
                index: true,
            },
            {      
                element: <Story />,
                path: "story/:slug",
            },
            {
                element: <Chapter />,
                path: "story/:slug/:chapterSlug",
            }
        ]
    }
]);

