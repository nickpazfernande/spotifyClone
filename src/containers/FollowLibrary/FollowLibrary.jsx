import React, { useEffect, useState } from "react";
import Library from "../../components/Library/Library";
import './style.css'

const FollowLibrary = (props) => {
  const { FollowLibrary } = props;
  return (
    <div className="container" >
      {FollowLibrary.items.map((item) => (
        <Library key={item.id} library={item} />
      ))}
    </div>
  );
};

export default FollowLibrary;
