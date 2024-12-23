import { Helmet } from "react-helmet";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Product.scss";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Collection from "../../../components/Collection/Collection";
import { useContext, useEffect, useState } from "react";
import { callFetchAllProductsAnimal } from "../../../services/api";
import { AnimalContext } from "../../../context/animal.context";

const ProductsAnimals = () => {
    // Data
    const [products, setProducts] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [sortBy, setSortBy] = useState("createdAt"); // Mặc định sắp xếp theo ngày thêm mới
    const [sortOrder, setSortOrder] = useState("ASC");

    // States React
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
        limit: 12,
    });

    // Context
    const { filter } = useContext(AnimalContext);

    useEffect(() => {
        fetchProducts(
            pagination.currentPage,
            pagination.limit,
            sortBy,
            sortOrder,
            selectedBrands,
            selectedPriceRange,
            filter
        );
    }, [
        pagination.currentPage,
        pagination.limit,
        sortBy,
        sortOrder,
        selectedBrands,
        selectedPriceRange,
        filter,
    ]);

    // Fetch function
    const fetchProducts = async (
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "ASC",
        brand = [],
        priceRange = [],
        filter
    ) => {
        const res = await callFetchAllProductsAnimal(
            page,
            limit,
            sortBy,
            sortOrder,
            brand,
            priceRange,
            filter
        );

        if (res && res.data) {
            setProducts(res.data.products);
            setPagination({
                currentPage: page,
                totalPages: res.data.pagination.totalPages,
                totalProducts: res.data.pagination.totalProducts,
                limit: res.data.pagination.limit,
            });
        }
    };

    // Handle sorting change
    const handleSortChange = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };

    return (
        <div className="product-page">
            <Helmet>
                <title>Sản phẩm cho thú cưng</title>
            </Helmet>
            <BreadCrumb title={"Sản phẩm cho thú cưng"} />
            <div className="container ant-cate-content">
                <div className="row">
                    <Sidebar
                        selectedBrands={selectedBrands}
                        selectedPriceRange={selectedPriceRange}
                        setSelectedBrands={setSelectedBrands}
                        setSelectedPriceRange={setSelectedPriceRange}
                    />
                    <Collection
                        products={products}
                        pagination={pagination}
                        setPagination={setPagination}
                        onSortChange={handleSortChange}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductsAnimals;
