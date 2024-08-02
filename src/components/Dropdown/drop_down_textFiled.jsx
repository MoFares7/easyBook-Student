import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import MDInput from '../../items/MDInput';

const DropdownTextField = ({ value, isFulWidth, placholder, label, validationErrors, validationColor, options, onChange, branchManagersLoading }) => {
        return (
                <Autocomplete
                        freeSolo
                        error={Boolean(validationErrors)}
                        options={options}
                        value={value}
                        onChange={(event, newValue) => {
                                onChange(newValue);
                        }}
                        loading={branchManagersLoading}
                        sx={{
                                margin: '1rem',
                                fontSize: '1rem',
                                width: isFulWidth ? '100%' : '50%',
                                borderRadius: '0.5rem',
                                borderColor: validationErrors ? '#941b0c' : '#303F9F',
                                color: 'red',
                                cursor: 'pointer',
                                '&:focus': {
                                        outlineColor: 'red',
                                },
                        }}
                        renderInput={(params) => (
                                <MDInput
                                        {...params}
                                        variant="outlined"
                                        placeholder={placholder}
                                        label={label}
                                        sx={{
                                                fontSize: '1rem',
                                                borderRadius: '0.5rem',
                                                color: 'red',
                                                cursor: 'pointer',
                                                '&:focus': {
                                                        outlineColor: 'red',
                                                },
                                        }}
                                        error={Boolean(validationErrors)}
                                        helperText={validationErrors}
                                />
                        )}
                />
        );
};

export default DropdownTextField;
