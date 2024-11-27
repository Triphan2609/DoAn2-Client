import { Helmet } from "react-helmet";
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";
import "../Product.scss";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Collection from "../../../../components/Collection/Collection";
const AllProducts = () => {
    return (
        <div className="product-page">
            <Helmet>
                <title>Tất cả sản phẩm</title>
            </Helmet>
            <BreadCrumb title={"Tất cả sản phẩm"} />
            <div className="container ant-cate-content">
                <div className="row">
                    <Sidebar />
                    <Collection />
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
