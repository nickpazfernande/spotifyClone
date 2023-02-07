import * as React from "react";
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
import theme from "../../theme/theme";
import { Outlet, Link } from "react-router-dom";
import "./style.css";

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
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
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="text-white"
              //Align items to the right
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              Spotify Clone
            </Typography>
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
            <ListItem>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home"></ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login"></ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component={Link}
                to="/search"
                //Active?
              >
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Search"></ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" href={`/`} />
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
        >
          <div>
            <p></p>
            {props.children}

            {/* Outlet react router */}
            <Outlet />
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}