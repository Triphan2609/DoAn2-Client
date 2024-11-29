import { Carousel, Image } from "antd";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Product.scss";
import { useState } from "react";
import BlockProducts from "../../../components/BlockProducts/BlockProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { NavLink } from "react-router-dom";
const ProductDetail = () => {
    const [activeTabId, setActiveTabId] = useState("info");

    const handleShow = (event, tabId) => {
        event.preventDefault();
        setActiveTabId(tabId);
    };

    const contentStyle = {
        margin: 0,
        height: "480px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "transparent",
    };
    return (
        <div className="product-detail-page">
            <BreadCrumb title={"Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"} />
            <div className="container ant-product-page product product-margin">
                <div className="evo-bg">
                    <div className="row ant-image-and-info-product">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-12 ant-mobile-padding">
                            <Carousel arrows dotPosition="left" infinite={true}>
                                <div>
                                    <h3 style={contentStyle}>
                                        <Image
                                            width={"auto"}
                                            style={{
                                                objectFit: "cover",
                                                maxHeight: "100%",
                                            }}
                                            src="https://bizweb.dktcdn.net/thumb/large/100/147/060/products/1038019dfz-131-155-jpeg.jpg?v=1478254031860"
                                        />
                                    </h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>
                                        <Image
                                            width={"auto"}
                                            style={{
                                                objectFit: "cover",
                                                maxHeight: "100%",
                                            }}
                                            src="https://bizweb.dktcdn.net/thumb/large/100/147/060/products/1038019dfz-131-155-jpeg.jpg?v=1478254031860"
                                        />
                                    </h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>
                                        <Image
                                            width={"auto"}
                                            style={{
                                                objectFit: "cover",
                                                maxHeight: "100%",
                                            }}
                                            src="https://bizweb.dktcdn.net/thumb/large/100/147/060/products/1038019dfz-131-155-jpeg.jpg?v=1478254031860"
                                        />
                                    </h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>
                                        <Image
                                            width={"auto"}
                                            style={{
                                                objectFit: "cover",
                                                maxHeight: "100%",
                                            }}
                                            src="https://bizweb.dktcdn.net/thumb/large/100/147/060/products/1038019dfz-131-155-jpeg.jpg?v=1478254031860"
                                        />
                                    </h3>
                                </div>
                            </Carousel>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-12 details-pro">
                            <div className="ant-info-product">
                                <h1 className="title-head">
                                    Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)
                                </h1>

                                <div>
                                    <div className="inventory_quantity">
                                        <span className="a-stock a1">
                                            Còn hàng
                                        </span>
                                    </div>
                                    <div className="price-box clearfix">
                                        <div className="special-price">
                                            <span className="price product-price">
                                                258.000₫
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="summary">
                                    <p>
                                        Mua hàng <strong>ONLINE</strong>: Quý
                                        khách chỉ cần Click vào nút
                                        <strong>MUA HÀNG</strong>
                                        -Hoăc gọi hoặc nhắn tin tới 0901238819
                                        để mua hàng
                                    </p>
                                </div>

                                <div className="form-product ant-form-product">
                                    <form
                                        id="add-to-cart-form"
                                        className="clearfix has-validation-callback"
                                    >
                                        <div className="form-groups clearfix">
                                            <div className="qty-ant clearfix custom-btn-number ">
                                                <label>Số lượng:</label>
                                                <div className="custom custom-btn-numbers clearfix">
                                                    <button
                                                        className="btn-minus btn-cts"
                                                        type="button"
                                                    >
                                                        <svg
                                                            x="0px"
                                                            y="0px"
                                                            width="121.805px"
                                                            height="121.804px"
                                                            viewBox="0 0 121.805 121.804"
                                                            xmlSpace="preserve"
                                                        >
                                                            <path
                                                                d="M7.308,68.211h107.188c4.037,0,7.309-3.272,7.309-7.31c0-4.037-3.271-7.309-7.309-7.309H7.308
														 C3.272,53.593,0,56.865,0,60.902C0,64.939,3.272,68.211,7.308,68.211z"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                    <input
                                                        aria-label="Số lượng"
                                                        type="text"
                                                        className="qty input-text"
                                                        id="qty"
                                                        name="quantity"
                                                        size="4"
                                                        value="1"
                                                        maxLength="3"
                                                    />
                                                    <button
                                                        className="btn-plus btn-cts"
                                                        type="button"
                                                    >
                                                        <svg
                                                            height="426.66667pt"
                                                            viewBox="0 0 426.66667 426.66667"
                                                            width="426.66667pt"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="btn-mua">
                                                <button
                                                    type="submit"
                                                    data-role="addtocart"
                                                    className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
                                                >
                                                    Thêm vào giỏ
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-lg btn-buy-now"
                                                >
                                                    Mua ngay
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ant-product-tab">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${
                                    activeTabId === "info" ? "active" : ""
                                }`}
                                id="home-tab"
                                title="Thông tin sản phẩm"
                                onClick={(event) => handleShow(event, "info")}
                            >
                                Thông tin sản phẩm
                            </a>
                        </li>

                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${
                                    activeTabId === "policy" ? "active" : ""
                                }`}
                                id="contact-tab"
                                title="Chính sách đổi trả và bảo hành"
                                onClick={(event) => handleShow(event, "policy")}
                            >
                                Chính sách đổi trả và bảo hành
                            </a>
                        </li>

                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${
                                    activeTabId === "protect" ? "active" : ""
                                }`}
                                id="contact-tab4"
                                title=" Hướng dẫn bảo quản"
                                onClick={(event) =>
                                    handleShow(event, "protect")
                                }
                            >
                                {" "}
                                Hướng dẫn bảo quản
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div
                            className={`tab-pane fade ${
                                activeTabId === "info" ? "active show" : ""
                            }`}
                            id="home"
                            role="tabpanel"
                        >
                            <p>
                                Bóp cầm tay&nbsp;Petshop&nbsp;phù hợp cho các
                                bạn nữ cầm tay khi đi mua sắm, đi chơi. Ngăn
                                chính của bóp đủ rộng để chứa điện thoại di
                                động, nhiều ngăn phụ nhỏ để đựng những vật dụng
                                khác.
                            </p>
                            <p>
                                Đặc tính nổi bật: &nbsp;&nbsp;
                                <br />
                                - Chất liệu 100% cotton, độ dày vừa phải&nbsp;,
                                thời gian sử dụng lâu dài
                                <br />
                                - Sản phẩm được nhuộm màu theo công nghệ tối
                                tân, rất bền màu và không gây kích ứng da cho
                                trẻ nhỏ
                                <br />
                                - Dây khóa kéo YKK - chất lượng tốt &nbsp;
                                <br />
                                - Thiết kế trẻ trung, điểm nhấn là hình ảnh
                                những chú thú cưng rất gần gủi và đáng&nbsp;yêu
                                &nbsp;
                                <br />- Sản phẩm có thể giặt, vệ sinh dễ dàng
                                sau thời gian sử dụng
                            </p>
                            <p>
                                -Kích thước : Dài&nbsp;x Cao x Rộng&nbsp;( cm) -
                                18&nbsp;x 10 x 6.5(cm)
                            </p>
                        </div>

                        <div
                            className={`tab-pane fade ${
                                activeTabId === "policy" ? "active show" : ""
                            }`}
                            id="contact"
                            role="tabpanel"
                        >
                            <p>
                                <u>
                                    <strong>CHÍNH SÁCH ĐỔI HÀNG.</strong>
                                </u>
                            </p>
                            <p>
                                <strong>
                                    Quý khách có thể đổi hàng đã mua trong các
                                    trường hợp sau:
                                </strong>
                            </p>
                            <ul>
                                <li>Hàng có lỗi kỹ thuật do nhà sản xuất,</li>
                                <li>Hàng bị giao nhầm, nhầm size.</li>
                            </ul>
                            <p>
                                Thời hạn đổi hàng : 05 ngày kể từ ngày mua/nhận
                                hàng
                            </p>
                            <p>
                                <strong>Điều kiện đổi hàng:</strong>
                            </p>
                            <ul>
                                <li>
                                    Hàng chưa qua sử dụng, giặt ủi, phải còn
                                    nguyên tem mác, không dính bẩn,…
                                </li>
                                <li>
                                    Hàng đổi phải có giá bằng hoặc cao hơn hàng
                                    đã mua
                                </li>
                            </ul>
                            <p>
                                <strong>Phí đổi hàng:</strong>
                            </p>
                            <ul>
                                <li>
                                    Nếu hàng bị lỗi kỹ thuật do nhà sản xuất:
                                    miễn phí toàn bộ phí chuyển hàng (gửi trả và
                                    giao hàng)
                                </li>
                                <li>
                                    Trường hợp khác Quý khách hàng sẽ chịu chi
                                    phí&nbsp;chuyển hàng (gửi trả và giao hàng).
                                </li>
                            </ul>
                            <p>
                                <strong>Địa điểm nhận hàng đổi:</strong>
                                <br />
                                Công ty TNHH May Mặc Thăng Long
                                <br />
                                62/4 Trần Bình Trọng, Phường 8, TP. Vũng Tàu.
                                <br />
                                Điện thoại: 02543 583 216
                                <br />
                                Fax: 02543 581 475
                                <br />
                                Hotline: 0937 809 123
                            </p>
                            <p>
                                <em>
                                    Xin Quý Khách Hàng lưu ý: Chúng tôi không hỗ
                                    trợ Quý khách trả lại hàng.
                                </em>
                            </p>
                            <p>
                                <u>
                                    <strong>CHÍNH SÁCH BẢO HÀNH.</strong>
                                </u>
                            </p>
                            <ul>
                                <li>Hàng có lỗi kỹ thuật do nhà sản xuất.</li>
                                <li>
                                    Thời hạn bảo hành dây kéo&nbsp;: trọn đời.
                                </li>
                            </ul>
                            <p>
                                &nbsp; &nbsp; &nbsp;
                                <strong>Phí bảo hành:</strong>
                            </p>
                            <ul>
                                <li>
                                    Nếu hàng bị lỗi kỹ thuật do nhà sản xuất:
                                    miễn phí toàn bộ phí chuyển hàng (gửi trả và
                                    giao hàng)
                                </li>
                                <li>
                                    Trường hợp khác Quý khách hàng sẽ chịu chi
                                    phí&nbsp;chuyển hàng (gửi trả và giao hàng).
                                </li>
                            </ul>
                            <p>
                                <strong>
                                    Chân thành cảm ơn Quý Khách Hàng đã quan tâm
                                    đến các sản phẩm nhãn hiệu Pet Shop.
                                </strong>
                            </p>
                        </div>

                        <div
                            className={`tab-pane fade ${
                                activeTabId === "protect" ? "active show" : ""
                            }`}
                            id="contact4"
                            role="tabpanel"
                        >
                            <p>
                                <span style={{ color: "#c0392b" }}>
                                    <u>
                                        <strong>Lưu ý:</strong>
                                    </u>
                                    <br />
                                    <strong>
                                        <em>
                                            - Để được bền màu sản phẩm Petshop
                                            hàng 100% cotton không nên dùng xà
                                            bông(xà phòng), nước giặt có chất
                                            tẩy.&nbsp;
                                            <br />- Nên phơi trong bóng râm,
                                            tránh phơi sản phẩm&nbsp;ra nơi có
                                            ánh nắng chiếu trực tiếp.
                                        </em>
                                    </strong>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ant-similar-product">
                    <div className="home-title">
                        <a href="/bop-xach-tay" title="Sản phẩm liên quan">
                            Sản phẩm liên quan
                        </a>
                    </div>
                    <div className="ant-block-list-product">
                        <Swiper
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            breakpoints={{
                                390: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                414: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 20,
                                },
                            }}
                            modules={[Navigation, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <BlockProducts />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BlockProducts />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BlockProducts />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BlockProducts />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BlockProducts />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BlockProducts />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BlockProducts />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>

                <div className="evo-bg product-bottom-banner">
                    <div className="row ant-scroll-mobile">
                        <div className="col-lg-6 col-sm-6 col-9">
                            <NavLink to="/tat-ca-san-pham" title="Evo Wood">
                                <img
                                    className="lazy loaded"
                                    alt="Evo Wood"
                                    src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/product_banner_1.jpg?1722413377105"
                                />
                            </NavLink>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-9">
                            <NavLink to="/tat-ca-san-pham" title="Evo Wood">
                                <img
                                    className="lazy loaded"
                                    alt="Evo Wood"
                                    src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/product_banner_2.jpg?1722413377105"
                                />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
