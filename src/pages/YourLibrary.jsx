import React, { useEffect, useState } from "react";
import FollowLibrary from "../containers/FollowLibrary/FollowLibrary";
import useSpotifyApi from "../hooks/useSpotifyApi";

const YourLibrary = () => {
  const [code, setCode] = useState(null);
  const [user, setUser] = useState(null);
  const { data, getMe, getFollowPlaylist, followLibrary } = useSpotifyApi();

  useEffect(() => {
    // Get the code from local storage
    const storedCode = localStorage.getItem("code");
    // If there is a code, set it to the state
    if (storedCode) {
      setCode(storedCode);
    }
    //Get info user from local storage, if exists
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      //storedUSer to json, and save in state
      setUser(JSON.parse(storedUser));
    }
    // Get follow playlist
    getFollowPlaylist();
  }, []);

  return (
    <>
      <h1>Follow Library</h1>
      {followLibrary ? (
        <div>{<FollowLibrary FollowLibrary={followLibrary} />}</div>
      ) : (
        <p>No follow Library</p>
      )}
    </>
  );
};

export default YourLibrary;
