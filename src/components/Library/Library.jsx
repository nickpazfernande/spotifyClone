import React from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { PlayArrow } from "@mui/icons-material";

const Library = (props) => {
  const { library } = props;
  return (
    <div className="card">
      <img src={library.images[0].url} className="img" alt="" />
      <Button
        variant="contained"
        className="button-open"
        endIcon={<PlayArrow />}
        href={library.external_urls.spotify}
        target="_blank"
      ></Button>
      <p className="title">{library.name}</p>
      <p className="description">{library.description}</p>
    </div>
  );
};

export default Library;
