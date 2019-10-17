import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CtxtProvider } from "./ctx";
import Home from "./pages/Home";
import MenuBar from "./components/MenuBar";
import { Layout } from "antd";
import Login from "./pages/Login";

function App() {
  const { Header, Content } = Layout;
  return (
    <CtxtProvider>
      <Router>
        <div className="pad-24">
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <MenuBar />
            </Header>
            <Content>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </Content>
          </Layout>
        </div>
      </Router>
    </CtxtProvider>
  );
}

export default App;
