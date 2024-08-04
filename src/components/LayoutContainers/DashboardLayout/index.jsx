
import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import MDBox from "../../../items/MDBox/MDBox";

import { useMaterialUIController, setLayout } from "../../../context";
import { getValue } from "../../../core/storage/storage";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        position: "relative",
        [breakpoints.up("xl")]: {
          // marginLeft: miniSidenav ? pxToRem(120) : pxToRem(250),
          marginLeft: getValue('lang') === "en" ? (miniSidenav ? pxToRem(120) : pxToRem(250)) : 0,
          marginRight: getValue('lang') === "ar" ? (miniSidenav ? pxToRem(120) : pxToRem(250)) : 0,
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
