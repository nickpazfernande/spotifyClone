import { useState, useEffect } from "react";

const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const client_id = process.env.REACT_APP_CLIENT_ID;
const urlSpotify = process.env.REACT_APP_URLSPOTIFY;

const urlTrack = "https://api.spotify.com/v1/tracks/";

const useSpotifyApi = (url, token) => {
  const [data, setData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      "https://api.spotify.com/v1/search?q="+ search + "*&type=album,artist,playlist,track&limit=50&offset=0&market=UY";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
        setError(null);
      });
  };

  return { getToken, searchTrack };
};

export default useSpotifyApi;
