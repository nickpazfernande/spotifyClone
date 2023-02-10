import React, { useEffect, useState } from "react";
import useSpotifyApi from "../hooks/useSpotifyApi";

const YourLibrary = () => {
  const [code, setCode] = useState(null);
  const [user, setUser] = useState(null);

  const { data, getMe } = useSpotifyApi();

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
      console.log(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <div>YourLibrary</div>
      <p>{code}</p>
      <button onClick={() => getMe(code)}>Get info </button>
      {user ? (
        <>
          <img src={user.images[0].url} alt="" />
          <p>{user.display_name}</p>
          {/* Plan */}
          <p>Plan: {user.product} </p>
          <p>Country: {user.country}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user</p>
      )}
    </>
  );
};

export default YourLibrary;
