import { Carousel, Flex, Image, Spin } from "antd";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Product.scss";
import { useContext, useEffect, useState } from "react";
import BlockProducts from "../../../components/BlockProducts/BlockProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
    callFetchProductByType,
    callFetchProductSlug,
} from "../../../services/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../../../redux/Cart/cartSlice";
import { DrawerContext } from "../../../context/drawer.context";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // React Data
    const { slug } = useParams();
    const [activeTabId, setActiveTabId] = useState("info");
    const [loading, setLoading] = useState(true);

    // Context
    const { setDrawer } = useContext(DrawerContext);

    // Data
    const [product, setProduct] = useState(null); // Sửa thành null thay vì undefined
    const [productSimilar, setProductSimilar] = useState(null);

    // Functions
    const fetchProduct = async (slug) => {
        setLoading(true);
        const res = await callFetchProductSlug(slug);
        if (res && res.data) {
            setProduct(res.data.product);
        }
        setLoading(false);
    };

    const fetchProductType = async (product) => {
        const res = await callFetchProductByType(product.product_type_id);
        if (res && res.data) {
            setProductSimilar(res.data);
        }
    };

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
        dispatch(
            updateQuantity({
                productId: item.product_id,
                quantity: newQuantity,
            })
        );
    };

    // Fetch
    useEffect(() => {
        if (slug) {
            setTimeout(() => {
                fetchProduct(slug);
            }, 1000);
        }
    }, [slug]);

    // Khi product đã có, gọi fetchProductType để lấy sản phẩm tương tự
    useEffect(() => {
        if (product) {
            fetchProductType(product);
        }
    }, [product]); // Chỉ gọi khi product thay đổi

    const handleShow = (event, tabId) => {
        event.preventDefault();
        setActiveTabId(tabId);
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product)); // Gọi action addToCart khi nhấn nút
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
        <>
            {loading === true ? (
                <>
                    <div
                        style={{
                            width: "100%",
                            height: "50vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                        }}
                    >
                        <Flex justify="center" align="center" gap="middle">
                            <Spin size="large" />
                        </Flex>
                    </div>
                </>
            ) : (
                <>
                    <div className="product-detail-page">
                        <BreadCrumb title={product && product.name} />
                        <div className="container ant-product-page product product-margin">
                            <div className="evo-bg">
                                <div className="row ant-image-and-info-product">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 ant-mobile-padding">
                                        <Carousel
                                            arrows
                                            dotPosition="left"
                                            infinite={true}
                                        >
                                            {product &&
                                                product.image_url &&
                                                JSON.parse(
                                                    product.image_url
                                                ).map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <h3
                                                                style={
                                                                    contentStyle
                                                                }
                                                            >
                                                                <Image
                                                                    width={
                                                                        "auto"
                                                                    }
                                                                    height={
                                                                        "100%"
                                                                    }
                                                                    style={{
                                                                        objectFit:
                                                                            "cover",
                                                                        maxHeight:
                                                                            "100%",
                                                                    }}
                                                                    src={
                                                                        "/public/" +
                                                                        item
                                                                    }
                                                                />
                                                            </h3>
                                                        </div>
                                                    );
                                                })}
                                        </Carousel>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 details-pro">
                                        <div className="ant-info-product">
                                            <h1 className="title-head">
                                                {product && product.name}
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
                                                            {new Intl.NumberFormat(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "VND",
                                                                }
                                                            ).format(
                                                                product &&
                                                                    product.price
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="summary">
                                                <p>
                                                    Mua hàng{" "}
                                                    <strong>ONLINE</strong>: Quý
                                                    khách chỉ cần Click vào nút
                                                    <strong> MUA HÀNG </strong>
                                                    Hoặc gọi hay nhắn tin tới
                                                    0398944226 để mua hàng
                                                </p>
                                            </div>

                                            <div className="form-product ant-form-product">
                                                <div
                                                    id="add-to-cart-form"
                                                    className="clearfix has-validation-callback"
                                                >
                                                    <div className="form-groups clearfix">
                                                        <div className="btn-mua">
                                                            <button
                                                                className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
                                                                onClick={() => {
                                                                    setDrawer(
                                                                        true
                                                                    );
                                                                    handleAddToCart();
                                                                }}
                                                            >
                                                                Thêm vào giỏ
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-lg btn-buy-now"
                                                                onClick={() => {
                                                                    handleAddToCart();
                                                                    navigate(
                                                                        "/thanh-toan"
                                                                    );
                                                                }}
                                                            >
                                                                Mua ngay
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ant-product-tab">
                                <ul
                                    className="nav nav-tabs"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <a
                                            className={`nav-link ${
                                                activeTabId === "info"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            id="home-tab"
                                            title="Thông tin sản phẩm"
                                            onClick={(event) =>
                                                handleShow(event, "info")
                                            }
                                        >
                                            Thông tin sản phẩm
                                        </a>
                                    </li>

                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <a
                                            className={`nav-link ${
                                                activeTabId === "policy"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            id="contact-tab"
                                            title="Chính sách đổi trả và bảo hành"
                                            onClick={(event) =>
                                                handleShow(event, "policy")
                                            }
                                        >
                                            Chính sách đổi trả và bảo hành
                                        </a>
                                    </li>

                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <a
                                            className={`nav-link ${
                                                activeTabId === "protect"
                                                    ? "active"
                                                    : ""
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
                                            activeTabId === "info"
                                                ? "active show"
                                                : ""
                                        }`}
                                        id="home"
                                        role="tabpanel"
                                    >
                                        {product && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: product.description,
                                                }}
                                            ></div>
                                        )}
                                    </div>

                                    <div
                                        className={`tab-pane fade ${
                                            activeTabId === "policy"
                                                ? "active show"
                                                : ""
                                        }`}
                                        id="contact"
                                        role="tabpanel"
                                    >
                                        <p>
                                            <u>
                                                <strong>
                                                    CHÍNH SÁCH ĐỔI HÀNG.
                                                </strong>
                                            </u>
                                        </p>
                                        <p>
                                            <strong>
                                                Quý khách có thể đổi hàng đã mua
                                                trong các trường hợp sau:
                                            </strong>
                                        </p>
                                        <ul>
                                            <li>
                                                Hàng có lỗi kỹ thuật do nhà sản
                                                xuất,
                                            </li>
                                            <li>
                                                Hàng bị giao nhầm, nhầm size.
                                            </li>
                                        </ul>
                                        <p>
                                            Thời hạn đổi hàng : 05 ngày kể từ
                                            ngày mua/nhận hàng
                                        </p>
                                        <p>
                                            <strong>Điều kiện đổi hàng:</strong>
                                        </p>
                                        <ul>
                                            <li>
                                                Hàng chưa qua sử dụng, giặt ủi,
                                                phải còn nguyên tem mác, không
                                                dính bẩn,…
                                            </li>
                                            <li>
                                                Hàng đổi phải có giá bằng hoặc
                                                cao hơn hàng đã mua
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Phí đổi hàng:</strong>
                                        </p>
                                        <ul>
                                            <li>
                                                Nếu hàng bị lỗi kỹ thuật do nhà
                                                sản xuất: miễn phí toàn bộ phí
                                                chuyển hàng (gửi trả và giao
                                                hàng)
                                            </li>
                                            <li>
                                                Trường hợp khác Quý khách hàng
                                                sẽ chịu chi phí&nbsp;chuyển hàng
                                                (gửi trả và giao hàng).
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>
                                                Địa điểm nhận hàng đổi:
                                            </strong>
                                            <br />
                                            Công ty TNHH May Mặc Thăng Long
                                            <br />
                                            62/4 Trần Bình Trọng, Phường 8, TP.
                                            Vũng Tàu.
                                            <br />
                                            Điện thoại: 02543 583 216
                                            <br />
                                            Fax: 02543 581 475
                                            <br />
                                            Hotline: 0937 809 123
                                        </p>
                                        <p>
                                            <em>
                                                Xin Quý Khách Hàng lưu ý: Chúng
                                                tôi không hỗ trợ Quý khách trả
                                                lại hàng.
                                            </em>
                                        </p>
                                        <p>
                                            <u>
                                                <strong>
                                                    CHÍNH SÁCH BẢO HÀNH.
                                                </strong>
                                            </u>
                                        </p>
                                        <ul>
                                            <li>
                                                Hàng có lỗi kỹ thuật do nhà sản
                                                xuất.
                                            </li>
                                            <li>
                                                Thời hạn bảo hành dây kéo&nbsp;:
                                                trọn đời.
                                            </li>
                                        </ul>
                                        <p>
                                            &nbsp; &nbsp; &nbsp;
                                            <strong>Phí bảo hành:</strong>
                                        </p>
                                        <ul>
                                            <li>
                                                Nếu hàng bị lỗi kỹ thuật do nhà
                                                sản xuất: miễn phí toàn bộ phí
                                                chuyển hàng (gửi trả và giao
                                                hàng)
                                            </li>
                                            <li>
                                                Trường hợp khác Quý khách hàng
                                                sẽ chịu chi phí&nbsp;chuyển hàng
                                                (gửi trả và giao hàng).
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>
                                                Chân thành cảm ơn Quý Khách Hàng
                                                đã quan tâm đến các sản phẩm
                                                nhãn hiệu Pet Shop.
                                            </strong>
                                        </p>
                                    </div>

                                    <div
                                        className={`tab-pane fade ${
                                            activeTabId === "protect"
                                                ? "active show"
                                                : ""
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
                                                        - Để được bền màu sản
                                                        phẩm Petshop hàng 100%
                                                        cotton không nên dùng xà
                                                        bông(xà phòng), nước
                                                        giặt có chất tẩy.&nbsp;
                                                        <br />- Nên phơi trong
                                                        bóng râm, tránh phơi sản
                                                        phẩm&nbsp;ra nơi có ánh
                                                        nắng chiếu trực tiếp.
                                                    </em>
                                                </strong>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="ant-similar-product">
                                <div className="home-title">
                                    <NavLink
                                        href="/bop-xach-tay"
                                        title="Sản phẩm liên quan"
                                    >
                                        Sản phẩm liên quan
                                    </NavLink>
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
                                        {productSimilar?.map(
                                            (product, index) => {
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <BlockProducts
                                                            product_id={
                                                                product.id
                                                            }
                                                            image_url={JSON.parse(
                                                                product.image_url
                                                            )}
                                                            name={product.name}
                                                            price={
                                                                product.price
                                                            }
                                                            slug={product.slug}
                                                        />
                                                    </SwiperSlide>
                                                );
                                            }
                                        )}
                                    </Swiper>
                                </div>
                            </div>

                            <div className="evo-bg product-bottom-banner">
                                <div className="row ant-scroll-mobile">
                                    <div className="col-lg-6 col-sm-6 col-9">
                                        <NavLink
                                            to="san-pham/tat-ca-san-pham"
                                            title="Evo Wood"
                                        >
                                            <img
                                                className="lazy loaded"
                                                alt="Evo Wood"
                                                src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/product_banner_1.jpg?1722413377105"
                                            />
                                        </NavLink>
                                    </div>
                                    <div className="col-lg-6 col-sm-6 col-9">
                                        <NavLink
                                            to="san-pham/tat-ca-san-pham"
                                            title="Evo Wood"
                                        >
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
                </>
            )}
        </>
    );
};

export default ProductDetail;
