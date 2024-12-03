import { useContext, useEffect, useState } from "react";
import "./Sidebar.scss";
import {
    callFetchAnimal,
    callFetchBrand,
    callFetchCategoryCat,
    callFetchCategoryDog,
} from "../../services/api";
import { NavLink } from "react-router-dom";
import { AnimalContext } from "../../context/animal.context";

const Sidebar = ({
    setSelectedBrands,
    setSelectedPriceRange,
    selectedBrands,
    selectedPriceRange,
}) => {
    // React State
    const [activeItem, setActiveItem] = useState(true);
    const [activeItemFilter1, setActiveItemFilter1] = useState(false);
    const [activeItemFilter2, setActiveItemFilter2] = useState(false);

    // Data
    const [categoriesDog, setCategoriesDog] = useState();
    const [categoriesCat, setCategoriesCat] = useState();
    const [brands, setBrands] = useState();
    const [animals, setAnimals] = useState();

    //Context
    const { setFilter } = useContext(AnimalContext);

    // Fetch API
    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchAnimals();
    }, []);

    // Fuction
    const fetchCategories = async () => {
        const resDog = await callFetchCategoryDog();
        if (resDog && resDog.data) {
            setCategoriesDog(resDog.data);
        }

        const resCat = await callFetchCategoryCat();
        if (resCat && resCat.data) {
            setCategoriesCat(resCat.data);
        }
    };

    const fetchBrands = async () => {
        const res = await callFetchBrand();
        if (res && res.data) {
            setBrands(res.data);
        }
    };

    const fetchAnimals = async () => {
        const res = await callFetchAnimal();
        if (res && res.data) {
            let raw = res.data;
            setAnimals(raw);
        }
    };

    // Hàm xử lý khi người dùng chọn/deselect checkbox
    const handleBrandFilterChange = (e) => {
        const brand = e.target.value;
        const isChecked = e.target.checked;
        console.log(brand);
        if (isChecked) {
            setSelectedBrands((prevSelectedBrands) => [
                ...prevSelectedBrands,
                brand,
            ]);
        } else {
            setSelectedBrands((prevSelectedBrands) =>
                prevSelectedBrands.filter(
                    (selectedBrand) => selectedBrand !== brand
                )
            );
        }
    };

    // Hàm xử lý khi người dùng chọn/deselect checkbox cho khoảng giá
    const handlePriceFilterChange = (e) => {
        const range = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedPriceRange((prevSelectedPriceRange) => [
                ...prevSelectedPriceRange,
                range,
            ]);
        } else {
            setSelectedPriceRange((prevSelectedPriceRange) =>
                prevSelectedPriceRange.filter(
                    (selectedRange) => selectedRange !== range
                )
            );
        }
    };

    return (
        <aside className="sidebar left-content col-lg-3 col-md-12 col-sm-12 col-12">
            <aside className="aside-item collection-category d-none d-lg-block">
                <div className="aside-title">Danh mục</div>
                <div className="aside-content">
                    <ul className="navbar-pills nav-category">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/san-pham/san-pham-cho-meo"
                                title="Sản phẩm cho mèo"
                                data-animal={
                                    animals && animals[0]?.animal_id && "MEO"
                                }
                                onClick={(e) => {
                                    setFilter(
                                        e.target.getAttribute("data-animal")
                                    );
                                }}
                            >
                                Sản phẩm cho mèo
                            </NavLink>
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
                                        liElement.classList.remove("active");
                                        setActiveItem(!activeItem);
                                    }
                                }}
                            ></span>
                            <ul className="dropdown-menu">
                                {categoriesCat &&
                                    categoriesCat.map((cat) => (
                                        <li
                                            key={cat.id}
                                            className="dropdown-submenu nav-item"
                                        >
                                            <NavLink
                                                className="nav-link"
                                                to="/san-pham/loai-san-pham"
                                                title={cat.name}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                data-animal={cat.category_id}
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
                                    ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/san-pham/san-pham-cho-cho"
                                title="Sản phẩm cho chó"
                                data-animal={
                                    animals && animals[0]?.animal_id && "CHO"
                                }
                                onClick={(e) => {
                                    setFilter(
                                        e.target.getAttribute("data-animal")
                                    );
                                }}
                            >
                                Sản phẩm cho chó
                            </NavLink>
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
                                        liElement.classList.remove("active");
                                        setActiveItem(!activeItem);
                                    }
                                }}
                            ></span>
                            <ul className="dropdown-menu">
                                {categoriesDog &&
                                    categoriesDog.map((dog) => (
                                        <li
                                            key={dog.id}
                                            className="dropdown-submenu nav-item"
                                        >
                                            <NavLink
                                                className="nav-link"
                                                to="/san-pham/loai-san-pham"
                                                title={dog.name}
                                                data-animal={dog.category_id}
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
                                    ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="evo-filter-cate aside-filter">
                <div className="aside-titles">Lọc sản phẩm</div>
                <div className="aside-hidden-mobile">
                    <div className="filter-container">
                        <aside className="aside-item filter-vendor">
                            <div
                                className="aside-title"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const divElement = e.target;
                                    if (activeItemFilter1) {
                                        divElement.classList.remove("active");
                                        setActiveItemFilter1(
                                            !activeItemFilter1
                                        );
                                    } else {
                                        divElement.classList.add("active");
                                        setActiveItemFilter1(
                                            !activeItemFilter1
                                        );
                                    }
                                }}
                            >
                                Thương hiệu
                                <span className="ant-svg collapsible-plus"></span>
                            </div>
                            <div className="aside-content filter-group">
                                <ul
                                    className={`filter-vendor ${
                                        activeItemFilter1 ? "d-none" : "d-block"
                                    }`}
                                >
                                    {brands &&
                                        brands.map((brand, index) => (
                                            <li
                                                key={index}
                                                className="filter-item filter-item--check-box filter-item--green"
                                            >
                                                <label htmlFor={index}>
                                                    <input
                                                        id={index}
                                                        type="checkbox"
                                                        value={brand.brand_id}
                                                        checked={selectedBrands.includes(
                                                            brand.brand_id
                                                        )} // Bind checked state
                                                        onChange={
                                                            handleBrandFilterChange
                                                        }
                                                    />
                                                    <i className="fa"></i>
                                                    {brand.name}
                                                </label>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </aside>
                        <aside className="aside-item filter-price">
                            <div
                                className="aside-title"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const divElement = e.target;
                                    if (activeItemFilter2) {
                                        divElement.classList.remove("active");
                                        setActiveItemFilter2(
                                            !activeItemFilter2
                                        );
                                    } else {
                                        divElement.classList.add("active");
                                        setActiveItemFilter2(
                                            !activeItemFilter2
                                        );
                                    }
                                }}
                            >
                                Giá sản phẩm{" "}
                                <span className="ant-svg collapsible-plus"></span>
                            </div>
                            <div className="aside-content filter-group">
                                <ul
                                    className={`filter-vendor ${
                                        activeItemFilter2 ? "d-none" : "d-block"
                                    }`}
                                >
                                    <li className="filter-item filter-item--check-box filter-item--green">
                                        <span>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value="0-100000"
                                                    checked={selectedPriceRange.includes(
                                                        "0-100000"
                                                    )}
                                                    onChange={
                                                        handlePriceFilterChange
                                                    }
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
                                                    value="100000-200000"
                                                    checked={selectedPriceRange.includes(
                                                        "100000-200000"
                                                    )}
                                                    onChange={
                                                        handlePriceFilterChange
                                                    }
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
                                                    value="200000-300000"
                                                    checked={selectedPriceRange.includes(
                                                        "200000-300000"
                                                    )}
                                                    onChange={
                                                        handlePriceFilterChange
                                                    }
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
                                                    value="300000-500000"
                                                    checked={selectedPriceRange.includes(
                                                        "300000-500000"
                                                    )}
                                                    onChange={
                                                        handlePriceFilterChange
                                                    }
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
                                                    value="500000-1000000"
                                                    checked={selectedPriceRange.includes(
                                                        "500000-1000000"
                                                    )}
                                                    onChange={
                                                        handlePriceFilterChange
                                                    }
                                                />
                                                <i className="fa"></i>
                                                500.000đ - 1.000.000đ
                                            </label>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                        <aside
                            className="aside-item delete-filter-item"
                            style={{
                                textAlign: "center",
                                marginTop: "20px",
                                padding: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            <a
                                className="nav-link"
                                title="Xóa lọc sản phẩm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedBrands([]); // Reset brand filter
                                    setSelectedPriceRange([]); // Reset price range filter
                                }}
                            >
                                Xóa lọc sản phẩm
                            </a>
                        </aside>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
