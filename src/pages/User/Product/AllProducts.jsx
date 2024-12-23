import { Helmet } from "react-helmet";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Product.scss";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Collection from "../../../components/Collection/Collection";
import { useEffect, useState } from "react";
import { callFetchAllProducts } from "../../../services/api";

const AllProducts = () => {
    // Data
    const [products, setProducts] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);

    // States React
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
        limit: 12,
    });

    const [sortBy, setSortBy] = useState("createdAt"); // Mặc định sắp xếp theo ngày thêm mới
    const [sortOrder, setSortOrder] = useState("ASC");

    useEffect(() => {
        fetchProducts(
            pagination.currentPage,
            pagination.limit,
            sortBy,
            sortOrder,
            selectedBrands,
            selectedPriceRange
        );
    }, [
        pagination.currentPage,
        pagination.limit,
        sortBy,
        sortOrder,
        selectedBrands,
        selectedPriceRange,
    ]);

    // Fetch function
    const fetchProducts = async (
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "ASC",
        brand = [],
        priceRange = []
        // New parameter for brand filters
    ) => {
        const res = await callFetchAllProducts(
            page,
            limit,
            sortBy,
            sortOrder,
            brand,
            priceRange
        );

        if (res && res.data) {
            setProducts(res.data.products);
            console.log(products);

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
                <title>Tất cả sản phẩm</title>
            </Helmet>
            <BreadCrumb title={"Tất cả sản phẩm"} />
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

export default AllProducts;
