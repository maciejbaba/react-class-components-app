// src/components/ClockWidget.js
import { Component } from "react";
import Widget from "./Widget";

interface ClockWidgetProps {
  timer: typeof setInterval;
}

interface ClockWidgetState {
  time: string;
}

class ClockWidget extends Component<ClockWidgetProps, ClockWidgetState> {
  timer: number | undefined = undefined;
  constructor(props: ClockWidgetProps) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Widget title="Clock">
        <div>{this.state.time}</div>
      </Widget>
    );
  }
}

export default ClockWidget;
