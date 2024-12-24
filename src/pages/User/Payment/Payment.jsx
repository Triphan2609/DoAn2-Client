import { Helmet } from "react-helmet";
import "./Payment.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, notification, Radio, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useSelector } from "react-redux";
import { callCheckOutCOD, callCheckOutZaloPay } from "../../../services/api";

const Payment = () => {
    const navigate = useNavigate();

    // Redux
    const cartItems = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.account.user);
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );

    // React
    const [value, setValue] = useState(1);
    const [payment_method, setPaymentMethod] = useState(
        "Thanh toán khi nhận hàng (COD)"
    );

    // Functions
    // Hàm tính tổng tiền
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    const onFinish = async (values) => {
        const totalPrice = calculateTotal();
        const { email, fullname, phone, address, description } = values;

        if (value === 1) {
            const res = await callCheckOutCOD(
                user.user_id,
                cartItems,
                totalPrice,
                payment_method,
                fullname,
                email,
                phone,
                address,
                description
            );

            if (res?.data?.orderId) {
                message.success("Đặt hàng thành công!!!");
                navigate("/thanh-toan/thanh-cong");
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                    duration: 5,
                });
            }
        } else {
            const res = await callCheckOutZaloPay(
                user.user_id,
                cartItems,
                totalPrice,
                payment_method,
                fullname,
                email,
                phone,
                address,
                description
            );

            if (res?.data) {
                window.location.href = res.data.zpt_url.order_url;
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                    duration: 5,
                });
            }
        }
    };

    const onChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === 1) {
            setPaymentMethod("Thanh toán khi nhận hàng (COD)");
        } else {
            setPaymentMethod(" Thanh toán bằng ZALO PAY");
        }
    };
    return (
        <div className="payment-page">
            <Helmet>
                <title>Thanh toán đơn đặt hàng</title>
            </Helmet>
            <div className="container ">
                <Form
                    layout={"vertical"}
                    initialValues={{
                        email: user && user?.email,
                        fullname: user && user?.name,
                        phone: user && user?.phone,
                        address: user && user?.address,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    name="checkout"
                    className="wrap"
                >
                    <div className="main">
                        <header className="main__header">
                            <div className="logo logo--center">
                                <NavLink to="/">
                                    <img
                                        className="logo__image  logo__image--medium "
                                        alt="Pet Shop"
                                        src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/logo.png?1722413377105"
                                    />
                                </NavLink>
                            </div>
                        </header>
                        <div className="main__content">
                            <div className="animate-floating-labels row">
                                <div className="col col-lg-6">
                                    <section className="section">
                                        <div className="section__header">
                                            <div className="layout-flex">
                                                <h2 className="section__title layout-flex__item layout-flex__item--stretch">
                                                    <i className="fa fa-id-card-o fa-lg section__title--icon hide-on-desktop"></i>
                                                    Thông tin nhận hàng
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="section__content">
                                            {/* <Form.Item
                                                label="Địa chỉ của bạn"
                                                style={{ fontWeight: "bold" }}
                                                name="diachi_sanco"
                                                rules={[
                                                    {
                                                        require: false,
                                                    },
                                                ]}
                                            >
                                                <Select>
                                                    <Select.Option value="sample">
                                                        Sample
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item> */}
                                            <Form.Item
                                                label="Email"
                                                style={{ fontWeight: "bold" }}
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập email",
                                                    },
                                                    {
                                                        type: "email",
                                                        message:
                                                            "Vui lòng nhập đúng định dạng email",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="Nhập email"
                                                    disabled={
                                                        isAuthenticated === true
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Họ và tên"
                                                style={{ fontWeight: "bold" }}
                                                name="fullname"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập họ và tên!",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập số họ và tên" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Điện thoại"
                                                style={{ fontWeight: "bold" }}
                                                name="phone"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập số điện thoại!",
                                                    },
                                                    {
                                                        type: "phone",
                                                        message:
                                                            "Vui lòng nhập đúng định dạng số điện thoại",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập số điện thoại" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Địa chỉ"
                                                style={{ fontWeight: "bold" }}
                                                name="address"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập địa chỉ!",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập số địa chỉ" />
                                            </Form.Item>
                                            <Form.Item
                                                style={{ fontWeight: "bold" }}
                                                label="Nội dung"
                                                name="description"
                                                rules={[
                                                    {
                                                        required: false,
                                                    },
                                                ]}
                                            >
                                                <TextArea
                                                    style={{ height: "100px" }}
                                                    className="form-control"
                                                    placeholder="Ghi chú "
                                                />
                                            </Form.Item>
                                        </div>
                                    </section>
                                </div>
                                <div className="col col-lg-6">
                                    <section className="section">
                                        <div className="section__header">
                                            <div className="layout-flex">
                                                <h2 className="section__title layout-flex__item layout-flex__item--stretch">
                                                    <i className="fa fa-truck fa-lg section__title--icon hide-on-desktop"></i>
                                                    Thanh toán
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="section__content">
                                            <Radio.Group
                                                onChange={onChange}
                                                value={value}
                                            >
                                                <Space direction="vertical">
                                                    <Radio value={1}>
                                                        Thanh toán khi giao hàng
                                                        (COD)
                                                    </Radio>
                                                    <Radio
                                                        value={2}
                                                        className="mt-2"
                                                    >
                                                        Thanh toán bằng ZALO PAY
                                                    </Radio>
                                                </Space>
                                            </Radio.Group>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className="sidebar">
                        <div className="sidebar__header">
                            <h2 className="sidebar__title">
                                Đơn hàng (2 sản phẩm)
                            </h2>
                        </div>
                        <div className="sidebar__content">
                            <div className="order-summary order-summary--is-collapsed">
                                <div className="order-summary__sections">
                                    <div className="order-summary__section order-summary__section--product-list order-summary__section--is-scrollable order-summary--collapse-element">
                                        <table className="product-table">
                                            <thead className="product-table__header">
                                                <tr>
                                                    <th>
                                                        <span className="visually-hidden">
                                                            Ảnh sản phẩm
                                                        </span>
                                                    </th>
                                                    <th>
                                                        <span className="visually-hidden">
                                                            Mô tả
                                                        </span>
                                                    </th>
                                                    <th>
                                                        <span className="visually-hidden">
                                                            Sổ lượng
                                                        </span>
                                                    </th>
                                                    <th>
                                                        <span className="visually-hidden">
                                                            Đơn giá
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems &&
                                                cartItems.length > 0
                                                    ? cartItems.map(
                                                          (item, index) => {
                                                              return (
                                                                  <tr
                                                                      key={
                                                                          index
                                                                      }
                                                                      className="product"
                                                                  >
                                                                      <td className="product__image">
                                                                          <div className="product-thumbnail">
                                                                              <div
                                                                                  className="product-thumbnail__wrapper"
                                                                                  data-tg-static=""
                                                                              >
                                                                                  <img
                                                                                      src={
                                                                                          "/public/" +
                                                                                          JSON.parse(
                                                                                              item.image_url
                                                                                          )[0]
                                                                                      }
                                                                                      alt={
                                                                                          item.name
                                                                                      }
                                                                                  />
                                                                              </div>
                                                                              <span className="product-thumbnail__quantity">
                                                                                  {
                                                                                      item.quantity
                                                                                  }
                                                                              </span>
                                                                          </div>
                                                                      </td>
                                                                      <th className="product__description">
                                                                          <span className="product__description__name">
                                                                              {
                                                                                  item.name
                                                                              }
                                                                          </span>
                                                                      </th>
                                                                      <td className="product__quantity visually-hidden">
                                                                          <em>
                                                                              Số
                                                                              lượng:
                                                                          </em>{" "}
                                                                          {
                                                                              item.quantity
                                                                          }
                                                                      </td>
                                                                      <td className="product__price">
                                                                          {new Intl.NumberFormat(
                                                                              "vi-VN",
                                                                              {
                                                                                  style: "currency",
                                                                                  currency:
                                                                                      "VND",
                                                                              }
                                                                          ).format(
                                                                              item.price
                                                                          )}
                                                                      </td>
                                                                  </tr>
                                                              );
                                                          }
                                                      )
                                                    : ""}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div
                                        className="order-summary__section order-summary__section--total-lines order-summary--collapse-element"
                                        data-define="{subTotalPriceText: '4.219.000₫'}"
                                        data-tg-refresh="refreshOrderTotalPrice"
                                        id="orderSummary"
                                    >
                                        <table className="total-line-table">
                                            <caption className="visually-hidden">
                                                Tổng giá trị
                                            </caption>
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <span className="visually-hidden">
                                                            Mô tả
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="visually-hidden">
                                                            Giá tiền
                                                        </span>
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody className="total-line-table__tbody">
                                                <tr className="total-line total-line--subtotal">
                                                    <th className="total-line__name">
                                                        Tạm tính
                                                    </th>
                                                    <td className="total-line__price">
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(
                                                            calculateTotal()
                                                        )}
                                                    </td>
                                                </tr>

                                                <tr className="total-line total-line--shipping-fee">
                                                    <th className="total-line__name">
                                                        Phí vận chuyển
                                                    </th>
                                                    <td className="total-line__price">
                                                        <span
                                                            className="origin-price"
                                                            data-bind="getTextShippingPriceOriginal()"
                                                        ></span>
                                                        <span data-bind="getTextShippingPriceFinal()">
                                                            Miễn phí
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot className="total-line-table__footer">
                                                <tr className="total-line payment-due">
                                                    <th className="total-line__name">
                                                        <span className="payment-due__label-total">
                                                            Tổng cộng
                                                        </span>
                                                    </th>
                                                    <td className="total-line__price">
                                                        <span
                                                            className="payment-due__price"
                                                            data-bind="getTextTotalPrice()"
                                                        >
                                                            {new Intl.NumberFormat(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "VND",
                                                                }
                                                            ).format(
                                                                calculateTotal()
                                                            )}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="order-summary__nav field__input-btn-wrapper hide-on-mobile layout-flex--row-reverse">
                                        <Button
                                            htmlType="submit"
                                            className="btn btn-checkout"
                                            style={{
                                                width: "100px",
                                                height: "40px",
                                            }}
                                        >
                                            ĐẶT HÀNG
                                        </Button>

                                        <NavLink
                                            to={"/gio-hang"}
                                            className="previous-link"
                                        >
                                            <i className="previous-link__arrow">
                                                ❮
                                            </i>
                                            <span className="previous-link__content">
                                                Quay về giỏ hàng
                                            </span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </Form>
            </div>
        </div>
    );
};

export default Payment;
