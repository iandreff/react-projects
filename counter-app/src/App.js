import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/Counters";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Counters />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
