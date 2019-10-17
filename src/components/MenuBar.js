import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

export default function MenuBar() {
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [localState, setLocalState] = useState({ current: path });

  const handleClick = e => {
    setLocalState({ current: e.key });
  };

  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={[localState.current]}
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="home">
          <Icon type="home" />
          <span>Home</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="login">
          <Icon type="login" />
          <span>Login</span>
          <Link to="/login" />
        </Menu.Item>
      </Menu>
    </>
  );
}
