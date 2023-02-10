import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from "@mui/material/styles";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import theme from "../../theme/theme";
import { Outlet, Link, useLocation } from "react-router-dom";
import useSpotifyApi from "../../hooks/useSpotifyApi";

import "./style.css";

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
  const location = useLocation();
  const [active, setActive] = useState("/");

  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { getToken, searchTrack, login, data, getMe } = useSpotifyApi();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  useEffect(() => {
    // If there is no code, check for one in the URL
    const code = new URL(window.location.href).searchParams.get("code");
    // exist code ? set in local storage
    if (code) {
      console.log("code", code);
      // set in local storage
      localStorage.setItem("code", code);
    }
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
    getMe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "background.default",
          }}
        >
          <Toolbar className="navBar">
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              className="text-white"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              Spotify Clone
            </Typography> */}
            <button onClick={() => getMe()}>get data</button>
            <button className="button-login" onClick={() => login()}>
              Log In
            </button>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem className={active === "/" ? "active" : ""}>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home"></ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem className={active === "/login" ? "active" : ""}>
              <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login"></ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem className={active === "/search" ? "active" : ""}>
              <ListItemButton component={Link} to="/search">
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Search"></ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem className={active === "/your-library" ? "active" : ""}>
              <ListItemButton component={Link} to="/your-library">
                <ListItemIcon>
                  <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText primary="Your Library"></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          style={{ marginTop: "64px" }}
        >
          <div>
            <Outlet />
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
