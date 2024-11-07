// src/components/Dashboard.js
import { Component } from "react";
import ClockWidget from "./ClockWidget";
import WeatherWidget from "./WeatherWidget";
import styled from "styled-components";
import DragAndDrop from "./DragAndDrop";

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`

class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <ClockWidget />
        <WeatherWidget />
        <DragAndDrop />
      </DashboardContainer>
    );
  }
}

export default Dashboard;