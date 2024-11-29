import BlockAccount from "../../../components/BlockAccount/BlockAccount";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Account.scss";

const Info = () => {
    return (
        <div className="info-page" style={{ background: "#fff" }}>
            <BreadCrumb title="Trang khách hàng" />
            <section className="signup page_customer_account">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                            <BlockAccount />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                            <h1 className="title-head margin-top-10">
                                Thông tin tài khoản
                            </h1>
                            <div className="form-signup name-account m992">
                                <p>
                                    <strong>Họ tên:</strong> PiTi Coder
                                </p>
                                <p>
                                    {" "}
                                    <strong>Email:</strong> titp269@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Info;
