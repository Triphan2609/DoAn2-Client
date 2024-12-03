import { NavLink } from "react-router-dom";
import "./BlockAccount.scss";
import { useSelector } from "react-redux";

const BlockAccount = () => {
    const isLoginWithGoogle = useSelector(
        (state) => state.account.isLoginWithGoogle
    );

    return (
        <>
            <div className="block-account">
                <h5 className="title-account margin-top-10">Trang tài khoản</h5>
                <p>
                    Xin chào, <span>PiTi Coder</span>
                    &nbsp;!
                </p>
                <ul>
                    <li>
                        <NavLink
                            to={"/tai-khoan/thong-tin-tai-khoan"}
                            disabled="disabled"
                            title="Thông tin tài khoản"
                            className={({ isActive }) =>
                                isActive ? "title-info active" : "title-info"
                            }
                        >
                            Thông tin tài khoản
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/tai-khoan/don-hang"
                            className={({ isActive }) =>
                                isActive ? "title-info active" : "title-info"
                            }
                            title="Đơn hàng của bạn"
                            activeClassName="active"
                        >
                            Đơn hàng của bạn
                        </NavLink>
                    </li>
                    {isLoginWithGoogle && isLoginWithGoogle === false ? (
                        <li>
                            <NavLink
                                to="/tai-khoan/doi-mat-khau"
                                className={({ isActive }) =>
                                    isActive
                                        ? "title-info active"
                                        : "title-info"
                                }
                                title="Đổi mật khẩu"
                            >
                                Đổi mật khẩu
                            </NavLink>
                        </li>
                    ) : (
                        ""
                    )}

                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "title-info active" : "title-info"
                            }
                            to="/tai-khoan/dia-chi"
                            title="Sổ địa chỉ"
                        >
                            Sổ địa chỉ (0)
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default BlockAccount;
