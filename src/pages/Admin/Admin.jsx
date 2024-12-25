import "./Admin.scss";
import { Layout, Menu, theme } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
    const { Header, Footer, Sider } = Layout;

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className="admin-page">
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{
                        background: colorBgContainer,
                        height: "100vh",
                        position: "fixed", // Cố định sider
                        left: 0, // Đặt sider ở cạnh trái
                        top: 0, // Đặt sider ở cạnh trên
                        bottom: 0, // Đặt sider ở cạnh dưới
                    }}
                >
                    <div className="logo" style={{ padding: "10px" }}>
                        <NavLink to="/">
                            <img
                                width="237"
                                height="66"
                                src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/logo.png?1722413377105"
                                alt="Pet Shop"
                                className="lazy img-responsive mx-auto d-none d-lg-block  loaded"
                            />
                        </NavLink>
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                    >
                        <MenuItem>
                            <NavLink to={"/admin"}>Dashboard</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to={"/admin/account"}>
                                Quản lý tài khoản
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to={"/admin/product"}>
                                Quản lý sản phẩm
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to={"/admin/order"}>
                                Quản lý đơn hàng
                            </NavLink>
                        </MenuItem>
                    </Menu>
                </Sider>

                <Layout
                    style={{
                        marginLeft: 200, // Căn lề bên trái để tránh đè lên Sider
                        minHeight: "100vh",
                    }}
                >
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h1 style={{ margin: "0" }}>Phan Thanh Trí</h1>
                    </Header>
                    <Outlet />

                    <Footer
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Petshop ©{new Date().getFullYear()} Created by Phan
                        Thanh Tri
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default Admin;
