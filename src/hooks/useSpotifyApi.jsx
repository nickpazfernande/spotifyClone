import { useState, useEffect } from "react";

const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const client_id = process.env.REACT_APP_CLIENT_ID;
const urlSpotify = process.env.REACT_APP_URLSPOTIFY;

const redirect_uri = "http://localhost:3000/login";

const scope = "user-read-private user-read-email";
const state = "your_state_parameter";

const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&state=${state}`;

const useSpotifyApi = (url, token) => {
  const [data, setData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [finalCode, setFinalCode] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret,
    };
    fetch(urlSpotify, authParameters) //next save the token
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
        console.log(accessToken);
      })
      .catch((error) => console.log(error));
  };

  const searchTrack = (search) => {
    url =
      "https://api.spotify.com/v1/search?q=" +
      search +
      "*&type=album,artist,playlist,track&limit=50&offset=0&market=UY";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const login = () => {
    // Redirige al usuario a la URL de autorización
    window.location.href = authorizeUrl;

    // En la página de la URI de redirección
    const code = new URL(window.location.href).searchParams.get("code");

    // Usa el código para solicitar un token de acceso
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí deberías tener un objeto con los detalles del token de acceso
        console.log(data);
      });
  };

  const getMe = (code) => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },
      body:
        "grant_type=authorization_code&code=" +
        code +
        "&redirect_uri=" +
        redirect_uri,
    };

    let authorization_code = "";

    fetch(urlSpotify, authParameters) //next save the token
      .then((response) => response.json())
      .then((data) => {
        console.log(accessToken);
        authorization_code = data.access_token;

        fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authorization_code,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            //save in local storage
            localStorage.setItem("user", JSON.stringify(data));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  // https://accounts.spotify.com/authorize?client_id= &scope=playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-read user-follow-modify user-library-read user-library-modify user-read-birthdate user-read-email user-read-private streaming user-top-read&response_type=token&redirect_uri=https://discoverquickly.com/&state=I3ISM0jNbmkppuPE
  return { getToken, searchTrack, login, getMe };
};

export default useSpotifyApi;
