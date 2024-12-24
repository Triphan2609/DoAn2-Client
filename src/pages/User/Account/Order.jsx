import { useEffect, useState } from "react";
import BlockAccount from "../../../components/BlockAccount/BlockAccount";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Account.scss";
import { callFetchAllOrdersByUserId } from "../../../services/api";
import { useSelector } from "react-redux";

const Order = () => {
    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.account.user);

    const fetchAllOrdersByUserId = async (user) => {
        setLoading(true);
        const res = await callFetchAllOrdersByUserId(user.user_id);
        if (res && res.data) {
            let raw = res.data.orders;
            setLoading(false);
            setOrders(raw);
        }
    };

    useEffect(() => {
        fetchAllOrdersByUserId(user);
    }, [user]);

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
                                                            <th>
                                                                Ngày đặt hàng
                                                            </th>
                                                            <th>
                                                                Địa chỉ nhận
                                                                hàng
                                                            </th>
                                                            <th>
                                                                Số điện thoại
                                                            </th>
                                                            <th>Tổng tiền</th>
                                                            <th>
                                                                Phương thức
                                                                thanh toán
                                                            </th>
                                                            <th>Ghi chú</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {orders &&
                                                        orders?.length > 0 ? (
                                                            orders?.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <tr
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <td
                                                                                style={{
                                                                                    textAlign:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                {index +
                                                                                    1}
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    textAlign:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                {new Intl.DateTimeFormat(
                                                                                    "vi-VN",
                                                                                    {
                                                                                        day: "2-digit",
                                                                                        month: "2-digit",
                                                                                        year: "numeric",
                                                                                    }
                                                                                ).format(
                                                                                    new Date(
                                                                                        item.createdAt
                                                                                    )
                                                                                )}
                                                                            </td>

                                                                            <td>
                                                                                {
                                                                                    item.address
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    textAlign:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item.phone
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                style={{
                                                                                    textAlign:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                {new Intl.NumberFormat(
                                                                                    "vi-VN",
                                                                                    {
                                                                                        style: "currency",
                                                                                        currency:
                                                                                            "VND",
                                                                                    }
                                                                                ).format(
                                                                                    item.total_price
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    item.payment_method
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    item.description
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="6">
                                                                    <p>
                                                                        Không có
                                                                        đơn hàng
                                                                        nào.
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        )}
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
