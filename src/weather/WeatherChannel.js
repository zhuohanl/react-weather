import React, { Component } from "react";

import CityCondition from "./CityCondition";
import Forecaster from "./Forecaster";
// also include another comp for search input and other functions
import Toolbar from "./Toolbar"; // will define later

// responsible for maintain necessary data (from API response) in the state
// pass them down to child
export default class WeatherChannel extends Component {
  constructor(props) {
    super(props);
    // use static data to fill initial state first
    this.state = {
      condition: {
        city: "--",
        temp: "--",
        weather: "--"
      },
      days: [
        {
          weekday: "--",
          high: 23,
          low: 18,
          icon: "http://icons.wxug.com/i/c/k/clear.gif"
        },
        {
          weekday: "--",
          high: 29,
          low: 18,
          icon: "http://icons.wxug.com/i/c/k/chancerain.gif"
        },
        {
          weekday: "--",
          high: 20,
          low: 10,
          icon: "http://icons.wxug.com/i/c/k/chancerain.gif"
        },
        {
          weekday: "--",
          high: 20,
          low: 10,
          icon: "http://icons.wxug.com/i/c/k/chancerain.gif"
        },
        {
          weekday: "--",
          high: 20,
          low: 10,
          icon: "http://icons.wxug.com/i/c/k/chancerain.gif"
        },
        {
          weekday: "--",
          high: 20,
          low: 10,
          icon: "http://icons.wxug.com/i/c/k/chancerain.gif"
        },
        {
          weekday: "--",
          high: 20,
          low: 10,
          icon: "http://icons.wxug.com/i/c/k/chancerain.gif"
        }
      ]
    };
  }

  onConditionLoad(data) {
    const condition = {
      city: data.display_location.full,
      temp: `${data.temp_c}c`,
      weather: data.weather
      // descs
    };
    this.setState({ condition });
  }

  onForecastLoad(data) {
    const days = data.map(d => ({
      weekday: d.date.weekday,
      high: d.high.celsius,
      low: d.low.celsius,
      icon: d.icon_url
    }));

    this.setState({ days });
  }

  render() {
    return (
      <main>
        <Toolbar
          onConditionLoad={data => this.onConditionLoad(data)}
          onForecastLoad={data => this.onForecastLoad(data)}
        />
        <section id="left">
          <CityCondition {...this.state.condition} />
        </section>
        <section id="right">
          <Forecaster days={this.state.days} />
        </section>
      </main>
    );
  }
}
