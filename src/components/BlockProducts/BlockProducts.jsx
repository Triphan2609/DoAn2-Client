import { NavLink } from "react-router-dom";
import "./BlockProducts.scss";
const BlockProducts = () => {
    return (
        <div className="block-product">
            <div className="evo-product-block-item">
                <NavLink
                    to="/bo-chan-ga-goi-boc-hoa-kiki-kaikai-25"
                    title="Bộ chăn ga gối (bọc) Hoa Kiki Kaikai (1.8*2m)"
                    className="product-transition"
                >
                    <img
                        className="product-thumbnail lazy loaded"
                        src="//bizweb.dktcdn.net/thumb/large/100/147/060/products/bai-117-p-1.png?v=1646295923943"
                        alt="Bộ chăn ga gối (bọc) Hoa Kiki Kaikai (1.8*2m)"
                    />
                </NavLink>
                <div className="product-info">
                    <NavLink
                        to="/bo-chan-ga-goi-boc-hoa-kiki-kaikai-25"
                        title="Bộ chăn ga gối (bọc) Hoa Kiki Kaikai (1.8*2m)"
                        className="ant-item-product-name"
                    >
                        Bộ chăn ga gối (bọc) Hoa Kiki Kaikai (1.8*2m)
                    </NavLink>
                    <div className="product__price">
                        <span className="price">4.499.000₫</span>
                    </div>
                </div>

                <NavLink
                    to="/bo-chan-ga-goi-boc-hoa-kiki-kaikai-25"
                    className="action add_to_cart cart-button"
                    title="Mua ngay"
                >
                    Mua ngay
                </NavLink>
            </div>
        </div>
    );
};

export default BlockProducts;
