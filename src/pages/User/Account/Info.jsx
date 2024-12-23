import { useSelector } from "react-redux";
import BlockAccount from "../../../components/BlockAccount/BlockAccount";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Account.scss";
import EditUserModal from "../../Admin/Modal/ModalEditUser";
import { useState } from "react";
import { Button } from "antd";

const Info = () => {
    const user = useSelector((state) => state.account.user);
    const [openEdit, setOpenEdit] = useState(false);

    const onCloseEdit = () => {
        setOpenEdit(false);
    };

    return (
        <div className="info-page" style={{ background: "#fff" }}>
            <BreadCrumb title="Trang khách hàng" />
            <section className="signup page_customer_account">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                            <BlockAccount />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                            <h1 className="title-head margin-top-10">
                                Thông tin tài khoản
                            </h1>
                            <div className="form-signup name-account m992">
                                <p>
                                    <strong>Họ tên:</strong>{" "}
                                    {user ? user?.name : ""}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {user ? user?.email : ""}
                                </p>
                                <p>
                                    <strong>Số điện thoại:</strong>{" "}
                                    {user ? user?.phone : "Chưa có"}
                                </p>
                                <p>
                                    <strong>Địa chỉ:</strong>{" "}
                                    {user ? user?.address : "Chưa có"}
                                </p>
                                <button
                                    onClick={() => setOpenEdit(true)}
                                    className="btn "
                                    style={{
                                        background: "#505d9f",
                                        color: "white",
                                    }}
                                >
                                    Cập nhật thông tin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <EditUserModal
                openEdit={openEdit}
                onCloseEdit={onCloseEdit}
                user={user}
            />
        </div>
    );
};

export default Info;
