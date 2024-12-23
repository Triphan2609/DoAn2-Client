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
import Introduce from "./pages/User/Introduce/introduce";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import Info from "./pages/User/Account/Info";
import Order from "./pages/User/Account/Order";
import ChangePass from "./pages/User/Account/ChangePass";
import ProductDetail from "./pages/User/Product/ProductDetail";
import AllProducts from "./pages/User/Product/AllProducts";
import Contact from "./pages/User/Contact/Contact";
import FindPage from "./pages/User/FindPage/FindPage";
import Payment from "./pages/User/Payment/Payment";
import Cart from "./pages/User/Cart/Cart";
import ProductsAnimals from "./pages/User/Product/ProductsAnimals";
import ProductsCategories from "./pages/User/Product/ProductsCategories";
import Successfully from "./pages/User/Payment/Successfully/Successfully";
import Dashboard from "./pages/Admin/Dasboard/Dashboard";
import ManageUser from "./pages/Admin/Manage/ManageUser";
import ManageProduct from "./pages/Admin/Manage/ManageProduct";
import ManageOrder from "./pages/Admin/Manage/ManageOrder";

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
                {
                    path: "san-pham/tat-ca-san-pham",
                    element: <AllProducts />,
                },
                {
                    path: "san-pham/san-pham-cho-meo",
                    element: <ProductsAnimals />,
                },
                {
                    path: "san-pham/san-pham-cho-cho",
                    element: <ProductsAnimals />,
                },
                {
                    path: "san-pham/loai-san-pham",
                    element: <ProductsCategories />,
                },
                {
                    path: "tai-khoan/thong-tin-tai-khoan",
                    element: <Info />,
                },
                {
                    path: "tai-khoan/don-hang",
                    element: <Order />,
                },
                {
                    path: "tai-khoan/doi-mat-khau",
                    element: <ChangePass />,
                },
                {
                    path: "san-pham/chi-tiet-san-pham/:slug",
                    element: <ProductDetail />,
                },
                {
                    path: "tim-kiem",
                    element: <FindPage />,
                },
                {
                    path: "gio-hang",
                    element: <Cart />,
                },
                {
                    path: "thanh-toan/thanh-cong",
                    element: <Successfully />,
                },
            ],
        },
        {
            path: "dang-nhap",
            element: <Login />,
        },
        {
            path: "dang-ky",
            element: <Register />,
        },
        {
            path: "thanh-toan",
            element: <Payment />,
        },

        {
            path: "admin",
            element: (
                <ProtectedRoute>
                    <Admin />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                },
                {
                    path: "/admin/account",
                    element: <ManageUser />,
                },
                {
                    path: "/admin/product",
                    element: <ManageProduct />,
                },
                {
                    path: "/admin/order",
                    element: <ManageOrder />,
                },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
