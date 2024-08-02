import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Divider, DialogTitle, CircularProgress } from '@mui/material';
import typography from './../../assets/theme-dark/base/typography';
import MDBox from '../../items/MDBox/MDBox.jsx';
import MDTypography from '../../items/MDTypography/index.jsx';
import MDButton from '../../items/MDButton/index.jsx';
import colors from '../../assets/theme/base/colors.jsx';
import { useSelector } from 'react-redux';

const MainDialog = ({ isDialogOpen, DialogClose, headTitle, subTitle, loadingState, confirmEvent }) => {

        const handleDialogClose = () => {
                DialogClose();
        };

        return (
                <MDBox>
                        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                                <DialogTitle >
                                        <MDTypography typography={typography.h6} p={1}
                                                textAlign='center' >{headTitle}
                                        </MDTypography>
                                        <Divider sx={{
                                                color: "#252525",
                                                backgroundColor: "#252525;"
                                        }} />

                                </DialogTitle>

                                <DialogContent>
                                        <MDTypography typography={typography.body2} p={1}
                                                textAlign='center' >{subTitle}
                                        </MDTypography>
                                </DialogContent>

                                <DialogActions>
                                        <MDBox display="flex" justifyContent="space-between">
                                                <MDButton onClick={confirmEvent}
                                                        sx={{
                                                                backgroundColor: colors.gradients.info.state,
                                                                color: '#fff',
                                                                '&:hover': {
                                                                        backgroundColor: colors.gradients.info.main
                                                                }
                                                        }}>{loadingState ?
                                                                <CircularProgress size={24} sx={{ color: colors.white.main }} />
                                                                :
                                                                'Yes'}
                                                </MDButton>
                                                <Button onClick={handleDialogClose}>Close</Button>
                                        </MDBox>
                                </DialogActions>
                        </Dialog>
                </MDBox>
        )
}

export default MainDialog
