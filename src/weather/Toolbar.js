import React, { Component } from "react";

const CONDITION_BASE_URL =
  "http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/";
const FORECAST_BASE_URL =
  "http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/";

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curCity: "Adelaide"
    };

    this._conditionXHR = new XMLHttpRequest();
    this._conditionXHR.onload = () => {
      this.handleConditionData();
    };

    this._forecastXHR = new XMLHttpRequest();
    this._forecastXHR.onload = () => {
      this.handleForecastData();
    };
  }

  componentDidMount() {
    const { curCity } = this.state;
    console.log("componentDidMount(): this.state.curCity", this.state.curCity);
    this.fetchConditionData(curCity);
    this.fetchForecastData(curCity);
  }

  // clean up resource when comp unmounted
  componentWillUnmount() {
    this._conditionXHR = null;
    this._forecastXHR = null;
  }

  fetchConditionData(curCity) {
    this._conditionXHR.open(
      "GET",
      `${CONDITION_BASE_URL}${curCity}.json`,
      true
    );
    this._conditionXHR.send();
  }

  handleConditionData() {
    const xhr = this._conditionXHR;

    if (xhr.status === 200) {
      const respData = JSON.parse(xhr.responseText);
      console.log(respData.current_observation);

      this.props.onConditionLoad(respData.current_observation); //similar to const {onConditionLoad} = props
    } else {
      alert(`Failed to load weather condition: ${xhr.status}`);
    }
  }

  fetchForecastData(curCity) {
    this._forecastXHR.open("GET", `${FORECAST_BASE_URL}${curCity}.json`, true);
    this._forecastXHR.send();
  }

  handleForecastData() {
    const xhr = this._forecastXHR;

    if (xhr.status === 200) {
      const respData = JSON.parse(xhr.responseText);
      console.log(respData.forecast.simpleforecast.forecastday);

      this.props.onForecastLoad(respData.forecast.simpleforecast.forecastday); //similar to const {onForecastLoad} = props
    } else {
      alert(`Failed to load weather forecast: ${xhr.status}`);
    }
  }

  render() {
    return (
      <nav style={{ padding: 10 }}>
        <input
          type="text"
          onChange={e => {
            this.setState({ curCity: e.target.value });
            console.log("render(): this.state.curCity", this.state.curCity);
          }}
        />
        <button
          onClick={() => {
            this.componentDidMount();
          }}
        >
          Load
        </button>
      </nav>
    );
  }
}
