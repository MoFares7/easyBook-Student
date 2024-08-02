import { TextField, Typography } from '@mui/material';
import React from 'react';
import typography from '../../assets/theme/base/typography';
import MDTypography from '../MDTypography';
import colors from '../../assets/theme/base/colors';
import borders from '../../assets/theme/base/borders';

const MDTextField = ({ value, onChange, label, hintText, autoComplete, type }) => {
        return (
                <>
                        <MDTypography typography={typography.caption} color={colors.black.light}>
                                {label}
                        </MDTypography>
                        <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={value}
                                type={type}
                                name={hintText}
                                autoComplete={autoComplete}
                                onChange={onChange}
                                autoFocus
                                sx={{
                                        backgroundColor: colors.secondary.main,
                                        borderRadius: borders.borderRadius.md,
                                }}
                        />
                </>
        );
};

export default MDTextField;
