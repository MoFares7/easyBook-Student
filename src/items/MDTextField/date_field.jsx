import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import colors from '../../assets/theme/base/colors';
import borders from '../../assets/theme/base/borders';

const MDDateField = ({
    height,
    isFulWidth,
    value,
    onChange,
    hintText,
    error,
    icon,
    onIconClick,
    menuOptions = [],
    onMenuOptionClick,
    filterType,
    onFilterTypeChange
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState(filterType || 'None');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (option) => {
        if (option) {
            setSelectedOption(option);
            if (onMenuOptionClick) onMenuOptionClick(option);
            if (onFilterTypeChange) onFilterTypeChange(option);
        }
        setAnchorEl(null);
    };

    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth={isFulWidth}
                value={value}
                onChange={onChange}
                error={error}
                type="date"
                sx={{
                    height: height || '45px',
                    backgroundColor: colors.secondary.main,
                    borderRadius: borders.borderRadius.md,
                    margin: '1rem 0',
                    fontSize: '0.875rem',
                    width: isFulWidth ? '100%' : '50%',
                    borderRadius: '0.5rem',
                    color: 'red',
                    cursor: 'pointer',
                    '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 12px) scale(1)',
                    },
                    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                        transform: 'translate(14px, -6px) scale(0.75)',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '13px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '0.5rem',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.primary.state
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.primary.state
                    },
                }}
                InputProps={{
                    style: {
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                    },
                    startAdornment: (
                        <InputAdornment position="end">
                            <Typography variant="body2">{selectedOption || hintText}</Typography>
                            {icon && <IconButton onClick={onIconClick}>{icon}</IconButton>}
                            {menuOptions.length > 0 && (
                                <IconButton onClick={handleMenuClick}>
                                    <ArrowDropDown />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleMenuClose(null)}
                PaperProps={{
                    sx: {
                        maxHeight: '150px',
                        width: '200px',
                    },
                }}
            >
                {menuOptions.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={() => handleMenuClose(option)}
                        sx={{ typography: 'body2' }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MDDateField;
