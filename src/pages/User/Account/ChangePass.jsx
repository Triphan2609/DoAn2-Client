import BlockAccount from "../../../components/BlockAccount/BlockAccount";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Account.scss";

const ChangePass = () => {
    return (
        <div className="change-pass-page">
            <BreadCrumb title="Thay đổi mật khẩu" />
            <section className="signup page_customer_account">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                            <BlockAccount />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                            <h1 className="title-head margin-top-10">
                                Đổi mật khẩu
                            </h1>
                            <div className="page-login">
                                <form
                                    id="change_customer_password"
                                    acceptCharset="UTF-8"
                                    className="has-validation-callback"
                                >
                                    <p>
                                        Để đảm bảo tính bảo mật vui lòng đặt mật
                                        khẩu với ít nhất 8 kí tự
                                    </p>
                                    <div className="form-signup clearfix">
                                        <fieldset className="form-group">
                                            <label htmlFor="oldPass">
                                                Mật khẩu cũ{" "}
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Mật khẩu cũ"
                                                name="OldPassword"
                                                id="OldPass"
                                                required=""
                                                className="form-control form-control-lg"
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label htmlFor="changePass">
                                                Mật khẩu mới{" "}
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Mật khẩu mới"
                                                name="Password"
                                                id="changePass"
                                                required=""
                                                className="form-control form-control-lg"
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label htmlFor="confirmPass">
                                                Xác nhận lại mật khẩu{" "}
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Xác nhận lại mật khẩu"
                                                name="ConfirmPassword"
                                                id="confirmPass"
                                                required=""
                                                className="form-control form-control-lg"
                                            />
                                        </fieldset>
                                        <button className="button btn-edit-addr btn btn-blues btn-more">
                                            <i className="hoverButton"></i>Đặt
                                            lại mật khẩu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChangePass;
