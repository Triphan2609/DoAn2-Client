import { useEffect, useState } from "react";
import "./Sidebar.scss";
import {
    callFetchBrand,
    callFetchCategoryCat,
    callFetchCategoryDog,
} from "../../services/api";

const Sidebar = () => {
    // React State
    const [activeItem, setActiveItem] = useState(true);
    const [activeItemFilter, setActiveItemFilter] = useState(false);

    // Data
    const [categoriesDog, setCategoriesDog] = useState();
    const [categoriesCat, setCategoriesCat] = useState();
    const [brands, setBrands] = useState();

    // Fetch API
    useEffect(() => {
        fetchCategories();
        fetchBrands();
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

    const fetchBrands = async () => {
        const res = await callFetchBrand();
        if (res && res.data) {
            let raw = res.data;
            setBrands(raw);
        }
    };

    return (
        <>
            <aside className="sidebar left-content col-lg-3 col-md-12 col-sm-12 col-12">
                <aside className="aside-item collection-category d-none d-lg-block">
                    <div className="aside-title">Danh mục</div>
                    <div className="aside-content">
                        <ul className="navbar-pills nav-category">
                            <li className="nav-item">
                                <a
                                    href="/tui-xach-balo"
                                    className="nav-link"
                                    title="Thời trang trẻ em"
                                >
                                    Sản phẩm cho mèo
                                </a>
                                <span
                                    className="Collapsible__Plus"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const liElement =
                                            e.target.closest("li.nav-item");
                                        if (activeItem) {
                                            liElement.classList.add("active");
                                            setActiveItem(!activeItem);
                                        } else {
                                            liElement.classList.remove(
                                                "active"
                                            );
                                            setActiveItem(!activeItem);
                                        }
                                    }}
                                ></span>
                                <ul className="dropdown-menu">
                                    {categoriesCat &&
                                        categoriesCat?.map((cat) => {
                                            return (
                                                <li
                                                    key={cat.id}
                                                    className="dropdown-submenu nav-item"
                                                >
                                                    <a
                                                        className="nav-link"
                                                        to="/quan-ao"
                                                        title={cat.name}
                                                    >
                                                        {cat.name}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a
                                    href="/tui-xach-balo"
                                    className="nav-link"
                                    title="Thời trang trẻ em"
                                >
                                    Sản phẩm cho chó
                                </a>
                                <span
                                    className="Collapsible__Plus"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const liElement =
                                            e.target.closest("li.nav-item");
                                        if (activeItem) {
                                            liElement.classList.add("active");
                                            setActiveItem(!activeItem);
                                        } else {
                                            liElement.classList.remove(
                                                "active"
                                            );
                                            setActiveItem(!activeItem);
                                        }
                                    }}
                                ></span>
                                <ul className="dropdown-menu">
                                    {categoriesDog &&
                                        categoriesDog?.map((dog) => {
                                            return (
                                                <li
                                                    key={dog.id}
                                                    className="dropdown-submenu nav-item"
                                                >
                                                    <a
                                                        className="nav-link"
                                                        to="/quan-ao"
                                                        title={dog.name}
                                                    >
                                                        {dog.name}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="evo-filter-cate aside-filter">
                    <div className="aside-titles">Lọc sản phẩm</div>
                    <div className="aside-hidden-mobile">
                        <div className="filter-container">
                            <div className="filter-containers d-none">
                                <div className="filter-container__selected-filter">
                                    <div className="filter-container__selected-filter-list clearfix">
                                        <ul></ul>
                                        <a
                                            className="filter-container__clear-all"
                                            title="Bỏ hết"
                                        >
                                            Bỏ hết
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <aside className="aside-item filter-vendor">
                                <div className="aside-title">
                                    Thương hiệu{" "}
                                    <span
                                        className="ant-svg collapsible-plus"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const divElement =
                                                e.target.closest(
                                                    "div.aside-title"
                                                );
                                            if (activeItemFilter) {
                                                divElement.classList.remove(
                                                    "active"
                                                );
                                                setActiveItemFilter(
                                                    !activeItemFilter
                                                );
                                            } else {
                                                divElement.classList.add(
                                                    "active"
                                                );

                                                setActiveItemFilter(
                                                    !activeItemFilter
                                                );
                                            }
                                        }}
                                    ></span>
                                </div>
                                <div className="aside-content filter-group">
                                    <ul
                                        className={`filter-vendor ${
                                            activeItemFilter
                                                ? "d-none"
                                                : "d-block"
                                        }`}
                                    >
                                        {brands &&
                                            brands.map((brand, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="filter-item filter-item--check-box filter-item--green "
                                                    >
                                                        <label className="c-ty-tnhh-may-mac-thang-long">
                                                            <input
                                                                type="checkbox"
                                                                value={
                                                                    brand.name
                                                                }
                                                            />
                                                            <i className="fa"></i>
                                                            {brand.name}
                                                        </label>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </aside>

                            <aside className="aside-item filter-price">
                                <div className="aside-title">
                                    Giá sản phẩm{" "}
                                    <span className="ant-svg collapsible-plus"></span>
                                </div>
                                <div className="aside-content filter-group">
                                    <ul>
                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input type="checkbox" />
                                                    <i className="fa"></i>
                                                    Giá dưới 100.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input type="checkbox" />
                                                    <i className="fa"></i>
                                                    100.000đ - 200.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input type="checkbox" />
                                                    <i className="fa"></i>
                                                    200.000đ - 300.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input type="checkbox" />
                                                    <i className="fa"></i>
                                                    300.000đ - 500.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input type="checkbox" />
                                                    <i className="fa"></i>
                                                    500.000đ - 1.000.000đ
                                                </label>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
