import { NavLink, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import "../Auth.scss";
import { Helmet } from "react-helmet";
import { Button, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { callLogin } from "../../../services/api";
import { doLoginAction } from "../../../redux/account/accountSlice";
import GoogleLoginComponent from "../../../components/GoogleLogin/GoogleLogin";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { email, password } = values;
        setIsSubmit(true);
        const res = await callLogin(email, password);
        setIsSubmit(false);
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

    return (
        <>
            <Helmet>
                <title>Đăng nhập</title>
            </Helmet>
            <div className="login-page">
                <Header />
                <BreadCrumb title={"Đăng nhập tài khoản"} />
                <div className="container margin-bottom-40 margin-top-40">
                    <div className="row justify-content-md-center">
                        <div className="col-lg-7 col-md-12">
                            <div className="page-login account-box-shadow">
                                <div id="login" className="row">
                                    <div className="col-lg-6 col-md-6 account-banner order-lg-first order-md-first order-sm-last order-last">
                                        <div className="account_policy_title">
                                            Quyền lợi thành viên
                                        </div>
                                        <div className="account_policy_content">
                                            <p>
                                                Mua hàng khắp thế giới cực dễ
                                                dàng, nhanh chóng
                                            </p>
                                            <p>
                                                Theo dõi chi tiết đơn hàng, địa
                                                chỉ thanh toán dễ dàng
                                            </p>
                                            <p>
                                                Nhận nhiều chương trình ưu đãi
                                                hấp dẫn từ chúng tôi
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 evo-account-content order-lg-last order-md-last order-sm-first order-first">
                                        <ul className="auth-block__menu-list">
                                            <li className="active">
                                                <NavLink title="Đăng nhập">
                                                    Đăng nhập
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/dang-ky"
                                                    title="Đăng ký"
                                                >
                                                    Đăng ký
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <div id="evo-login">
                                            <div className="clearfix"></div>

                                            <Form
                                                layout={"vertical"}
                                                name="basic"
                                                style={{
                                                    maxWidth: "100%",
                                                    padding: "0 10px",
                                                }}
                                                initialValues={{
                                                    remember: true,
                                                }}
                                                onFinish={onFinish}
                                                autoComplete="off"
                                            >
                                                <Form.Item
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                    labelCol={{
                                                        span: 24,
                                                    }}
                                                    wrapperCol={{
                                                        span: 24,
                                                    }}
                                                    label="Email"
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Vui lòng nhập email",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Nhập email" />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Mật khẩu"
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Vui lòng nhập mật khẩu!",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Nhập mật khẩu"
                                                        type="password"
                                                    />
                                                </Form.Item>

                                                <Form.Item label={null}>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        className="btn-blues"
                                                        style={{
                                                            marginTtop: "10px",
                                                            float: "right",
                                                            width: "100%",
                                                            padding: "0px",
                                                        }}
                                                        loading={isSubmit}
                                                    >
                                                        ĐĂNG NHẬP
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                            <div className="line-break">
                                                <span>hoặc đăng nhập qua</span>
                                            </div>
                                            <div className="social-login text-center">
                                                {/* <a
                                                    href="javascript:void(0)"
                                                    className="social-login--facebook"
                                                >
                                                    <img
                                                        width="129px"
                                                        height="37px"
                                                        alt="facebook-login-button"
                                                        src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                                                    />
                                                </a> */}
                                                <GoogleLoginComponent />
                                                {/* <a
                                                    href="javascript:void(0)"
                                                    className="social-login--google"
                                                >
                                                    <img
                                                        width="129px"
                                                        height="37px"
                                                        alt="google-login-button"
                                                        src="//bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                                                    />
                                                </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Login;
