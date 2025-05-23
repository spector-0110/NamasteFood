import ReactDOM from "react-dom/client";
import React, {lazy, Suspense} from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestraMenu";
import ThemeProvider, { useTheme } from "./context/ThemeProvider";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const Groc=lazy( () => import("./components/Groc"));

const AppLayout = () => {
    const { theme } = useTheme();
    return (
        <div className="app" data-theme={theme}>
            <Header />
            <Outlet />
        </div>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <ThemeProvider>
                <AppLayout />
            </ThemeProvider>
        ),
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path:"/contact",
                element: <Contact />
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading...</h1>}><Groc /></Suspense>
            }   
        ]
    }
]);

root.render(<RouterProvider router={appRouter} />);