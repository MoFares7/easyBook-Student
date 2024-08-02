import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { MoreVertRounded } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import MDBox from '../../../items/MDBox/MDBox';
import MDTypography from '../../../items/MDTypography';
import colors from '../../../assets/theme/base/colors';

const BranchCardLoading = ({
        status,
        branchName,
        managerName,
        branchLocation,
        branchPhoneNumber,
        branchAddress,
        handleOpenMenu,
        isLoading
}) => {
        return (
                <Box>
                        <MDBox
                                sx={{
                                        transition: 'transform 0.4s ease',
                                        '&:hover': {
                                                transform: 'scale(0.97)',
                                        },
                                }}
                        >
                                <MDBox sx={{ pb: 4 }} />
                                <>


                                        <MDBox display="block" alignItems="center" color="white" borderRadius='8' bgColor={colors.grey[200]}>
                                                <MDBox p={1} display="flex" pb={0.1} justifyContent="space-between" color="white">
                                                        <Skeleton variant="rectangular" width="90%" height="60" animation="wave" />
                                                       
                                                </MDBox>
                                                <MDBox p={1} display="flex" pb={0.1} justifyContent="space-between" color="white">
                                                        <Skeleton variant="rectangular" width="28%" height="40" animation="wave" />
                                                        <Skeleton variant="rectangular" width="35%" height="40" animation="wave" />

                                                </MDBox>
                                                <MDBox p={1} display="flex" pb={0.1} justifyContent='space-between'>
                                                        <Skeleton variant="rectangular" width="32%" height="40" animation="wave" />
                                                        <Skeleton variant="rectangular" width="40%" height="40" animation="wave" />
                                                </MDBox>
                                                <MDBox p={1} display="flex" pb={0.1} justifyContent='space-between'>
                                                        <Skeleton variant="rectangular" width="38%" height="40" animation="wave" />
                                                        <Skeleton variant="rectangular" width="35%" height="40" animation="wave" />
                                                </MDBox>
                                                <MDBox p={1} display="flex" pb={0.1} justifyContent='space-between'>
                                                        <Skeleton variant="rectangular" width="42%" height="40" animation="wave" />
                                                        <Skeleton variant="rectangular" width="40%" height="40" animation="wave" />
                                                </MDBox>
                                                <MDBox p={1} display="flex" pb={0.1} justifyContent='space-between'>
                                                        <Skeleton variant="rectangular" width="40%" height="40" animation="wave" />
                                                        <Skeleton variant="rectangular" width="35%" height="40" animation="wave" />
                                                </MDBox>
                                                <MDBox p={1} display="flex" pb={0.2} justifyContent='space-between'>
                                                        <Skeleton variant="rectangular" width="25%" height="40" animation="wave" />
                                                        <Skeleton variant="rectangular" width="40%" height="40" animation="wave" />
                                                </MDBox>
                                        </MDBox>
                                </>

                        </MDBox>
                </Box>
        );
};

export default BranchCardLoading;
