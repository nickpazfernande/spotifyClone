import { useState, useEffect } from "react";

const client_secret =  process.env.REACT_APP_CLIENT_SECRET;
const client_id = process.env.REACT_APP_CLIENT_ID;
const urlSpotify = process.env.REACT_APP_URLSPOTIFY;

const useSpotifyApi = (url, token) => {
  const [data, setData] = useState(null);
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
    fetch(urlSpotify, authParameters)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return { getToken };
};

export default useSpotifyApi;
