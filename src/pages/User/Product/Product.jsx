import { Helmet } from "react-helmet";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Product.scss";
const Product = () => {
    return (
        <div className="product-page">
            <Helmet>
                <title>Tất cả sản phẩm</title>
            </Helmet>
            <BreadCrumb title={"Tất cả sản phẩm"} />
        </div>
    );
};

export default Product;
