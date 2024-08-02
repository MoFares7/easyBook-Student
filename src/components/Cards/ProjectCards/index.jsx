import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

import MDBox from "../../../items/MDBox/MDBox";
import MDTypography from "../../../items/MDTypography";
import MDButton from "../../../items/MDButton";
import MDAvatar from "../../../items/MDAvatar";
import colors from "../../../assets/theme/base/colors";
import { grey } from "@mui/material/colors";
import typography from './../../../assets/theme-dark/base/typography';
import { LinearProgress } from "@mui/material";

function DefaultCard({ isSelected, isContnetAction, image, label, title, description, status, action, authors, onClick, capacity, empty }) {
  const filledPercentage = (capacity - empty) / capacity * 100;
  const emptyPercentage = 100 - filledPercentage;

  const emptyPercentageStr = emptyPercentage.toString().substring(0, 4);

  console.log("fil: " + filledPercentage)
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${grey[300]}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,
          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "translate",
        boxShadow: "none",
        overflow: "visible",
        position: "relative",
        // p: 1,
        border: isSelected ? `1px solid ${colors.gradients.info.state}` : `1px solid ${grey[300]}`,
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        {/* Image with status overlay */}
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            objectPosition: "center",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
          }}

        />
        {/* Status overlay */}
        {status === '' ?
          <MDBox />
          :
          <MDBox
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: status === 'active' ? colors.grey[300] : colors.gradients.info.state,
              padding: "4px 4px",
              borderRadius: "0px 10px 0px 0px",
              zIndex: 1,
            }}
          >
            <MDTypography typography={typography.button} sx={{
              color: status === 'normal' ? colors.white.main : colors.white.main
            }}>
              {status}
            </MDTypography>
          </MDBox>
        }
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </MDTypography>
        <MDBox mb={1}>
          {action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
     
        <MDBox mb={2} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>

        <MDBox display='flex' alignItems="center" sx={{
          mb: 2,
        }}>
          <LinearProgress
            sx={{
              m: 1,
              flex: 1,
              '& .MuiLinearProgress-bar': {
                backgroundColor: colors.grey[300],
                backgroundImage: `linear-gradient(to right, ${colors.grey[300]} ${emptyPercentageStr}%, ${colors.info.main} ${emptyPercentageStr}%)`,
              }
            }}
            variant="determinate"
            value={100}
          />
          <MDTypography typography={typography.caption}>{filledPercentage}%</MDTypography>
        </MDBox>


        {isContnetAction ?
          <MDBox display="flex" justifyContent="space-between" alignItems="center">
            {action.type === "internal" ? (
              <>
                <MDButton
                  onClick={onClick}
                  component={Link}
                  to={action.route}
                  variant="outlined"
                  size="small"
                  color={action.color}
                  sx={{
                    border: `1px solid ${colors.gradients.info.state}` }}
                >
                  {action.label}
                </MDButton>
                <MDBox display="flex">
                  <MDBox display="flex" sx={{
                    alignItems: 'center',
                    p: 1
                  }}>
                    <MDBox sx={{ backgroundColor: colors.info.main, width: '10px', height: '10px' }} />
                    <MDTypography typography={typography.caption} p={0.5}>
                      Full
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" sx={{
                    alignItems: 'center',
                    p: 1
                  }}>
                    <MDBox sx={{ backgroundColor: colors.grey[500], width: '10px', height: '10px' }} />
                    <MDTypography typography={typography.caption} p={0.5}>
                      Empty
                    </MDTypography>
                  </MDBox>
                </MDBox>

              </>

            ) : (
              <MDButton
                onClick={onClick}
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                size="small"
                color={action.color}
                sx={{ border: '1px solid red' }}
              >
                {action.label}
              </MDButton>
            )}
            <MDBox display="flex">{renderAuthors}</MDBox>
          </MDBox>
          :
          <MDBox />}

      </MDBox>
    </Card >
  );
}


DefaultCard.defaultProps = {
  authors: [],
};

DefaultCard.propTypes = {
  blurhash: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
  capacity: PropTypes.number.isRequired,
  empty: PropTypes.number.isRequired,
};

export default DefaultCard;

