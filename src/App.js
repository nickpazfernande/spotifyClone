import logo from "./logo.svg";
import { useEffect, useState } from "react";
import useSpotifyApi from "./hooks/useSpotifyApi";
import "./App.css";
import cors from "cors";

function App() {
  const [data, setData] = useState({});
  const token = "64371d1b7bdc43b99bd945817c7d0429";
  const url = "https://api.spotify.com/v1/me/tracks";
  const { getToken, searchTrack } = useSpotifyApi(url, token);

  const changeUser = () => {
    // refreshData();
    getToken();
  };

  return (
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
        <button onClick={() => searchTrack(data)}>Buscar</button>
        {/* <button onClick={() => getToken()}>Get token</button>
        <button onClick={() => changeUser()}>Change user</button> */}
      </header>
    </div>
  );
}

export default App;
