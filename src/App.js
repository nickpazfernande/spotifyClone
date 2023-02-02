import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Acá va a tar SpotifyClone 
        </p>
        <a
          className="App-link"
          href="https://developer.spotify.com/documentation/web-api/reference/#/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentación API
        </a>
      </header>
    </div>
  );
}

export default App;
