import { useEffect, useState } from "react";
import "./Header.scss";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import DrawerCart from "../../pages/User/Home/Modal/DrawerCart";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { Flex, message, Spin } from "antd";
import {
    callFetchAnimal,
    callFetchCategoryCat,
    callFetchCategoryDog,
    callSearchProducts,
} from "../../services/api";
import { useContext } from "react";
import { AnimalContext } from "../../context/animal.context";
import { debounce } from "lodash";
import { doGetSearchQuery } from "../../redux/find/findSlice";
import { DrawerContext } from "../../context/drawer.context";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // React State
    const [isBtnShow, setIsBtnShow] = useState(false);
    const [isShowNav, setShowNav] = useState(false);
    const [isShowDropdown, setShowDropdown] = useState(false);
    const [isShowDropdownLv2, setShowDropdownLv2] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);

    // Context
    const { drawer, setDrawer } = useContext(DrawerContext);
    const { setFilter } = useContext(AnimalContext);

    // Data
    const [categoriesDog, setCategoriesDog] = useState();
    const [categoriesCat, setCategoriesCat] = useState();
    const [animals, setAnimals] = useState();

    // Redux State
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );
    const isAdmin = useSelector((state) => state.account?.user?.role);

    // Fetch API
    useEffect(() => {
        fetchCategories();
        fetchAnimals();
    }, []);

    // Fuction
    const fetchCategories = async () => {
        const resDog = await callFetchCategoryDog();
        if (resDog && resDog.data) {
            let raw = resDog.data;
            setCategoriesDog(raw);
        }

        const resCat = await callFetchCategoryCat();
        if (resCat && resCat.data) {
            let raw = resCat.data;
            setCategoriesCat(raw);
        }
    };

    const fetchAnimals = async () => {
        const res = await callFetchAnimal();
        if (res && res.data) {
            let raw = res.data;
            setAnimals(raw);
        }
    };

    const handleSearch = debounce(async (value) => {
        setSearchQuery(value);
        setLoading(true);

        const res = await callSearchProducts(value);

        if (res && res.data) {
            setProducts(res.data.products);
        }

        setLoading(false);
    }, 500);

    const showLoading = () => {
        setDrawer(true);
        setLoadingOrder(true);

        // Simple loadingOrder mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoadingOrder(false);
        }, 500);
    };

    const handleLogout = () => {
        dispatch(doLogoutAction());
        message.success("Đăng xuất thành công");
        navigate("/");
    };

    const handleClickShowNav = () => {
        const nav = document.querySelector("#nav");
        if (isShowNav) {
            nav.classList.remove("active");
            setShowNav(!isShowNav);
        } else {
            nav.classList.add("active");
            setShowNav(!isShowNav);
        }
    };

    return (
        <section className="section-header">
            <header className="header">
                <div className="evo-header container">
                    <div className="evo-header-logo">
                        <NavLink
                            className="d-sm-inline-block d-lg-none header-action__link header-action_clicked"
                            to="/"
                            id="trigger-mobile"
                            aria-label="Menu"
                            title="Menu"
                        >
                            <span
                                className={`box-icon ${
                                    isBtnShow ? "icon-show" : "icon-hide"
                                }`}
                            >
                                <span
                                    className="box-icon--close"
                                    onClick={() => setIsBtnShow(!isBtnShow)}
                                >
                                    {isBtnShow ? (
                                        <IoMdClose
                                            size={"2.5em"}
                                            color="#fff"
                                            onClick={handleClickShowNav}
                                        />
                                    ) : (
                                        <IoMdMenu
                                            size={"2.5em"}
                                            color="#fff"
                                            onClick={handleClickShowNav}
                                        />
                                    )}
                                </span>
                            </span>
                        </NavLink>
                        <Nav to="/" className="logo-wrapper" title="Pet Shop">
                            <picture>
                                <NavLink to={"/"}>
                                    <img
                                        width="237"
                                        height="66"
                                        src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/logo.png?1722413377105"
                                        alt="Pet Shop"
                                        className="lazy img-responsive mx-auto d-none d-lg-block  loaded"
                                    />
                                </NavLink>
                                <NavLink to={"/"}>
                                    {" "}
                                    <img
                                        width="237"
                                        height="66"
                                        src="https://bizweb.dktcdn.net/100/147/060/themes/880570/assets/logomb.png?1722413377105"
                                        alt="Pet Shop"
                                        className="lazy img-responsive mx-auto d-block d-lg-none loaded"
                                    />
                                </NavLink>
                            </picture>
                        </Nav>
                        <NavLink
                            className="evo-header-cart d-sm-inline-block d-lg-none"
                            aria-label="Xem giỏ hàng"
                            title="Giỏ hàng"
                            onClick={showLoading}
                        >
                            <svg viewBox="0 0 19 23">
                                <path
                                    d="M0 22.985V5.995L2 6v.03l17-.014v16.968H0zm17-15H2v13h15v-13zm-5-2.882c0-2.04-.493-3.203-2.5-3.203-2 0-2.5 1.164-2.5 3.203v.912H5V4.647C5 1.19 7.274 0 9.5 0 11.517 0 14 1.354 14 4.647v1.368h-2v-.912z"
                                    fill="#fff"
                                ></path>
                            </svg>
                            <span className="count_item_pr">0</span>
                        </NavLink>
                    </div>
                    <div className="evo-header-search evo-searchs">
                        <form className="evo-header-search-form evo-search-form has-validation-callback">
                            <input
                                type="text"
                                name="query"
                                className="search-auto form-control"
                                placeholder="Bạn cần tìm gì?"
                                autoComplete="off"
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={(e) => handleSearch(e.target.value)}
                            />
                            <button
                                className="btn btn-default"
                                aria-label="Tìm kiếm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(doGetSearchQuery(searchQuery));
                                    navigate("/tim-kiem");
                                }}
                            >
                                <svg
                                    className="Icon Icon--search-desktop"
                                    viewBox="0 0 21 21"
                                >
                                    <g
                                        transform="translate(1 1)"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        fillRule="evenodd"
                                        strokeLinecap="square"
                                    >
                                        <path d="M18 18l-5.7096-5.7096"></path>
                                        <circle
                                            cx="7.2"
                                            cy="7.2"
                                            r="7.2"
                                        ></circle>
                                    </g>
                                </svg>
                            </button>
                        </form>
                        <div className="results-box">
                            {loading === true ? (
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}
                                >
                                    <Flex
                                        justify="center"
                                        align="center"
                                        gap="middle"
                                    >
                                        <Spin size="large" />
                                    </Flex>
                                </div>
                            ) : (
                                <div
                                    className="search-results"
                                    style={{ display: "block" }}
                                >
                                    {products && products.length > 0
                                        ? products
                                              .slice(0, 4)
                                              .map((product, index) => (
                                                  <NavLink
                                                      key={index}
                                                      className="clearfix"
                                                      to={`san-pham/chi-tiet-san-pham/${product.slug}`}
                                                      title={product.name}
                                                      onClick={() => {
                                                          setProducts("");
                                                      }}
                                                  >
                                                      <div className="img">
                                                          <img
                                                              src={
                                                                  product.image_url
                                                              }
                                                              alt={product.name}
                                                          />
                                                      </div>
                                                      <div className="d-title">
                                                          {product.name}
                                                      </div>
                                                      <div className="d-title d-price">
                                                          {new Intl.NumberFormat(
                                                              "vi-VN",
                                                              {
                                                                  style: "currency",
                                                                  currency:
                                                                      "VND",
                                                              }
                                                          ).format(
                                                              product.price
                                                          )}
                                                      </div>
                                                  </NavLink>
                                              ))
                                        : ""}
                                    {products && products.length > 0 ? (
                                        <NavLink
                                            className="clearfix"
                                            to="/tim-kiem"
                                            title={"Xem tất cả"}
                                            onClick={() => {
                                                dispatch(
                                                    doGetSearchQuery(
                                                        searchQuery
                                                    )
                                                );
                                                setProducts("");
                                            }}
                                        >
                                            <div
                                                className="d-title"
                                                style={{ textAlign: "center" }}
                                            >
                                                Xem tất cả
                                            </div>
                                        </NavLink>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="evo-header-policy">
                        <div className="evo-header-policy-content">
                            <NavLink
                                title="0MIỄN PHÍgiao hàngcho đơn 500k"
                                className="evo-header-policy-item"
                            >
                                <div className="big-title">0</div>
                                <div className="small-title">
                                    <span>MIỄN PHÍ</span>
                                    <span>giao hàng</span>
                                    <span>cho đơn 500k</span>
                                </div>
                            </NavLink>
                            <NavLink
                                title="3NGÀY1 ĐỔI 1nếu hàng lỗi"
                                className="evo-header-policy-item"
                            >
                                <div className="big-title">3</div>
                                <div className="small-title">
                                    <span>NGÀY</span>
                                    <span>1 ĐỔI 1</span>
                                    <span>nếu hàng lỗi</span>
                                </div>
                            </NavLink>
                            <NavLink
                                title="22NĂMXUẤT KHẨUhàng chất"
                                className="evo-header-policy-item"
                            >
                                <div className="big-title">22</div>
                                <div className="small-title">
                                    <span>NĂM</span>
                                    <span>XUẤT KHẨU</span>
                                    <span>hàng chất</span>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="evo-main-account d-lg-flex d-none">
                        <NavLink
                            to={
                                isAuthenticated
                                    ? "/tai-khoan/thong-tin-tai-khoan"
                                    : "/dang-nhap"
                            }
                            className="header-account"
                            aria-label="Tài khoản"
                            title="Tài khoản"
                        >
                            <svg viewBox="0 0 512 512">
                                <path
                                    d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148    C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962    c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216    h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40    c59.551,0,108,48.448,108,108S315.551,256,256,256z"
                                    data-original="#222222"
                                    className="active-path"
                                    fill="#222222"
                                ></path>
                            </svg>
                            <span className="acc-text">Tài khoản</span>
                        </NavLink>
                        <ul>
                            <li className="ng-scope">
                                {isAuthenticated ? (
                                    <NavLink
                                        to="/tai-khoan/thong-tin-tai-khoan"
                                        title="Tài khoản"
                                    >
                                        Tài khoản
                                    </NavLink>
                                ) : (
                                    <NavLink to="/dang-nhap" title="Đăng nhập">
                                        Đăng nhập
                                    </NavLink>
                                )}
                            </li>
                            {isAuthenticated && isAdmin === "admin" ? (
                                <li className="ng-scope">
                                    <NavLink to="/admin" title="Admin">
                                        Quản lý
                                    </NavLink>
                                </li>
                            ) : (
                                ""
                            )}
                            <li className="ng-scope">
                                {isAuthenticated ? (
                                    <NavLink
                                        to="/"
                                        title="Đăng xuất"
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </NavLink>
                                ) : (
                                    <NavLink to="/dang-ky" title="Đăng ký">
                                        Đăng ký
                                    </NavLink>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div
                        className="evo-header-carts d-lg-flex d-none "
                        style={{ cursor: "pointer" }}
                        onClick={showLoading}
                    >
                        <a
                            className="evo-header-cart"
                            aria-label="Xem giỏ hàng"
                            title="Giỏ hàng"
                        >
                            <svg viewBox="0 0 512 512">
                                <g>
                                    <path
                                        xmlns="http://www.w3.org/2000/svg"
                                        d="m504.399 185.065c-6.761-8.482-16.904-13.348-27.83-13.348h-98.604l-53.469-122.433c-3.315-7.591-12.157-11.06-19.749-7.743-7.592 3.315-11.059 12.158-7.743 19.75l48.225 110.427h-178.458l48.225-110.427c3.315-7.592-.151-16.434-7.743-19.75-7.591-3.317-16.434.15-19.749 7.743l-53.469 122.434h-98.604c-10.926 0-21.069 4.865-27.83 13.348-6.637 8.328-9.086 19.034-6.719 29.376l52.657 230c3.677 16.06 17.884 27.276 34.549 27.276h335.824c16.665 0 30.872-11.216 34.549-27.276l52.657-230.001c2.367-10.342-.082-21.048-6.719-29.376zm-80.487 256.652h-335.824c-2.547 0-4.778-1.67-5.305-3.972l-52.657-229.998c-.413-1.805.28-3.163.936-3.984.608-.764 1.985-2.045 4.369-2.045h85.503l-3.929 8.997c-3.315 7.592.151 16.434 7.743 19.75 1.954.854 3.99 1.258 5.995 1.258 5.782 0 11.292-3.363 13.754-9l9.173-21.003h204.662l9.173 21.003c2.462 5.638 7.972 9 13.754 9 2.004 0 4.041-.404 5.995-1.258 7.592-3.315 11.059-12.158 7.743-19.75l-3.929-8.997h85.503c2.384 0 3.761 1.281 4.369 2.045.655.822 1.349 2.18.936 3.983l-52.657 230c-.528 2.301-2.76 3.971-5.307 3.971z"
                                        fill="#ffffff"
                                        data-original="#000000"
                                    ></path>
                                    <path
                                        xmlns="http://www.w3.org/2000/svg"
                                        d="m166 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c0-8.284-6.715-15-15-15z"
                                        fill="#ffffff"
                                        data-original="#000000"
                                    ></path>
                                    <path
                                        xmlns="http://www.w3.org/2000/svg"
                                        d="m256 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c0-8.284-6.716-15-15-15z"
                                        fill="#ffffff"
                                        data-original="#000000"
                                    ></path>
                                    <path
                                        xmlns="http://www.w3.org/2000/svg"
                                        d="m346 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c-.001-8.284-6.716-15-15-15z"
                                        fill="#ffffff"
                                        data-original="#000000"
                                    ></path>
                                </g>
                            </svg>
                            <span className="count_item_pr">0</span>
                            <span className="acc-text">Giỏ hàng</span>
                        </a>
                    </div>
                </div>
            </header>

            <div id="nav">
                <ul className="nav container">
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                            title="Trang chủ"
                        >
                            Trang chủ
                        </NavLink>
                    </li>

                    <li className=" nav-item has-childs  ">
                        <NavLink
                            to="san-pham/tat-ca-san-pham"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                            title="Sản phẩm"
                        >
                            Sản phẩm
                            <svg
                                className="plus-nClick1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 490.656 490.656"
                                width="25px"
                                height="25px"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const dropdownMenu = document.querySelector(
                                        "#nav .nav .nav-item ul.dropdown-menu"
                                    );
                                    if (isShowDropdown) {
                                        dropdownMenu.style.display = "none";
                                        setShowDropdown(!isShowDropdown);
                                    } else {
                                        dropdownMenu.style.display = "block";
                                        setShowDropdown(!isShowDropdown);
                                    }
                                }}
                            >
                                <path
                                    d="M487.536,120.445c-4.16-4.16-10.923-4.16-15.083,0L245.339,347.581L18.203,120.467c-4.16-4.16-10.923-4.16-15.083,0    c-4.16,4.16-4.16,10.923,0,15.083l234.667,234.667c2.091,2.069,4.821,3.115,7.552,3.115s5.461-1.045,7.531-3.136l234.667-234.667    C491.696,131.368,491.696,124.605,487.536,120.445z"
                                    data-original="#000000"
                                    className="active-path"
                                    data-old_color="#000000"
                                    fill="#141414"
                                ></path>
                            </svg>
                        </NavLink>

                        <ul className="dropdown-menu">
                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                <NavLink
                                    className="nav-link"
                                    to="san-pham/san-pham-cho-meo"
                                    title="Sản phẩm cho mèo"
                                    data-animal={
                                        animals &&
                                        animals[0]?.animal_id &&
                                        "MEO"
                                    }
                                    onClick={(e) => {
                                        setFilter(
                                            e.target.getAttribute("data-animal")
                                        );
                                    }}
                                >
                                    Sản phẩm cho mèo
                                    <svg
                                        className="plus-nClick2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 490.656 490.656"
                                        width="25px"
                                        height="25px"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const liElement = e.target.closest(
                                                "li.dropdown-submenu"
                                            );
                                            const dropdownMenu =
                                                liElement.querySelector(
                                                    "ul.dropdown-menu"
                                                );
                                            if (isShowDropdownLv2) {
                                                dropdownMenu.style.display =
                                                    "none";
                                                setShowDropdownLv2(
                                                    !isShowDropdownLv2
                                                );
                                            } else {
                                                dropdownMenu.style.display =
                                                    "block";
                                                setShowDropdownLv2(
                                                    !isShowDropdownLv2
                                                );
                                            }
                                        }}
                                    >
                                        <path
                                            d="M487.536,120.445c-4.16-4.16-10.923-4.16-15.083,0L245.339,347.581L18.203,120.467c-4.16-4.16-10.923-4.16-15.083,0    c-4.16,4.16-4.16,10.923,0,15.083l234.667,234.667c2.091,2.069,4.821,3.115,7.552,3.115s5.461-1.045,7.531-3.136l234.667-234.667    C491.696,131.368,491.696,124.605,487.536,120.445z"
                                            data-original="#000000"
                                            className="active-path"
                                            data-old_color="#000000"
                                            fill="#141414"
                                        ></path>
                                    </svg>
                                </NavLink>
                                <ul className="dropdown-menu">
                                    {categoriesCat &&
                                        categoriesCat?.map((cat) => {
                                            return (
                                                <li
                                                    key={cat.id}
                                                    className="nav-item-lv3"
                                                >
                                                    <NavLink
                                                        className="nav-link"
                                                        to="san-pham/loai-san-pham"
                                                        title={cat.name}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        data-animal={
                                                            cat.category_id
                                                        }
                                                        onClick={(e) => {
                                                            setFilter(
                                                                e.target.getAttribute(
                                                                    "data-animal"
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {cat.name}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </li>
                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                <NavLink
                                    className="nav-link"
                                    to="san-pham/san-pham-cho-cho"
                                    title="Sản phẩm cho chó"
                                    data-animal={
                                        animals &&
                                        animals[0]?.animal_id &&
                                        "CHO"
                                    }
                                    onClick={(e) => {
                                        setFilter(
                                            e.target.getAttribute("data-animal")
                                        );
                                    }}
                                >
                                    Sản phẩm cho chó{" "}
                                    <svg
                                        className="plus-nClick2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 490.656 490.656"
                                        width="25px"
                                        height="25px"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const liElement = e.target.closest(
                                                "li.dropdown-submenu"
                                            );
                                            const dropdownMenu =
                                                liElement.querySelector(
                                                    "ul.dropdown-menu"
                                                );
                                            if (isShowDropdownLv2) {
                                                dropdownMenu.style.display =
                                                    "none";
                                                setShowDropdownLv2(
                                                    !isShowDropdownLv2
                                                );
                                            } else {
                                                dropdownMenu.style.display =
                                                    "block";
                                                setShowDropdownLv2(
                                                    !isShowDropdownLv2
                                                );
                                            }
                                        }}
                                    >
                                        <path
                                            d="M487.536,120.445c-4.16-4.16-10.923-4.16-15.083,0L245.339,347.581L18.203,120.467c-4.16-4.16-10.923-4.16-15.083,0    c-4.16,4.16-4.16,10.923,0,15.083l234.667,234.667c2.091,2.069,4.821,3.115,7.552,3.115s5.461-1.045,7.531-3.136l234.667-234.667    C491.696,131.368,491.696,124.605,487.536,120.445z"
                                            data-original="#000000"
                                            className="active-path"
                                            data-old_color="#000000"
                                            fill="#141414"
                                        ></path>
                                    </svg>
                                </NavLink>
                                <ul className="dropdown-menu">
                                    {categoriesDog &&
                                        categoriesDog?.map((dog, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="nav-item-lv3"
                                                >
                                                    <NavLink
                                                        className="nav-link"
                                                        to="/san-pham/loai-san-pham"
                                                        title={dog.name}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        data-animal={
                                                            dog.category_id
                                                        }
                                                        onClick={(e) => {
                                                            setFilter(
                                                                e.target.getAttribute(
                                                                    "data-animal"
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {dog.name}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item  ">
                        <NavLink
                            to="/gioi-thieu"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                            title="Giới thiệu"
                        >
                            Giới thiệu
                        </NavLink>
                    </li>

                    <li className="nav-item  ">
                        <NavLink
                            to="/lien-he"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                            title="Liên hệ"
                        >
                            Liên hệ
                        </NavLink>
                    </li>
                </ul>
            </div>
            <DrawerCart
                drawer={drawer}
                setDrawer={setDrawer}
                loadingOrder={loadingOrder}
                showLoading={showLoading}
            />
        </section>
    );
};

export default Header;
