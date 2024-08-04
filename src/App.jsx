import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "./components/Sidenav";
import theme from "./assets/theme";
import { useMaterialUIController, setMiniSidenav } from "./context";
import { routes } from "./routes";
import { getValue } from "./core/storage/storage";
import logo from './assets/images/logo.png';

export default function App() {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, direction, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const token = getValue('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);


  useEffect(() => {
    document.body.setAttribute("dir", direction);
    console.log(direction + " ''ds")
  }, [direction]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const routesToRender = routes

  const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return [];
    });


  return direction === "rtl" ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? logo : logo}
            brandName="Logo"
            routes={routesToRender}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Routes>
        {getRoutes(routesToRender)}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? logo : logo}
            brandName="Logo"
            routes={routesToRender}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Routes>
        {getRoutes(routesToRender)}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>

  );

}
