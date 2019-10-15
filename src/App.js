import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CtxtProvider } from "./ctx";
import Home from "./pages/Home";

function App() {
  return (
    <CtxtProvider>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </CtxtProvider>
  );
}

export default App;
