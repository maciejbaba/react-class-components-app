// src/components/WeatherWidget.tsx
import { Component } from "react";
import Widget from "./Widget";
import styled from "styled-components";

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;
`;

interface WeatherData {
  temperature: number | null;
  windSpeed: number | null;
  isLoading: boolean;
  error: string | null;
}

interface WeatherWidgetProps {
  title: string;
}

class WeatherWidget extends Component<WeatherWidgetProps, WeatherData> {
  private apiUrl: string =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true";

  constructor(props: WeatherWidgetProps) {
    super(props);
    this.state = {
      temperature: null,
      windSpeed: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData = async () => {
    try {
      const response = await fetch(this.apiUrl);
      const responseJson = await response.json();
      const { temperature, windspeed: windSpeed } = responseJson.current_weather;

      this.setState({
        temperature: temperature,
        windSpeed: windSpeed,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: "Could not fetch weather data.",
        isLoading: false,
      });
      console.log(error);
    }
  };

  render() {
    const { temperature, windSpeed, isLoading, error } = this.state;

    return (
      <Widget title="Weather">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <WeatherInfo>
            <p>Temperature: {temperature}°C</p>
            <p>Wind Speed: {windSpeed} m/s</p>
          </WeatherInfo>
        )}
      </Widget>
    );
  }
}

export default WeatherWidget;
