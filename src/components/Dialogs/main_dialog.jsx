import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import colors from '../../assets/theme/base/colors';
import PrimaryButton from '../../items/MDButton';
import borders from '../../assets/theme/base/borders';
import MDBox from '../../items/MDBox/MDBox';

const MainDialog = ({ open, handleClose, isLoading, handleOperationService, titleButtonOperation, titleButtonCancel, headerIcon, initialColor, headerTitle, subTitle, noteTitle }) => {

        return (
                <Dialog open={open} onClose={handleClose} sx={{
                        '& .MuiDialog-paper': {
                                width: '60%',
                                maxWidth: '500px',
                        }
                }}>
                        <DialogTitle sx={{
                                p: 5,
                                backgroundColor: initialColor,
                                borderBottomLeftRadius: borders.borderRadius.lg,
                                borderBottomRightRadius: borders.borderRadius.lg,
                                textAlign: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                        }}>
                                <img src={headerIcon} style={{ width: 50, height: 50 }} />
                        </DialogTitle>
                        <DialogContent sx={{ textAlign: 'center' }}>
                                <DialogContentText sx={{ p: 2, color: initialColor, fontSize: "20px", fontWeight: 700 }}>
                                        {headerTitle}
                                </DialogContentText>
                                <DialogContentText sx={{ color: colors.black.focus, fontSize: "15px", fontWeight: 400 }}>
                                        {subTitle}
                                </DialogContentText>
                                <DialogContentText sx={{ color: initialColor, fontSize: "15px", fontWeight: 400 }}>
                                        {noteTitle}
                                </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ px: 2.5, pb: 6 }}>
                                <PrimaryButton
                                        width={"100%"}
                                        hPadding={1}
                                        wPadding={1}
                                        title={titleButtonOperation}
                                        borderColor={initialColor}
                                        backgroundColor={initialColor}
                                        colorTitle={colors.white.main}
                                        isLoading={isLoading}
                                        onClick={handleOperationService}
                                />
                                <MDBox sx={{ px: 0.5 }} />
                                <PrimaryButton
                                        width={"100%"}
                                        hPadding={1}
                                        wPadding={1}
                                        title={titleButtonCancel}
                                        borderColor={initialColor}
                                        backgroundColor={colors.transparent.main}
                                        colorTitle={colors.black.focus}
                                        onClick={handleClose}
                                />
                        </DialogActions>
                </Dialog>
        );
};

export default MainDialog;
