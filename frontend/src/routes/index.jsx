import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Story from "../pages/Story";
import Chapter from "../pages/Chapter";
import Terms from "../pages/Terms";
import Contact from "../pages/Contact";
import PrivatePolicy from "../pages/PrivatePolicy";
import About from "../pages/About";

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
                path: "story",
                // path: "story/:slugStory",
            },
            {
                element: <Chapter />,
                path: "story/chapter"
                //path: "story/:slugStory/:chapterSlug",
            },
            {
                element: <About />,
                path: "about",
            },
            {
                element: <PrivatePolicy />,
                path: "privacy",
            },
            {
                element: <Terms />,
                path: "terms",
            },
            {
                element: <Contact />,
                path: "contact",
            },
        ]
    }
]);

