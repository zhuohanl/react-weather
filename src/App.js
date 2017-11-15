import React, { Component } from "react";
import Header from "./weather/Header";
import Footer from "./weather/Footer";
import WeatherChannel from "./weather/WeatherChannel";

class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <WeatherChannel />
        <Footer />
      </div>
    );
  }
}

export default App;
