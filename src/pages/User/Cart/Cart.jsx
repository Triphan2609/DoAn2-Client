import { Helmet } from "react-helmet";
import "./Cart.scss";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";

const Cart = () => {
    return (
        <div className="cart-page">
            <Helmet>
                <title>Giỏ hàng</title>
            </Helmet>
            <BreadCrumb title={"Giỏ hàng"} />
            <div className="container white collections-container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="shopping-cart">
                            <div className="d-none d-lg-block d-xl-block">
                                <div className="shopping-cart-table">
                                    <h1 className="lbl-shopping-cart lbl-shopping-cart-gio-hang">
                                        Giỏ hàng{" "}
                                        <span>
                                            (
                                            <span className="count_item_pr hascart">
                                                1
                                            </span>{" "}
                                            sản phẩm)
                                        </span>
                                    </h1>
                                    <div className="col-main cart_desktop_page cart-page">
                                        <div className="cart page_cart cart_des_page hidden-xs-down row">
                                            <div className="col-lg-12 cart-col-1">
                                                <div className="cart-tbody">
                                                    <div className="row shopping-cart-item productid-7485584">
                                                        <div className="col-lg-3 img-thumnail-custom">
                                                            <p className="image">
                                                                <a
                                                                    href="/tui-treo-tuong-doz-902"
                                                                    title="Túi treo tường DOZ-902"
                                                                    target="_blank"
                                                                >
                                                                    <img
                                                                        className="img-responsive"
                                                                        src="https://bizweb.dktcdn.net/thumb/medium/100/147/060/products/1946236doz-902-230-jpeg.jpg"
                                                                        alt="Túi treo tường DOZ-902"
                                                                    />
                                                                </a>
                                                            </p>
                                                        </div>
                                                        <div className="col-right col-lg-9">
                                                            <div className="box-info-product">
                                                                <p className="name">
                                                                    <a
                                                                        href="/tui-treo-tuong-doz-902"
                                                                        title="Túi treo tường DOZ-902"
                                                                        target="_blank"
                                                                    >
                                                                        Túi treo
                                                                        tường
                                                                        DOZ-902
                                                                    </a>
                                                                </p>
                                                                <p className="c-brands">
                                                                    Thương hiệu:
                                                                    Đang cập
                                                                    nhật
                                                                </p>
                                                                <p className="seller-by d-none">
                                                                    Default
                                                                    Title
                                                                </p>
                                                                <p className="action">
                                                                    <a
                                                                        href="javascript:;"
                                                                        className="btn btn-link btn-item-delete remove-item-cart"
                                                                        data-id="7485584"
                                                                        title="Xóa"
                                                                    >
                                                                        Xóa
                                                                    </a>
                                                                </p>
                                                            </div>
                                                            <div className="box-price">
                                                                <p className="price pricechange">
                                                                    270.000₫
                                                                </p>
                                                            </div>
                                                            <div className="quantity-block">
                                                                <div className="bootstrap-touchspin">
                                                                    <div className="input-group-btn">
                                                                        <button
                                                                            className="increase_pop items-count btn-plus btn btn-default bootstrap-touchspin-up"
                                                                            type="button"
                                                                        >
                                                                            +
                                                                        </button>
                                                                        <input
                                                                            type="text"
                                                                            maxLength="12"
                                                                            min="1"
                                                                            disabled
                                                                            className="form-control quantity-r2 quantity js-quantity-product input-text number-sidebar input_pop input_pop qtyItem7485584"
                                                                            id="qtyItem7485584"
                                                                            name="Lines"
                                                                            size="4"
                                                                            value="1"
                                                                        />
                                                                        <button
                                                                            className="reduced_pop items-count btn-minus btn btn-default bootstrap-touchspin-down"
                                                                            type="button"
                                                                            disabled=""
                                                                        >
                                                                            –
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 cart-col-2 cart-collaterals cart_submit">
                                                <div id="right-affix">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <a
                                                                className="btn-proceed-checkout btn-checkouts"
                                                                title="Tiếp tục mua hàng"
                                                                href="collections/all"
                                                            >
                                                                Tiếp tục mua
                                                                hàng
                                                            </a>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="each-row">
                                                                <div className="box-style fee">
                                                                    <p className="list-info-price">
                                                                        <span>
                                                                            Tạm
                                                                            tính:{" "}
                                                                        </span>
                                                                        <strong className="totals_price price _text-right text_color_right1">
                                                                            270.000₫
                                                                        </strong>
                                                                    </p>
                                                                </div>
                                                                <div className="box-style fee d-none">
                                                                    <p className="list-info-price">
                                                                        <span>
                                                                            Giảm
                                                                            giá:{" "}
                                                                        </span>
                                                                        <strong
                                                                            className="discounted price _text-right text_color_right1"
                                                                            id="price_sale"
                                                                            data-price="0"
                                                                        ></strong>
                                                                    </p>
                                                                </div>
                                                                <div className="box-style fee">
                                                                    <div className="total2 clearfix">
                                                                        <span className="text-label">
                                                                            Thành
                                                                            tiền:{" "}
                                                                        </span>
                                                                        <div className="amount">
                                                                            <p>
                                                                                <strong className="totals_price">
                                                                                    270.000₫
                                                                                </strong>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    className="button btn btn-large btn-block btn-danger btn-checkout evo-button"
                                                                    title="Thanh toán ngay"
                                                                    type="button"
                                                                >
                                                                    Thanh toán
                                                                    ngay
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-lg-none d-xl-none">
                                <div className="cart-mobile">
                                    <div className="header-cart">
                                        <div className="title-cart clearfix">
                                            <h3>Giỏ hàng của bạn</h3>
                                        </div>
                                    </div>
                                    <div className="header-cart-content">
                                        <div className="cart_page_mobile content-product-list">
                                            <div className="item-product item productid-7485584 ">
                                                <div className="item-product-cart-mobile margin-right-10">
                                                    <a
                                                        className="product-images1"
                                                        href="/tui-treo-tuong-doz-902"
                                                        title="Túi treo tường DOZ-902"
                                                    >
                                                        <img
                                                            src="https://bizweb.dktcdn.net/thumb/small/100/147/060/products/1946236doz-902-230-jpeg.jpg"
                                                            alt="Túi treo tường DOZ-902"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="title-product-cart-mobile">
                                                    <h3>
                                                        <a
                                                            href="/tui-treo-tuong-doz-902"
                                                            title="Túi treo tường DOZ-902"
                                                        >
                                                            Túi treo tường
                                                            DOZ-902
                                                        </a>
                                                    </h3>
                                                    <p>
                                                        Giá:{" "}
                                                        <span className="pricechange">
                                                            270.000₫
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="select-item-qty-mobile">
                                                    <div className="txt_center">
                                                        <button
                                                            className="reduced items-count btn-minus"
                                                            type="button"
                                                            disabled=""
                                                        >
                                                            –
                                                        </button>
                                                        <input
                                                            type="text"
                                                            maxLength="12"
                                                            min="0"
                                                            className="input-text number-sidebar qtyMobile7485584"
                                                            id="qtyMobile7485584"
                                                            name="Lines"
                                                            size="4"
                                                            value="1"
                                                        />
                                                        <button
                                                            className="increase items-count btn-plus"
                                                            type="button"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <a
                                                        className="button remove-item remove-item-cart"
                                                        href="javascript:;"
                                                        data-id="7485584"
                                                        title="Xóa"
                                                    >
                                                        Xoá
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="header-cart-price">
                                            <div className="title-cart clearfix">
                                                <h3 className="text-xs-left">
                                                    Tổng tiền
                                                </h3>
                                                <a
                                                    className="text-xs-right totals_price_mobile"
                                                    title="270.000₫"
                                                >
                                                    270.000₫
                                                </a>
                                            </div>
                                            <div className="checkout">
                                                <button
                                                    className="btn-proceed-checkout-mobile"
                                                    title="Thanh toán ngay"
                                                    type="button"
                                                >
                                                    <span>Thanh toán ngay</span>
                                                </button>
                                            </div>
                                            <button
                                                className="btn btn-proceed-continues-mobile"
                                                title="Tiếp tục mua hàng"
                                                type="button"
                                            >
                                                Tiếp tục mua hàng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="side-module block">
                            <div className="content-asset">
                                <div className="service-module service-closed">
                                    <h3>Dịch vụ khách hàng</h3>
                                    <p>
                                        Bạn cần sự hỗ trợ từ chúng tôi? Hãy liên
                                        hệ ngay
                                    </p>
                                    <ul>
                                        <li>
                                            <a
                                                href="tel:0937.809.123"
                                                title="Hotline 0937.809.123"
                                            >
                                                <svg
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    viewBox="0 0 480.56 480.56"
                                                    xmlSpace="preserve"
                                                >
                                                    <path
                                                        d="M365.354,317.9c-15.7-15.5-35.3-15.5-50.9,0c-11.9,11.8-23.8,23.6-35.5,35.6c-3.2,3.3-5.9,4-9.8,1.8
												 c-7.7-4.2-15.9-7.6-23.3-12.2c-34.5-21.7-63.4-49.6-89-81c-12.7-15.6-24-32.3-31.9-51.1c-1.6-3.8-1.3-6.3,1.8-9.4
												 c11.9-11.5,23.5-23.3,35.2-35.1c16.3-16.4,16.3-35.6-0.1-52.1c-9.3-9.4-18.6-18.6-27.9-28c-9.6-9.6-19.1-19.3-28.8-28.8
												 c-15.7-15.3-35.3-15.3-50.9,0.1c-12,11.8-23.5,23.9-35.7,35.5c-11.3,10.7-17,23.8-18.2,39.1c-1.9,24.9,4.2,48.4,12.8,71.3
												 c17.6,47.4,44.4,89.5,76.9,128.1c43.9,52.2,96.3,93.5,157.6,123.3c27.6,13.4,56.2,23.7,87.3,25.4c21.4,1.2,40-4.2,54.9-20.9
												 c10.2-11.4,21.7-21.8,32.5-32.7c16-16.2,16.1-35.8,0.2-51.8C403.554,355.9,384.454,336.9,365.354,317.9z"
                                                    ></path>
                                                    <path
                                                        d="M346.254,238.2l36.9-6.3c-5.8-33.9-21.8-64.6-46.1-89c-25.7-25.7-58.2-41.9-94-46.9l-5.2,37.1
												 c27.7,3.9,52.9,16.4,72.8,36.3C329.454,188.2,341.754,212,346.254,238.2z"
                                                    ></path>
                                                    <path
                                                        d="M403.954,77.8c-42.6-42.6-96.5-69.5-156-77.8l-5.2,37.1c51.4,7.2,98,30.5,134.8,67.2c34.9,34.9,57.8,79,66.1,127.5
												 l36.9-6.3C470.854,169.3,444.354,118.3,403.954,77.8z"
                                                    ></path>
                                                </svg>{" "}
                                                0937.809.123
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-link"
                                                href=""
                                                target="_blank"
                                                title="Chúng tôi trên Facebook"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    width="25px"
                                                    height="25px"
                                                    viewBox="0 0 96.124 96.123"
                                                    xmlSpace="preserve"
                                                >
                                                    <path
                                                        d="M72.089,0.02L59.624,0C45.62,0,36.57,9.285,36.57,23.656v10.907H24.037c-1.083,0-1.96,0.878-1.96,1.961v15.803   c0,1.083,0.878,1.96,1.96,1.96h12.533v39.876c0,1.083,0.877,1.96,1.96,1.96h16.352c1.083,0,1.96-0.878,1.96-1.96V54.287h14.654   c1.083,0,1.96-0.877,1.96-1.96l0.006-15.803c0-0.52-0.207-1.018-0.574-1.386c-0.367-0.368-0.867-0.575-1.387-0.575H56.842v-9.246   c0-4.444,1.059-6.7,6.848-6.7l8.397-0.003c1.082,0,1.959-0.878,1.959-1.96V1.98C74.046,0.899,73.17,0.022,72.089,0.02z"
                                                        data-original="#000000"
                                                        className="active-path"
                                                        data-old_color="#000000"
                                                        fill="#EBE7E7"
                                                    ></path>
                                                </svg>{" "}
                                                Chúng tôi trên Facebook
                                            </a>
                                        </li>
                                    </ul>
                                    <p>Giờ mở cửa (08:00 - 18:00 tối)</p>
                                    <a
                                        className="text-links"
                                        href="/lien-he"
                                        title="Liên hệ"
                                    >
                                        Liên hệ
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="side-module block usp-payment-module margin-bottom-0">
                            <div className="content-asset">
                                <h3>Mua sắm cùng Evo Wood</h3>
                                <ul className="usp-list">
                                    <li>
                                        <span className="color-grey-dark">
                                            Sản phẩm đẹp, thân thiện với môi
                                            trường
                                        </span>
                                        <p></p>
                                    </li>

                                    <li>
                                        <span className="color-grey-dark">
                                            Không lo về giá
                                        </span>
                                        <p></p>
                                    </li>

                                    <li>
                                        <span className="color-grey-dark">
                                            Miễn phí vận chuyển
                                        </span>
                                        <p>cho đơn hàng từ 1.500.000 VNĐ</p>
                                    </li>
                                </ul>
                                <ul className="payment">
                                    <li>
                                        <img
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/cart_payment_1.svg?1722413377105"
                                            alt="Hình thức thanh toán"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/cart_payment_2.svg?1722413377105"
                                            alt="Hình thức thanh toán"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/cart_payment_3.svg?1722413377105"
                                            alt="Hình thức thanh toán"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/cart_payment_4.svg?1722413377105"
                                            alt="Hình thức thanh toán"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
