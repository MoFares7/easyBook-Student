import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import typography from '../../assets/theme/base/typography';
import MDTypography from '../MDTypography';
import colors from '../../assets/theme/base/colors';
import borders from '../../assets/theme/base/borders';

const MDDropDownField = ({
        height,
        margin,
        isFullWidth,
        value,
        onChange,
        label,
        hintText,
        autoComplete,
        type,
        error,
        options,
        isFulWidth,
        labelColor,
        width,
        backgroundColor
}) => {
        return (
                <>
                        <MDTypography typography={typography.caption} color={labelColor}>
                                {label}
                        </MDTypography>
                        <TextField
                                margin="normal"
                                required
                                fullWidth={isFullWidth}
                                value={value}
                                type={type}
                                placeholder={hintText}
                                autoComplete={autoComplete}
                                onChange={onChange}
                                autoFocus
                                error={error}
                                select={!!options}
                                sx={{
                                        margin:margin,
                                        height: height || '45px',
                                        backgroundColor: backgroundColor === '' ? colors.secondary.main : backgroundColor,
                                        fontSize: '0.875rem',
                                        width: isFulWidth ? '100%' : width,
                                        borderRadius: borders.borderRadius.lg,
                                        color: colors.black.main,
                                        '& .MuiOutlinedInput-root': {
                                                height: '100%',
                                                borderRadius: borders.borderRadius.lg,
                                                '& fieldset': {
                                                        borderColor: colors.black.main,
                                                },
                                                '&:hover fieldset': {
                                                        borderColor: colors.gradients.info.main,
                                                },
                                                '&.Mui-focused fieldset': {
                                                        borderColor: colors.gradients.info.main,
                                                },
                                                '& .MuiSelect-select': {
                                                        fontSize: '0.875rem', 
                                                },
                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: colors.primary.state,
                                                },
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: colors.primary.state,
                                                },
                                        },
                                }}
                                inputProps={{
                                        style: {
                                                borderRadius: borders.borderRadius.lg,
                                                fontSize: '0.875rem', 
                                        },
                                }}
                        >
                                {options && options.map((option) => (
                                        <MenuItem key={option.value} value={option.value} sx={{ fontSize: '0.875rem' }}>
                                                {option.label}
                                        </MenuItem>
                                ))}
                        </TextField>
                </>
        );
};

export default MDDropDownField;
