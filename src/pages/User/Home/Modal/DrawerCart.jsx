import { Drawer } from "antd";
import "./DrawerCart.scss";
const DrawerCart = ({ loading, open, setOpen }) => {
    return (
        <>
            <Drawer
                closeIcon={false}
                destroyOnClose
                placement="right"
                open={open}
                loading={loading}
                onClose={() => setOpen(false)}
            >
                <div className="clearfix cart_heading">
                    <h4 className="cart_title">Giỏ hàng</h4>
                    <div
                        className="cart_btn-close"
                        title="Đóng giỏ hàng"
                        onClick={() => setOpen(false)}
                    >
                        <svg className="Icon Icon--close" viewBox="0 0 16 14">
                            <path
                                d="M15 0L1 14m14 0L1 0"
                                stroke="currentColor"
                                fill="none"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div className="cart_body">
                    <div className="cart-empty d-none">
                        <span className="empty-icon">
                            <i className="ico ico-cart"></i>
                        </span>
                        <div className="btn-cart-empty">
                            <a
                                className="btn btn-default"
                                title="Tiếp tục mua hàng"
                                onClick={() => setOpen(false)}
                            >
                                Tiếp tục mua hàng
                            </a>
                        </div>
                    </div>
                    <div className="clearfix cart_product productid-60459343">
                        <a
                            className="cart_image"
                            href="/bo-chan-ga-goi-boc-gau-grizzly-5"
                            title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m) - 1.6 / Mặc định"
                        >
                            <img
                                src="https://bizweb.dktcdn.net/thumb/medium/100/147/060/products/bai-117-p-22-811f5084-22e5-4554-9ab2-c1857f6e51d1.png"
                                alt="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m) - 1.6 / Mặc định"
                            />
                        </a>
                        <div className="cart_info">
                            <div className="cart_name">
                                <a
                                    href="/bo-chan-ga-goi-boc-gau-grizzly-5"
                                    title="Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m) - 1.6 / Mặc định"
                                >
                                    Bộ chăn ga gối (bọc) Gấu Grizzly (1.6*2m) -
                                    1.6 / Mặc định
                                </a>
                            </div>
                            <div className="row-cart-left">
                                <div className="cart_item_name">
                                    <label className="cart_size variant-title-popup d-none">
                                        1.6 / Mặc định
                                    </label>
                                    <div>
                                        <label className="cart_quantity">
                                            Số lượng
                                        </label>
                                        <div className="cart_select mt-2">
                                            <div className="input-group-btn">
                                                <input
                                                    className="variantID"
                                                    type="hidden"
                                                    name="variantId"
                                                    value="60459343"
                                                />
                                                <button
                                                    disabled=""
                                                    className="reduced items-count btn-minus btn btn-default"
                                                    type="button"
                                                >
                                                    –
                                                </button>
                                                <input
                                                    type="text"
                                                    maxLength="3"
                                                    min="0"
                                                    className="input-text number-sidebar"
                                                    name="Lines"
                                                    size="4"
                                                    value="1"
                                                />
                                                <button
                                                    className="increase items-count btn-plus btn btn-default"
                                                    type="button"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right cart_prices">
                                    <div className="cart__price">
                                        <span className="cart__sale-price">
                                            3.949.000₫
                                        </span>
                                    </div>
                                    <a
                                        className="cart__btn-remove remove-item-cart"
                                        title="Bỏ sản phẩm"
                                    >
                                        Bỏ sản phẩm
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-footer">
                    <hr />
                    <div className="clearfix">
                        <div className="cart__subtotal">
                            <div className="cart__col-6">Tổng tiền:</div>
                            <div className="text-right cart__totle">
                                <span className="total-price">0₫</span>
                            </div>
                        </div>
                    </div>
                    <div className="cart__btn-proceed-checkout-dt">
                        <button
                            type="button"
                            className="button btn btn-default cart__btn-proceed-checkout"
                            id="btn-proceed-checkout"
                            title="Thanh toán"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </Drawer>
        </>
    );
};
export default DrawerCart;
