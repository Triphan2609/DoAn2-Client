import { NavLink } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import "../Auth.scss";

const Login = () => {
    return (
        <>
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
                                            <div className="line-break">
                                                <span>hoặc đăng nhập qua</span>
                                            </div>
                                            <div className="social-login text-center">
                                                <a
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
                                                </a>
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
