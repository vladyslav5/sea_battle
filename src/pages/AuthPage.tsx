import React, {useState} from 'react';
import {Layout, Menu, MenuProps, Row} from "antd";
import CreateForm from "../components/CreateForm";
import MenuItem from "antd/es/menu/MenuItem";
import EnterForm from "../components/EnterForm";

const items: MenuProps["items"] = [{
    label: "Enter the game",
    key: "enter",
}, {
    label: "Create the game",
    key: "create"
}]
const AuthPage = () => {
    const [current, setCurrent] = useState("enter")
    const onClick: MenuProps["onClick"] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    }
    return (
        <Layout>
            <Row justify={"center"}>
                <Menu
                    mode={"horizontal"}
                    items={items}
                    onClick={onClick}
                    selectedKeys={[current]}
                >
                </Menu>
            </Row>
            <Row justify={"center"} align={"middle"} style={{height: "100vh"}}>
                {current === "enter" ? <EnterForm/> : (
                    current === "create" &&
                    <CreateForm/>)}
            </Row>
        </Layout>
    );
};

export default AuthPage;