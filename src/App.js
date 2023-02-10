import logo from "./logo.svg";
import { useEffect, useState } from "react";
import useSpotifyApi from "./hooks/useSpotifyApi";
import "./App.css";
import cors from "cors";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import darkTheme from "./theme/theme.jsx";
import { MuiThemeProvider, useTheme } from "@material-ui/core/styles";

function App() {
  const theme = useTheme();
  const [data, setData] = useState({});
  const token = "64371d1b7bdc43b99bd945817c7d0429";
  const url = "https://api.spotify.com/v1/me/tracks";

  return (
    <MuiThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Acá va a tar SpotifyClone</p>
          <a
            className="App-link"
            href="https://developer.spotify.com/documentation/web-api/reference/#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentación API
          </a>
          <input type="text" onChange={(e) => setData(e.target.value)} />
          {/* <button onClick={() => searchTrack(data)}>Buscar</button> */}
          <hr />
          <button
          >
            login
          </button>
          {/* <button onClick={() => getToken()}>Get token</button>
        <button onClick={() => changeUser()}>Change user</button> */}
        </header>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
