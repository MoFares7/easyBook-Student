import React, { useState } from 'react';
import MDBox from '../../items/MDBox/MDBox.jsx';
import { Dialog, DialogContent, DialogActions, Button, Divider, CircularProgress } from '@mui/material';
import MDTypography from '../../items/MDTypography/index.jsx';
import MDButton from '../../items/MDButton/index';
import TextFeildForm from '../Items/Form_TextFeild/text_feild_form.jsx';
import colors from '../../assets/theme/base/colors.jsx';
import { useDispatch, useSelector } from 'react-redux';
import equlavante from '../../layouts/branch/assets/lottie/equlavante.json';
import Lottie from 'lottie-react';
import { EquivalentAndDiscoundService } from '../../layouts/manager/feature/equivalents_and_discounts/services/equivalent_discound_service.jsx';
import { useNavigate } from 'react-router-dom';
import { updateEquivDiscountService } from '../../layouts/manager/feature/equivalents_and_discounts/services/update_equivalents_discont_service.jsx';
import { getEquivalentDiscontBranchService } from '../../layouts/manager/feature/equivalents_and_discounts/services/get_equivalents_discont_branch_service.jsx';

const EquivalentDisoundDialog = ({ isDialogOpen, onCloseDialog, isUpdateOperation, employeeID, percentType,
        setErrorSnackbarOpen, setErrorMessage
}) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [percent, setPercent] = useState('');
        const [validationErrors, setValidationErrors] = useState({
                percent: '',
        });
        const loading = useSelector(state => state.EquivalentAndDiscoundService.loading);
        const updateLoading = useSelector(state => state.updateEquivDiscountService.loading);

        const handleDialogClose = () => {
                onCloseDialog();
                setPercent('');

                setValidationErrors({
                        percent: '',

                });
        };

        const handleAddEquivalentDiscoundAction = async () => {
                const errors = {};

                if (isNaN(percent) || percent.trim() === '' || percent <= 0 || percent >= 100) {
                        errors.percent = 'Percent is required and must be between 0 and 100';
                }

                setValidationErrors(errors);

                if (Object.keys(errors).length === 0) {
                        try {
                                let res;
                                if (isUpdateOperation) {
                                        res = await dispatch(updateEquivDiscountService({
                                                user_id: employeeID,
                                                payload: {
                                                        percent: percent,
                                                        percent_type: percentType
                                                }
                                        }));
                                } else {
                                        res = await dispatch(EquivalentAndDiscoundService({
                                                user_id: employeeID,
                                                payload: {
                                                        percent: percent,
                                                        percent_type: percentType
                                                }
                                        }));
                                        if (res.payload.status === 'success') {
                                                dispatch(getEquivalentDiscontBranchService())
                                        }
                                }

                                if (res.payload && res.payload.username !== '') {
                                        handleDialogClose();
                                        navigate('/Equivalents-And-Discounts');
                                } else {
                                        setErrorMessage('This operation is Failure.');
                                        setErrorSnackbarOpen(true);
                                }
                                if (res.payload.status === 'success') {
                                        dispatch(getEquivalentDiscontBranchService());
                                          }
                        } catch (error) {
                                console.error("Error:", error);
                                setErrorMessage('An unexpected error occurred.');
                                setErrorSnackbarOpen(true);
                        }
                }
        };



        return (
                <div>
                        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                                <DialogContent>
                                        <MDTypography fontWeight="bold" color="black" fontSize={'18px'} p={1}
                                                textAlign='center' >
                                                {percentType === 'bonus'
                                                        ? 'Add Equivalent To This Employee'
                                                        :
                                                        "Deduction From This Employee's Salary"}
                                        </MDTypography>
                                        <Divider sx={{
                                                color: "#252525",
                                                backgroundColor: "#252525;"
                                        }} />

                                        <MDBox
                                                sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                }}
                                        >

                                                <Lottie animationData={equlavante} autoplay loop style={{ alignItems: 'center', width: 150, height: 150 }} />

                                                <TextFeildForm
                                                        isNumaric={true}
                                                        isFulWidth={true}
                                                        value={percent}
                                                        placeholder={validationErrors.percent ? validationErrors.percent : "Precent"}
                                                        label={"Precent"}
                                                        validationColor={validationErrors.percent ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.percent}
                                                        onChange={(e) => {
                                                                setPercent(e.target.value);
                                                                setValidationErrors({ ...validationErrors, percent: '' });
                                                        }}
                                                />

                                        </MDBox>



                                </DialogContent>
                                <DialogActions>
                                        <MDBox display="flex" justifyContent="space-between">
                                                <MDButton onClick={handleAddEquivalentDiscoundAction}
                                                        sx={{
                                                                backgroundColor: percentType === 'bonus' ?
                                                                        colors.gradients.info.main : colors.error.main,
                                                                color: '#fff',
                                                                '&:hover': {
                                                                        backgroundColor: percentType === 'bonus' ?
                                                                                colors.gradients.info.state : colors.error.focus,
                                                                }
                                                        }}>{loading || updateLoading ?
                                                                < CircularProgress size={24}
                                                                        sx={{ color: colors.white.main }} />
                                                                :
                                                                percentType === 'bonus' ? isUpdateOperation ? 'Update' : 'Add' : 'Discount'}
                                                </MDButton>
                                                <Button onClick={handleDialogClose}>Close</Button>
                                        </MDBox>
                                </DialogActions>


                        </Dialog>
                </div>
        )
}

export default EquivalentDisoundDialog;
