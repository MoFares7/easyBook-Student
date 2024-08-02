import React, { useState, useEffect } from 'react';
import MDBox from '../../items/MDBox/MDBox.jsx';
import { Dialog, DialogContent, DialogActions, Button, Divider, CircularProgress } from '@mui/material';
import MDTypography from '../../items/MDTypography/index.jsx';
import MDButton from '../../items/MDButton/index';
import TextFeildForm from '../Items/Form_TextFeild/text_feild_form.jsx';
import colors from '../../assets/theme/base/colors.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateSalaryService } from '../../layouts/manager/feature/payroll/services/update_salary_service.jsx';
import { getSalaryService } from '../../layouts/manager/feature/payroll/services/get_salary_service.jsx';
import MainButton from '../Items/MainButton/main_button.jsx';
import Lottie from 'lottie-react';
import pricing from '../../layouts/manager/assets/lottie/pricing.json';

const AddPayrollSectionDialog = ({ isDialogOpen, onCloseDialog, salaryID, initialtype, initialMinSalary, initialMaxSalary }) => {
        const dispatch = useDispatch();
        const [salaryTypeID, setSalaryTypeID] = useState(salaryID);
        const [typeSalary, setTypeSalary] = useState(initialtype);
        const [maxSalary, setMaxSalary] = useState(initialMaxSalary ? String(initialMaxSalary) : '');
        const [minSalary, setMinSalary] = useState(initialMinSalary);

        const [validationErrors, setValidationErrors] = useState({
                maxSalary: '',
                minSalary: '',
        });
        const loading = useSelector(state => state.updateSalaryService.loading);

        useEffect(() => {
                setSalaryTypeID(salaryID || '');
                setTypeSalary(initialtype || '');
                setMaxSalary(initialMaxSalary || '');
                setMinSalary(initialMinSalary || '');
        }, [salaryID, initialtype, initialMaxSalary, initialMinSalary]);

        const handleDialogClose = () => {
                onCloseDialog()
                setValidationErrors({
                        maxSalary: '',
                        minSalary: '',
                });
        };

        const handleEditSalaryRang = async () => {
                const errors = {};

                if (minSalary === '' ) {
                        errors.minSalary = 'Min Salary is required';
                }
                if (maxSalary === '') {
                        errors.maxSalary = 'Max Salary is required';
                }
                if (minSalary > maxSalary) {
                        errors.minSalary = 'Min Salary is must to be less than Max Salary';
                        errors.maxSalary = 'Max Salary is must to be grater than Min Salary';

                }

                setValidationErrors(errors);

                if (Object.keys(errors).length === 0) {
                        try {
                                const response = await dispatch(updateSalaryService({
                                        typeID: salaryID,
                                        payload: {
                                                min: minSalary,
                                                max: maxSalary
                                        }
                                }));
                                if (response.payload.status === 'success') {
                                        dispatch(getSalaryService());
                                        handleDialogClose();
                                }
                                setValidationErrors(errors);
                        }
                        catch (error) {
                                throw error;
                        }
                };
        }

        return (
                <div>
                        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                                <DialogContent sx={{ justifyContent: "center" }}>
                                        <MDTypography fontWeight="bold" color="black" fontSize={'16px'} p={1}
                                                textAlign='center' >{"Update a Typefrom Goods in Company"}</MDTypography>

                                        <Divider sx={{
                                                mt: -0.5,
                                                mb: 1,
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
                                                <Lottie animationData={pricing} autoPlay style={{ width: 160, height: 160 }} />
                                        </MDBox>

                                        
                                        <TextFeildForm
                                                isNumaric={true}
                                                isFulWidth={true}
                                                value={minSalary}
                                                placeholder={validationErrors.minSalary ? validationErrors.minSalary : "Minimum Salary"}
                                                label={"Minimum Salary"}
                                                validationColor={validationErrors.minSalary ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.minSalary}
                                                onChange={(e) => {
                                                        setMinSalary(e.target.value);
                                                        setValidationErrors({ ...validationErrors, minSalary: '' });
                                                }}
                                        />
                                        <TextFeildForm
                                                isNumaric={true}
                                                isFulWidth={true}
                                                value={maxSalary}
                                                placeholder={validationErrors.maxSalary ? validationErrors.maxSalary : "Maximum Salary"}
                                                label={"Maximum Salary"}
                                                validationColor={validationErrors.maxSalary ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.maxSalary}
                                                onChange={(e) => {
                                                        setMaxSalary(e.target.value);
                                                        setValidationErrors({ ...validationErrors, maxSalary: '' });
                                                }}
                                        />
                                </DialogContent>

                                <DialogActions>
                                        <MDBox display="flex" justifyContent="space-between">
                                                <MainButton
                                                        title={"Edit"}
                                                        isLoading={loading}
                                                        colorTitle={colors.white.main}
                                                        backgroundColor={colors.gradients.info.state}
                                                        hoverBackgroundColor={colors.gradients.info.main}
                                                        onClick={handleEditSalaryRang}
                                                />
                                                <Button onClick={handleDialogClose}>Close</Button>
                                        </MDBox>
                                </DialogActions>
                        </Dialog>
                </div>
        );
};

export default AddPayrollSectionDialog;
