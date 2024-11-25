import { NavLink, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import "../Auth.scss";
import { Button, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { callRegister } from "../../../services/api";
import GoogleLoginComponent from "../../../components/GoogleLogin/GoogleLogin";

const Register = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { name, email, password, phone } = values;
        const res = await callRegister(name, email, password, phone);
        setIsSubmit(false);
        if (res?.data?.user) {
            message.success("Đăng ký tài khoản thành công!");
            navigate("/dang-nhap");
        } else {
            console.log(res);

            notification.error({
                message: "Có lỗi xảy ra",
                description: res.data.message,
                duration: 5,
            });
        }
    };
    return (
        <>
            <div className="login-page">
                <Header />
                <BreadCrumb title={"Đăng ký tài khoản"} />
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
                                            <li>
                                                <NavLink
                                                    to="/dang-nhap"
                                                    title="Đăng nhập"
                                                >
                                                    Đăng nhập
                                                </NavLink>
                                            </li>
                                            <li className="active">
                                                <NavLink title="Đăng ký">
                                                    Đăng ký
                                                </NavLink>
                                            </li>
                                        </ul>

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
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                                labelCol={{
                                                    span: 24,
                                                }}
                                                wrapperCol={{
                                                    span: 24,
                                                }}
                                                label="Họ và tên"
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập họ và tên",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập họ và tên" />
                                            </Form.Item>
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
                                                label="Số điện thoại"
                                                name="phone"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập số điện thoại",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập số điện thoại" />
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
                                                    ĐĂNG KÝ
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                        <div className="line-break">
                                            <span>hoặc đăng nhập qua</span>
                                        </div>
                                        <div className="social-login text-center">
                                            <GoogleLoginComponent />
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
                                            </a>
                                            <a
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
                <Footer />
            </div>
        </>
    );
};

export default Register;
