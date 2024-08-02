// import { TextField, Typography } from '@mui/material';
// import React from 'react';
// import typography from '../../assets/theme/base/typography';
// import MDTypography from '../MDTypography';
// import colors from '../../assets/theme/base/colors';
// import borders from '../../assets/theme/base/borders';

// const MDTextField = ({ height, isFulWidth, value, onChange, label, hintText, autoComplete, type }) => {
//         return (
//                 <>
//                         <MDTypography typography={typography.caption} color={colors.black.light}>
//                                 {label}
//                         </MDTypography>
//                         <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth={isFulWidth}
//                                 value={value}
//                                 type={type}
//                                 placeholder={hintText}
//                                 autoComplete={autoComplete}
//                                 onChange={onChange}
//                                 autoFocus
//                                 sx={{
//                                         height: height,
//                                         backgroundColor: colors.secondary.main,
//                                         borderRadius: borders.borderRadius.md,
//                                         margin: '1rem 0',
//                                         fontSize: '0.875rem', // Smaller font size
//                                         width: isFulWidth ? '100%' : '50%',
//                                         '& .MuiInputLabel-outlined': {
//                                                 transform: 'translate(14px, 12px) scale(1)',
//                                         },
//                                         '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
//                                                 transform: 'translate(14px, -6px) scale(0.75)',
//                                         },
//                                         '& .MuiOutlinedInput-input': {
//                                                 padding: '8px 14px', // Adjust padding
//                                         },
//                                         '& .MuiOutlinedInput-root': {
//                                                 borderRadius: '0.5rem',
//                                         },
//                                         '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                                                 borderColor: colors.gradients.info.main,
//                                         },
//                                         '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                                 borderColor: colors.gradients.info.main,
//                                         },
//                                 }}
//                                 inputProps={{
//                                         style: {
//                                                 borderRadius: '0.5rem',
//                                                 fontSize: '0.875rem', // Smaller font size
//                                         },
//                                 }}
//                         />
//                 </>
//         );
// };

// export default MDTextField;


import { TextField, Typography } from '@mui/material';
import React from 'react';
import typography from '../../assets/theme/base/typography';
import MDTypography from '../MDTypography';
import colors from '../../assets/theme/base/colors';
import borders from '../../assets/theme/base/borders';

const MDTextField = ({ height, isFulWidth, value, onChange, label, hintText, autoComplete, type, error, helperText }) => {
        return (
                <>
                        <MDTypography typography={typography.caption} color={colors.black.light}>
                                {label}
                        </MDTypography>
                        <TextField
                                margin="normal"
                                required
                                fullWidth={isFulWidth}
                                value={value}
                                type={type}
                                placeholder={hintText}
                                autoComplete={autoComplete}
                                onChange={onChange}
                                autoFocus
                                error={error}
                                helperText={helperText}
                                sx={{
                                        height: height,
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
                                                padding: '12px 14px',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                                borderRadius: '0.5rem',
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: colors.gradients.info.main,
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: colors.gradients.info.main,
                                        },
                                }}
                               inputProps={{
                                        style: {
                                                borderRadius: '0.5rem',
                                                fontSize: '0.875rem', 
                                        },
                                }}
                        />
                </>
        );
};

export default MDTextField;
