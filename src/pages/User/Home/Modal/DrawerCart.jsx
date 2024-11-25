import { Drawer } from "antd";
import "./DrawerCart.scss";
import { NavLink } from "react-router-dom";
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
                    <div className="cart-empty">
                        <span className="empty-icon">
                            <i className="ico ico-cart"></i>
                        </span>
                        <div className="btn-cart-empty">
                            <NavLink
                                className="btn btn-default"
                                to="/"
                                title="Tiếp tục mua hàng"
                                onClick={() => setOpen(false)}
                            >
                                Tiếp tục mua hàng
                            </NavLink>
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
