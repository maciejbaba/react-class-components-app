// src/App.js
import { Component } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Dashboard from "./components/Dashboard";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
  }
`;
interface Theme {
  background: string;
  text: string;
}

const lightTheme: Theme = {
  background: "#f5f5f5",
  text: "#333",
};

const darkTheme: Theme = {
  background: "#333",
  text: "#f5f5f5",
};

interface AppState {
  isDarkMode: boolean;
}

interface AppProps {
  state: AppState;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isDarkMode: false,
    };
  }

  toggleTheme = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };

  render() {
    return (
      <ThemeProvider theme={this.state.isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div>
          <button onClick={this.toggleTheme}>Toggle Dark Mode</button>
          <Dashboard />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
