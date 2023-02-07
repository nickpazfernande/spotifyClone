import "./style/root.css";
import { Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import darkTheme from "../theme/theme.jsx";
import { MuiThemeProvider } from "@material-ui/core";

export default function Root() {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <Layout>
        <p>Este es un componente hijo</p>
        <Outlet />
      </Layout>
    </MuiThemeProvider>
  );
}
