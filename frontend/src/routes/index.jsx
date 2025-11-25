import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Story from "../pages/Story";
import Chapter from "../pages/Chapter";
import Terms from "../pages/Terms";
import Contact from "../pages/Contact";
import PrivatePolicy from "../pages/PrivatePolicy";
import About from "../pages/About";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import NewStory from "../pages/Story/NewStory";
import SortStory from "../pages/Story/SortStory";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Profile />,
            path: "profile",
          },
        ],
      },
      {
        element: <Navigate to='/home' replace /> ,
        index: true
      },
      {
        element: <Home />,
        path: 'home'
      },
      {
        element: <Story />,
        path: "story/:slugStory",
      },
      {
        element: <NewStory />,
        path: "list-new-story",
      },
      {
        element: <SortStory />,
        path: "/:slugCategory",
      },
      {
        element: <Chapter />,
        path: "story/:slugStory/:slugChapter",
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
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
