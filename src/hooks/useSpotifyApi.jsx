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
  const [followLibrary, setFollowLibrary] = useState();

  const getToken = () => {
    //New promise to get token
    return new Promise((resolve, reject) => {
      //Get the code from local storage
      const storedCode = localStorage.getItem("accessToken");
      // If there is a code, set it to the state
      if (storedCode) {
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
        resolve(
          fetch(urlSpotify, authParameters) //next save the token
            .then((response) => response.json())
            .then((data) => {
              setAccessToken(data.access_token);
              console.log(accessToken);
            })
            .catch((error) => console.log(error))
        );
      }
    });
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
        // Save final token, user spotify
        setFinalCode(data.access_token);
        localStorage.setItem("finalAccessToken", data.access_token);
        console.log(data);
      });
  };

  const getMe = () => {
    const storedCode = localStorage.getItem("finalAccessToken");

    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storedCode,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //save in local storage
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => console.log(error));
  };

  const getFollowPlaylist = () => {
    const storedCode = localStorage.getItem("finalAccessToken");

    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storedCode,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //convert data to array
        

        setFollowLibrary(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return {
    getToken,
    searchTrack,
    login,
    getMe,
    getFollowPlaylist,
    followLibrary,
  };
};

export default useSpotifyApi;
