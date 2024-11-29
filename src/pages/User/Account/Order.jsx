import BlockAccount from "../../../components/BlockAccount/BlockAccount";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Account.scss";

const Order = () => {
    return (
        <div className="order-page" style={{ background: "#fff" }}>
            <BreadCrumb title="Trang đơn hàng" />
            <section className="signup page_customer_account">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                            <BlockAccount />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                            <h1 className="title-head margin-top-10">
                                Đơn hàng của bạn
                            </h1>
                            <div className="col-xs-12 col-sm-12 col-lg-12 no-padding">
                                <div className="my-account">
                                    <div className="dashboard">
                                        <div className="recent-orders">
                                            <div className="table-responsive tab-all">
                                                <table
                                                    className="table table-cart table-order"
                                                    id="my-orders-table"
                                                >
                                                    <thead className="thead-default">
                                                        <tr>
                                                            <th>Đơn hàng</th>
                                                            <th>Ngày</th>
                                                            <th>Địa chỉ</th>
                                                            <th>
                                                                Giá trị đơn hàng
                                                            </th>
                                                            <th>
                                                                TT thanh toán
                                                            </th>
                                                            <th>
                                                                TT vận chuyển
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="6">
                                                                <p>
                                                                    Không có đơn
                                                                    hàng nào.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="paginate-pages pull-right page-account text-right col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Order;
