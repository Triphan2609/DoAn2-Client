// CSS
import Header from "./components/Header/Header";
import "./styles/reset.scss";
import "./styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// SRC

// Library
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/User/Home/HomePage";
import Notfound from "./pages/Notfound/Notfound";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Contact from "./pages/User/Contact/Contact";
import Introduce from "./pages/User/Introduce/introduce";
import Product from "./pages/User/Product/Product";

const App = () => {
    const Layout = () => {
        return (
            <>
                <Header />
                <Outlet />
                <Footer />
            </>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <Notfound />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "lien-he",
                    element: <Contact />,
                },
                {
                    path: "gioi-thieu",
                    element: <Introduce />,
                },
                { path: "tat-ca-san-pham", element: <Product /> },
            ],
        },
        {
            path: "/dang-nhap",
            element: <Login />,
        },
        {
            path: "/dang-ky",
            element: <Register />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
