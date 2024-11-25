import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem("access_token");

    if (!token) {
        return <Navigate to="/" />; // Chuyển hướng về trang login nếu không có token
    }

    // Giải mã JWT và kiểm tra vai trò
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Giải mã payload của JWT
    const userRole = decodedToken.role; // Giả sử vai trò của người dùng nằm trong trường "role" trong JWT

    if (userRole !== "admin") {
        return <Navigate to="/" />; // Nếu không phải admin, điều hướng tới trang lỗi
    }

    return children; // Nếu là admin, render trang Admin
};

export default ProtectedRoute;
