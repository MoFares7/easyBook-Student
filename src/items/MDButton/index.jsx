import { Box, Button, CircularProgress, Icon } from '@mui/material';
import React from 'react';
import borders from '../../assets/theme/base/borders';
import typography from '../../assets/theme/base/typography';
import colors from '../../assets/theme/base/colors';
import MDTypography from '../MDTypography';

const PrimaryButton = ({ hPadding, wPadding, width, title, borderColor, backgroundColor, colorTitle, isLoading, icon, onClick }) => {
        return (
                <Button
                        disabled={isLoading}
                        onClick={isLoading ? null : onClick} 
                        sx={{
                                width: width,
                                padding: 0,
                        }}
                >
                        <Box
                                sx={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        py: hPadding,
                                        px: wPadding,
                                        backgroundColor: backgroundColor,
                                        borderRadius: borders.borderRadius.lg,
                                        border: `2px solid ${borderColor}`,
                                        textAlign: 'center',
                                }}
                        >
                                <MDTypography
                                        typography={typography.button}
                                        sx={{
                                                textAlign: 'center',
                                                color: colorTitle,
                                                display: 'flex',
                                                justifyContent: 'center',
                                        }}
                                >
                                        {isLoading ? (
                                                <CircularProgress size={24} sx={{ color: colors.white.main }} />
                                        ) : (
                                                title
                                        )}
                                </MDTypography>
                                {icon && (
                                        <Icon sx={{ color: colors.white.main, mx: '6px' }}>
                                                {icon}
                                        </Icon>
                                )}
                        </Box>
                </Button>
        );
};

export default PrimaryButton;
