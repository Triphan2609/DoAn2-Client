import { useState } from "react";
import "./Sidebar.scss";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState(true);
    const [activeItemFilter, setActiveItemFilter] = useState(false);

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
                                    Thời trang trẻ em
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
                                    <li className="dropdown-submenu nav-item">
                                        <a
                                            className="nav-link"
                                            href="/quan-ao"
                                            title="Quần, Áo"
                                        >
                                            Quần, Áo
                                        </a>
                                        <span className="Collapsible__Plus"></span>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-submenu nav-item">
                                                <a
                                                    className="nav-link"
                                                    href="/quan-ao-nguoi-lon"
                                                    title="Quần áo người lớn"
                                                >
                                                    Quần áo người lớn
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a
                                    href="/do-bo-tre-em"
                                    className="nav-link"
                                    title="Đồ bộ trẻ em"
                                >
                                    Đồ bộ trẻ em
                                </a>
                                <span className="Collapsible__Plus"></span>
                                <ul className="dropdown-menu">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            href="/ao-khoac-tre-em"
                                            title="Áo khoác trẻ em"
                                        >
                                            Áo khoác trẻ em
                                        </a>
                                    </li>
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
                                        <li className="filter-item filter-item--check-box filter-item--green ">
                                            <label
                                                data-filter="c.ty tnhh may mặc thăng long"
                                                className="c-ty-tnhh-may-mac-thang-long"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="filter-c-ty-tnhh-may-mac-thang-long"
                                                    data-group="Hãng"
                                                    data-field="vendor.filter_key"
                                                    data-text="C.ty TNHH may mặc Thăng Long"
                                                    value='("C.ty TNHH may mặc Thăng Long")'
                                                    data-operator="OR"
                                                />
                                                <i className="fa"></i>
                                                C.ty TNHH may mặc Thăng Long
                                            </label>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green ">
                                            <label
                                                data-filter="lamell"
                                                className="lamell"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="filter-lamell"
                                                    data-group="Hãng"
                                                    data-field="vendor.filter_key"
                                                    data-text="Lamell"
                                                    value='("Lamell")'
                                                    data-operator="OR"
                                                />
                                                <i className="fa"></i>
                                                Lamell
                                            </label>
                                        </li>
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
                                                    <input
                                                        type="checkbox"
                                                        id="filter-duoi-100-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="Dưới 100.000đ"
                                                        value="(<100000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    Giá dưới 100.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-100-000d-200-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="100.000đ - 200.000đ"
                                                        value="(>100000 AND <200000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    100.000đ - 200.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-200-000d-300-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="200.000đ - 300.000đ"
                                                        value="(>200000 AND <300000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    200.000đ - 300.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-300-000d-500-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="300.000đ - 500.000đ"
                                                        value="(>300000 AND <500000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    300.000đ - 500.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-500-000d-1-000-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="500.000đ - 1.000.000đ"
                                                        value="(>500000 AND <1000000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    500.000đ - 1.000.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-1-000-000d-2-000-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="1.000.000đ - 2.000.000đ"
                                                        value="(>1000000 AND <2000000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    1.000.000đ - 2.000.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-2-000-000d-3-000-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="2.000.000đ - 3.000.000đ"
                                                        value="(>2000000 AND <3000000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    2.000.000đ - 3.000.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-3-000-000d-5-000-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="3.000.000đ - 5.000.000đ"
                                                        value="(>3000000 AND <5000000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    3.000.000đ - 5.000.000đ
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-5-000-000d-7-000-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="5.000.000đ - 7.000.000đ"
                                                        value="(>5000000 AND <7000000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    5.000.000đ - 7.000.000đ
                                                </label>
                                            </span>
                                        </li>
                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-tren7-000-000d"
                                                        data-group="Khoảng giá"
                                                        data-field="price_min"
                                                        data-text="Trên 7.000.000đ"
                                                        value="(>7000000)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    Giá trên 7.000.000đ
                                                </label>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </aside>

                            <aside className="aside-item filter-type">
                                <div className="aside-title">
                                    Loại sản phẩm{" "}
                                    <span className="ant-svg collapsible-plus"></span>
                                </div>
                                <div className="aside-content filter-group">
                                    <ul className="filter-type">
                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <label data-filter="túi đeo trẻ em">
                                                <input
                                                    type="checkbox"
                                                    id="filter-tui-deo-tre-em"
                                                    data-group="Loại"
                                                    data-field="product_type.filter_key"
                                                    data-text="TÚI ĐEO TRẺ EM"
                                                    value='("TÚI ĐEO TRẺ EM")'
                                                    data-operator="OR"
                                                />
                                                <i className="fa"></i>
                                                TÚI ĐEO TRẺ EM
                                            </label>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <label data-filter="vỏ gối cục xương">
                                                <input
                                                    type="checkbox"
                                                    id="filter-vo-goi-cuc-xuong"
                                                    data-group="Loại"
                                                    data-field="product_type.filter_key"
                                                    data-text="Vỏ gối cục xương"
                                                    value='("Vỏ gối cục xương")'
                                                    data-operator="OR"
                                                />
                                                <i className="fa"></i>
                                                Vỏ gối cục xương
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </aside>

                            <aside className="aside-item filter-tag-style-1 tag-filtster">
                                <div className="aside-title">
                                    Nhãn hiệu{" "}
                                    <span className="ant-svg collapsible-plus"></span>
                                </div>
                                <div className="aside-content filter-group">
                                    <ul>
                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-lamell-kids"
                                                        data-text="Lamell Kids"
                                                        value="(Lamell Kids)"
                                                        data-operator="OR"
                                                    />
                                                    Lamell Kids
                                                </label>
                                            </span>
                                        </li>

                                        <li className="filter-item filter-item--check-box filter-item--green">
                                            <span>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="filter-lamell-teen"
                                                        data-text="Lamell Teen"
                                                        value="(Lamell Teen)"
                                                        data-operator="OR"
                                                    />
                                                    <i className="fa"></i>
                                                    Lamell Teen
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
