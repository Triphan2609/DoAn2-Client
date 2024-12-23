import { NavLink } from "react-router-dom";
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";
import { Helmet } from "react-helmet";

const Successfully = () => {
    return (
        <div className="successfully-page">
            <Helmet>
                <title>Đặt hàng thành công</title>
            </Helmet>
            <BreadCrumb title={"Đặt hàng thành công"} />
            <div className="container" style={{ margin: "60 0" }}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="image-404">
                            <img
                                className="img-responsive center-block"
                                src="https://img.freepik.com/free-vector/mobile-online-service-payment-concept-mobile-payments-online-payment-app-smartphone-has-security-protection-contactless-payment-business-finance-pay-transaction-online_1150-56215.jpg?t=st=1733903015~exp=1733906615~hmac=c1d0bfe6ddc2e8d66e6d358f0b642e7f1235ce2028f7c24f8310206c8084881e&w=1380"
                                alt="404"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="page-404">
                            <h1>Cảm ơn quý khách</h1>
                            <p className="land">
                                Đơn hàng của quý khách sẽ được chuyển hàng cho
                                bên vận chuyển quý khách vui lòng chú ý điện
                                thoại sau 2-3 ngày đặt hàng
                            </p>
                            <div className="mt-5">
                                <NavLink
                                    to="/"
                                    className="btn btn-blues"
                                    title="Về trang chủ"
                                >
                                    Về trang chủ
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Successfully;
