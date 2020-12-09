import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./navBar/NavBar";
import Home from "./Home/Home";
import Detail from "./Detail/Detail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/details/:id" component={Detail}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
