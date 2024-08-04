import { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "../../../items/MDBox/MDBox";
import MDTypography from "../../../items/MDTypography";
import { navbar, navbarContainer, navbarRow, navbarMobileMenu } from "./styles";
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav, setDirection } from "../../../context";
import man from '../../../assets/images/man.png';
import MDDropDownField from "../../../items/MDDropDown";
import i18n from '../../../../i18..js';
import { List } from "@mui/icons-material";
import { getValue, setValue } from "../../../core/storage/storage.jsx";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const [language, setLanguage] = useState(getValue('lang') || 'en');

  useEffect(() => {
  }, [language]);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  // const handleLanguageChange = (event) => {
  
  //   // i18n.changeLanguage(selectedLanguage);

  //   // const newDirection = selectedLanguage === 'ar' ? 'rtl' : 'ltr';
  //   // setDirection(dispatch, newDirection);
  // };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setValue('lang', selectedLanguage);
    window.location.reload();
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })} />
        {isMini ? null : (
          <MDBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            {miniSidenav
              ?
              <IconButton
                size="small"
                disableRipple
                sx={{
                  ...navbarMobileMenu,
                  color: light ? "primary" : "secondary",
                }}
                onClick={handleMiniSidenav}
              >
                {miniSidenav ? <List /> : <MDBox />}
              </IconButton>
              :
              <MDBox />
            }

            <MDTypography
              variant="caption"
              sx={{
                flexGrow: 1,
                textAlign: 'end',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                px: '10px'
              }}
            >
              William Jaspornet
            </MDTypography>

            <MDBox
              component="img"
              src={man}
              alt="William Jaspornet"
              width="40px"
              height="40px"
              sx={{ borderRadius: '30%' }}
            />

            <MDDropDownField
              margin={1}
              isFulWidth={false}
              width={miniSidenav ? '30%' : '10%'}
              value={language}
              onChange={handleLanguageChange}
              options={[
                { value: 'en', label: 'English' },
                { value: 'ar', label: 'Arabic' }
              ]}
            />
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
