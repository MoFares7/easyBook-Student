import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import MDBox from "../../items/MDBox/MDBox";
import { collapseItem, collapseIconBox, collapseIcon, collapseText } from "../../components/Sidenav/styles/sidenavCollapse";
import { useMaterialUIController } from "../../context";
import colors from "../../assets/theme/base/colors";

function SidenavCollapse({ icon, name, active, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  return (
    <ListItem component="li" sx={{ width: '100%', padding: 0, textDecoration: 'none', }}> 
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active,
            transparentSidenav,
            whiteSidenav,
            darkMode,
            sidenavColor,
          })
        }
      >
        <ListItemIcon
          sx={(theme) =>
            collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
          }
        >
          {typeof icon === "string" ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
          ) : (
            icon
          )}
        </ListItemIcon>

        <ListItemText
          primary={name}
          sx={(theme) => ({
            ...collapseText(theme, {
              miniSidenav,
              transparentSidenav,
              whiteSidenav,
              active,
            }),
            '& .MuiListItemText-primary': {
              textDecoration: 'none', // Ensure no underline
              color: colors.black.main,
              textDecoration: 'none',

            }
          })}
        />


      </MDBox>
    </ListItem>
  );
}

SidenavCollapse.defaultProps = {
  active: false,
};

SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default SidenavCollapse;
