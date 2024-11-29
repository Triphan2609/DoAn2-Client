import "./HomePage.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { NavLink } from "react-router-dom";
import BlockProducts from "../../../components/BlockProducts/BlockProducts";
import { Helmet } from "react-helmet";

const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Petshop thương hiệu dệt may truyền thống của Lamell - Thăng
                    Long | Pet Shop
                </title>
            </Helmet>
            <section className="home-page">
                <div className="bg">
                    <Swiper className="mySwiper">
                        <SwiperSlide>
                            <img
                                src="https://bizweb.dktcdn.net/100/147/060/themes/880570/assets/slider_2.jpg?1722413377105"
                                alt="Petshop"
                                className="img-responsive center-block d-block mx-auto"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="container">
                    <div className="bg-white">
                        <section className="awe-section-1s">
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={10}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 50,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 50,
                                    },
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <NavLink href="/phong-ngu" title="Petshop">
                                        <img
                                            data-src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo-wood-banner-1.jpg?1722413377105"
                                            alt="Petshop"
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo-wood-banner-1.jpg?1722413377105"
                                            className="lazy img-responsive "
                                            data-was-processed="true"
                                        />
                                    </NavLink>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <NavLink
                                        href="/hanh-trang-den-truong"
                                        title="Petshop"
                                    >
                                        <img
                                            data-src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo-wood-banner-2.jpg?1722413377105"
                                            alt="Petshop"
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo-wood-banner-2.jpg?1722413377105"
                                            className="lazy img-responsive mx-auto d-block loaded"
                                            data-was-processed="true"
                                        />
                                    </NavLink>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <NavLink
                                        href="https://www.facebook.com/petshopbebo"
                                        title="Petshop"
                                    >
                                        <img
                                            data-src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo-wood-banner-3.jpg?1722413377105"
                                            alt="Petshop"
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo-wood-banner-3.jpg?1722413377105"
                                            className="lazy img-responsive mx-auto d-block loaded"
                                            data-was-processed="true"
                                        />
                                    </NavLink>
                                </SwiperSlide>
                            </Swiper>
                        </section>
                        <section className="awe-section-2s">
                            <div className="ant-block-product">
                                <div className="ant-block-product-title">
                                    <a
                                        className="ant-titles"
                                        href="san-pham-noi-bat"
                                        title="Sản phẩm nổi bật"
                                    >
                                        <img
                                            data-src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo_block_product_icon.png?1722413377105"
                                            alt="Sản phẩm nổi bật"
                                            height="64"
                                            width="64"
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo_block_product_icon.png?1722413377105"
                                            className="lazy img-responsive loaded"
                                            data-was-processed="true"
                                        />{" "}
                                        Sản phẩm nổi bật
                                    </a>
                                    <div className="timer">
                                        <div
                                            className="time"
                                            data-countdown="countdown"
                                            data-date="12-25-2022-09-15-45"
                                        >
                                            <div className="lof-labelexpired d-none">
                                                {" "}
                                                Hết hạn
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="awe-section-3s">
                            <div className="row">
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                            </div>
                            <div className="ant-view-more text-center mt-5">
                                <NavLink
                                    to="/san-pham-noi-bat"
                                    title="Xem tất cả"
                                >
                                    Xem tất cả
                                </NavLink>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="new-product">
                    <div className="container">
                        <div className="ant-block-product-main">
                            <div className="row group-title">
                                <div className="col-lg-6 col-md-12 col-12 title-and-des">
                                    <a
                                        className="title"
                                        href="frontpage"
                                        title="SẢN PHẨM MỚI "
                                    >
                                        <img
                                            data-src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo_block_product_icon_2.png?1722413377105"
                                            alt="<span>SẢN PHẨM MỚI</span> "
                                            height="64"
                                            width="64"
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo_block_product_icon_2.png?1722413377105"
                                            className="lazy img-responsive loaded"
                                            data-was-processed="true"
                                        />
                                        <span>SẢN PHẨM MỚI</span>
                                    </a>
                                </div>
                                <div className="col-lg-6 col-md-12 col-12 category-menu">
                                    <a
                                        href="/tui-xach-balo"
                                        title="Túi Xách &amp; Balo"
                                        rel="nofollow"
                                    >
                                        Túi Xách &amp; Balo
                                    </a>

                                    <a
                                        href="/quan-ao"
                                        title="Quần Áo"
                                        rel="nofollow"
                                    >
                                        Quần Áo
                                    </a>

                                    <a
                                        href="/phong-ngu"
                                        title="Phòng Ngủ"
                                        rel="nofollow"
                                    >
                                        Phòng Ngủ
                                    </a>

                                    <a
                                        href="/do-thun-christlie"
                                        title="Hành trang của bé"
                                        rel="nofollow"
                                    >
                                        Hành trang của bé
                                    </a>
                                </div>
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
                    </div>
                </section>
                <section className="awe-section-4s">
                    <div className="container">
                        <div className="ant_feature_collection">
                            <a href="/collections/all" title="Petshop">
                                <picture>
                                    <img
                                        className="lazy loaded"
                                        height="200"
                                        width="1600"
                                        alt="Petshop"
                                        src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/feature_banner.jpg?1722413377105"
                                    />
                                </picture>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="awe-section-5s">
                    <div className="container section_product_3">
                        <div className="bg-white2">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 mb-margin">
                                    <NavLink
                                        to="tat-ca-san-pham"
                                        title="Petshop"
                                    >
                                        <picture>
                                            <source
                                                media="(min-width: 768px)"
                                                srcSet="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo_block_product_banner_3.jpg?1722413377105"
                                            />
                                            <source
                                                media="(max-width: 767px)"
                                                srcSet="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo_block_product_banner_mb_3.jpg?1722413377105"
                                            />
                                            <img
                                                className="lazy loaded mb-3"
                                                alt="Petshop"
                                                src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/evo_block_product_banner_3.jpg?1722413377105"
                                            />
                                        </picture>
                                    </NavLink>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-margin d-none d-md-block">
                                    <a
                                        href="phong-ngu"
                                        title="Phòng ngủ "
                                        className="section-title"
                                    >
                                        Phòng ngủ
                                    </a>

                                    <div className="fix-item-mobile">
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-margin d-none d-md-block">
                                    <a
                                        href="phong-ngu"
                                        title="Phòng ngủ "
                                        className="section-title"
                                    >
                                        Phòng ngủ
                                    </a>

                                    <div className="fix-item-mobile">
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-margin d-none d-md-block">
                                    <a
                                        href="phong-ngu"
                                        title="Phòng ngủ "
                                        className="section-title"
                                    >
                                        Phòng ngủ
                                    </a>

                                    <div className="fix-item-mobile">
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                        <div className="evo-product-block-item evo-product-block-item-small">
                                            <a
                                                href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                className="product__box-image"
                                            >
                                                <img
                                                    className="lazy loaded"
                                                    src="//bizweb.dktcdn.net/thumb/medium/100/147/060/products/ed1e0889-099f-4882-ba4b-a09d7741fbab-1c87a690-382e-44a2-8422-570bb7b59250.png?v=1650979722583"
                                                    alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                />
                                            </a>
                                            <div className="evo-product-right">
                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m)"
                                                    className="product__box-name"
                                                >
                                                    Bộ chăn ga gối (bọc) Gấu
                                                    Grizzly (1.6*2m)
                                                </a>
                                                <div className="product__box-price">
                                                    <span className="price">
                                                        3.949.000₫
                                                    </span>
                                                </div>

                                                <a
                                                    href="/bo-chan-ga-goi-boc-gau-grizzly-16"
                                                    className="action add_to_cart cart-button d-none"
                                                    rel="nofollow"
                                                    title="Mua ngay"
                                                >
                                                    Mua ngay
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-block d-md-none">
                                    <a
                                        href="phong-ngu"
                                        title="Phòng ngủ "
                                        className="section-title"
                                    >
                                        Phòng ngủ
                                    </a>
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
                        </div>
                    </div>
                </section>
                <section className="awe-section-5s">
                    <div className="container ant-block-news-image">
                        <div className="bg-white2">
                            <div className="row">
                                <div className="col-lg-6 ant-block-news">
                                    <a
                                        className="title"
                                        href="tin-tuc"
                                        title="Tin tức"
                                    >
                                        <span>Tin tức</span>
                                    </a>

                                    <div className="ant-item-news">
                                        <a
                                            href="/mach-ban-cach-chon-do-boi-hop-mot"
                                            title="MÁCH BẠN CÁCH CHỌN ĐỒ BƠI HỢP MỐT"
                                            className="news-box-image"
                                        >
                                            <img
                                                src="//bizweb.dktcdn.net/thumb/large/100/147/060/articles/untitled-25.jpg?v=1478148164403"
                                                alt="MÁCH BẠN CÁCH CHỌN ĐỒ BƠI HỢP MỐT"
                                                className="lazy img-responsive center-block loaded"
                                            />
                                        </a>
                                        <div className="evo-product-right">
                                            <a
                                                href="/mach-ban-cach-chon-do-boi-hop-mot"
                                                title="MÁCH BẠN CÁCH CHỌN ĐỒ BƠI HỢP MỐT"
                                                className="news-box-title"
                                            >
                                                MÁCH BẠN CÁCH CHỌN ĐỒ BƠI HỢP
                                                MỐT
                                            </a>
                                            <p>
                                                Việc lựa chọn đồ bơi dựa vào
                                                dáng người không chỉ giúp bạn
                                                tôn lên những nét đẹp sẵn có...
                                            </p>
                                            <div className="item-img-content">
                                                <span>
                                                    Thursday, 03/11/2016
                                                </span>
                                                <a
                                                    href="/mach-ban-cach-chon-do-boi-hop-mot"
                                                    title="Xem thêm"
                                                    className="news-box-more"
                                                >
                                                    Xem thêm
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ant-item-news mt-3">
                                        <a
                                            href="/bi-quyet-chon-quan-jeans-nu-cai-thien-vong-3"
                                            title="BÍ QUYẾT CHỌN QUẦN JEANS NỮ CẢI THIỆN VÒNG 3"
                                            className="news-box-image"
                                        >
                                            <img
                                                src="//bizweb.dktcdn.net/thumb/large/100/147/060/articles/untitled-26.jpg?v=1478147358283"
                                                alt="BÍ QUYẾT CHỌN QUẦN JEANS NỮ CẢI THIỆN VÒNG 3"
                                                className="lazy img-responsive center-block loaded"
                                            />
                                        </a>
                                        <div className="evo-product-right">
                                            <a
                                                href="/bi-quyet-chon-quan-jeans-nu-cai-thien-vong-3"
                                                title="BÍ QUYẾT CHỌN QUẦN JEANS NỮ CẢI THIỆN VÒNG 3"
                                                className="news-box-title"
                                            >
                                                BÍ QUYẾT CHỌN QUẦN JEANS NỮ CẢI
                                                THIỆN VÒNG 3
                                            </a>
                                            <p>
                                                Nhiều người khi mặc quần jeans
                                                chỉ chú ý đến việc làm thế nào
                                                cho đùi bớt to, chân bớt ...
                                            </p>
                                            <div className="item-img-content">
                                                <span>
                                                    Thursday, 03/11/2016
                                                </span>
                                                <a
                                                    href="/bi-quyet-chon-quan-jeans-nu-cai-thien-vong-3"
                                                    title="Xem thêm"
                                                    className="news-box-more"
                                                >
                                                    Xem thêm
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 ant-block-image mt-3">
                                    <a href="/collections/all" title="Petshop">
                                        <img
                                            height="180"
                                            width="620"
                                            data-src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/about_img_1.jpg?1722413377105"
                                            alt="Petshop"
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/about_img_1.jpg?1722413377105"
                                            className="lazy img-responsive center-block loaded"
                                            data-was-processed="true"
                                        />
                                    </a>
                                    <a href="/collections/all" title="Petshop">
                                        <img
                                            height="180"
                                            width="620"
                                            data-src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/about_img_2.jpg?1722413377105"
                                            alt="Petshop"
                                            src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/about_img_2.jpg?1722413377105"
                                            className="lazy img-responsive center-block loaded"
                                            data-was-processed="true"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default HomePage;
