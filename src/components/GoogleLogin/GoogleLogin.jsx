import { GoogleLogin } from "@react-oauth/google";
import axios from "../../utils/axiosCustomize.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { message, notification } from "antd";
import "./GoogleLogin.scss";
const GoogleLoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginSuccess = async (response) => {
        const tokenId = response.credential; // Nhận tokenId từ Google

        // Gửi token đến backend để xác thực
        const res = await axios.post("/auth/google", {
            tokenId,
        });

        if (res?.data?.user) {
            localStorage.setItem("access_token", res.data.token);
            dispatch(doLoginAction(res.data.user));
            message.success("Đăng nhập tài khoản thành công!");
            navigate("/");
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.data.message,
                duration: 5,
            });
        }
    };

    const handleLoginFailure = (error) => {
        notification.error({
            message: "Có lỗi xảy ra",
            description: error,
            duration: 5,
        });
    };

    return (
        <div style={{ padding: "0 10px " }}>
            <GoogleLogin
                size={"large"}
                width="50%"
                shape="rectangular"
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                className="google-login-btn"
            />
        </div>
    );
};

export default GoogleLoginComponent;
