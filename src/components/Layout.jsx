import { useState } from "react";
import { DesktopOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import FarmDropdown from "./FarmDropdown";

const { Header, Content, Footer, Sider } = Layout;

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

const items = [
  {
    key: "Perfil",
    icon: <UserOutlined />,
    label: <a href="/profile">Perfil</a>,
  },
  {
    key: "Granjas",
    icon: <DesktopOutlined />,
    label: <a href="/granjas">Granjas</a>,
  },
  {
    key: "Calendario",
    icon: <CalendarOutlined />,
    label: <a href="/event">Calendario</a>,
  },
  {
    key: "Dasboards",
    icon: <CalendarOutlined />,
    label: <a href="/dashboard">Dasboards</a>,
  },
];

const ContainerMain = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Layout style={{ height: "100%", width: "100%" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header style={{ padding: "0 20px", background: "white" }}>
            <FarmDropdown />
          </Header>
          <Content style={{ padding: "20px", paddingTop: "30px" }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>PorkiApp</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default ContainerMain;
