import React, { useState } from 'react';
import loginImage from '../../../../assets/images/login_image.png';
import BasicLayout from '../components/BasicLayout';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import colors from './../../../../assets/theme/base/colors';
import borders from '../../../../assets/theme/base/borders';
import typography from '../../../../assets/theme/base/typography';
import MDTextField from '../../../../items/MDTextField';
import MDBox from '../../../../items/MDBox/MDBox';

function Basic() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const defaultTheme = createTheme();

  const handleSubmit = () => { };

  return (
    <BasicLayout>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${loginImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: {
                  sm:'90%',
                  md: '90%',
                  xl: '65%'
                },
                height: {
                  sm: '25%',
                  md: '25%',
                  xl: '50%'
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary.main,
            }}
          >
            <Box
              sx={{
                width: '80%', 
                px: 5,
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: colors.white.main,
                borderRadius: borders.borderRadius.md,
              }}
            >
              <Typography typography={typography.h2} color={colors.black.main} fontWeight={600}>
                Login
              </Typography>

              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <MDTextField
                  value={username}
                  label="Username"
                  hintText="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBox sx={{ p: 1}} />

                <MDTextField
                  value={password}
                  label="Password"
                  hintText="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
               

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: colors.primary.state,
                    ...typography.button, 
                    textTransform: 'none', 
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </BasicLayout>
  );
}

export default Basic;
