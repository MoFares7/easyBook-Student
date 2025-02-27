
import { createTheme } from "@mui/material/styles";

// Material Dashboard 2 React base styles
import colors from "../../assets/theme/base/colors";
import breakpoints from "../../assets/theme/base/breakpoints";
import typography from "../../assets/theme/base/typography";
import boxShadows from "../../assets/theme/base/boxShadows";
import borders from "../../assets/theme/base/borders";
import globals from "../../assets/theme/base/globals";

// Material Dashboard 2 React helper functions
import boxShadow from "../../assets/theme/functions/boxShadow";
import hexToRgb from "../../assets/theme/functions/hexToRgb";
import linearGradient from "../../assets/theme/functions/linearGradient";
import pxToRem from "../../assets/theme/functions/pxToRem";
import rgba from "../../assets/theme/functions/rgba";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },});
