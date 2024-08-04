import React, { useState, useEffect } from 'react';
import loginImage from '../../../../assets/images/login_image.png';
import BasicLayout from '../components/BasicLayout';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import colors from './../../../../assets/theme/base/colors';
import borders from '../../../../assets/theme/base/borders';
import typography from './../../../../assets/theme/base/typography';
import MDTextField from '../../../../items/MDTextField';
import MDBox from '../../../../items/MDBox/MDBox';
import MDTypography from '../../../../items/MDTypography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../services/login_service';
import { useNavigate } from 'react-router-dom';
import { getValue, setValue } from '../../../../core/storage/storage';
import MDDropDownField from '../../../../items/MDDropDown';
import { t } from 'i18next';

function Basic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const { loading, error } = useSelector(state => state.authLogin);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [language, setLanguage] = useState(getValue('lang') || 'en');

  useEffect(() => {
  }, [language]);

  const handleLoginToSystem = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { username: '', password: '' };

    if (!username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      dispatch(authLogin({ payload: { username: username, password: password } }))
        .then((action) => {
          if (action.type === 'authLogin/fulfilled') {
            const newToken = getValue('token');
            if (newToken) {
              navigate('/home');
            }
          } else {
            setSnackbarOpen(true);
          }
        })
        .catch((err) => {
          setSnackbarOpen(true);
          console.error(err);
        });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setValue('lang', selectedLanguage);
    window.location.reload();
  };

  return (
    <BasicLayout>
      <ThemeProvider theme={createTheme()}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <MDBox
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 1, 
                width: '30%',
              }}
            >
              <MDDropDownField
                margin={1}
                backgroundColor={colors.white.main}
                isFulWidth={false}
                value={language}
                onChange={handleLanguageChange}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'ar', label: 'Arabic' }
                ]}
              />
            </MDBox>
            <MDBox
              sx={{
                backgroundImage: `url(${loginImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: {
                  sm: '90%',
                  md: '90%',
                  xl: '65%'
                },
                height: {
                  sm: '25%',
                  md: '30%',
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
            <MDBox
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
              <MDTypography typography={typography.h2} color={colors.black.main} fontWeight={600}>
                {t("Login")}
              </MDTypography>

              <MDBox component="form" noValidate onSubmit={handleLoginToSystem} sx={{ mt: 1 }}>
                <MDTextField
                  margin={'1rem 0'}
                  isFulWidth={true}
                  value={username}
                  label={t("username")}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                />
                <MDBox sx={{ p: 1 }} />

                <MDTextField
                  margin={'1rem 0'}
                  isFulWidth={true}
                  value={password}
                  label={t("password")}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
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
                  disabled={loading}
                >
                  {loading ? t('Signing In...') :  t('SignIn') }
                </Button>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            {error || "Login failed. Please try again."}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </BasicLayout>
  );
}

export default Basic;
