import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Divider, CircularProgress, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MDBox from '../../items/MDBox/MDBox.jsx';
import MDTypography from '../../items/MDTypography/index.jsx';
import MDButton from '../../items/MDButton/index';
import TextFeildForm from '../Items/Form_TextFeild/text_feild_form.jsx';
import colors from '../../assets/theme/base/colors.jsx';
import MainBadgeItem from '../Items/Badge/badge.jsx';
import { updateTruckInfoService } from '../../layouts/branch/feature/crisis_management/service/update_truck_service.jsx';
import { createNewTruckService } from '../../layouts/branch/feature/crisis_management/service/create_new_truck_service.jsx';
import { getTruckBranch } from '../../layouts/branch/feature/crisis_management/service/get_track_service.jsx';
import DropdownTextField from '../Dropdown/drop_down_textFiled.jsx';

const AddTruckDialog = ({ isDialogOpen, onCloseDialog, isUpdateInfoTruck, selectedTruck }) => {
        const dispatch = useDispatch();
        const [truckImage, setTruckImage] = useState('');
        const [avaterFile, setAvaterFile] = useState(null);
        const [truckID, setTruckID] = useState(selectedTruck ? selectedTruck.id : '');
        const [truckName, setTruckName] = useState(selectedTruck ? selectedTruck.name : '');
        const [truckCapacity, setTruckCapacity] = useState(selectedTruck ? selectedTruck.capacity : '');
        const [trackNumber, setTrackNumber] = useState(selectedTruck ? selectedTruck.car_number : '');
        const [trackCost, setTrackCost] = useState(selectedTruck ? selectedTruck.cost : '');
        const [truckType, setTruckType] = useState(selectedTruck ? selectedTruck.class : '');
        const [document, setDocument] = useState(null);
        const [fileName, setFileName] = useState(selectedTruck ? selectedTruck.document : null);
        const fileInputRef = useRef(null);
        const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [validationErrors, setValidationErrors] = useState({
                truckName: '',
                truckCapacity: '',
                trackNumber: '',
                trackCost: '',
                truckType: '',
                driver: '',
                document: '',
                fileName: ''
        });

        const abortControllerRef = useRef(null);

        useEffect(() => {
                console.log("Selected Truck State:", selectedTruck);
                if (selectedTruck) {
                        setTruckID(selectedTruck.id || '');
                        setTruckName(selectedTruck.name || '');
                        setTruckCapacity(selectedTruck.capacity || '');
                        setTrackNumber(selectedTruck.car_number || '');
                        setTrackCost(selectedTruck.cost || '');
                        setDocument(selectedTruck.document || '');
                        setTruckType(selectedTruck.class || '');
                        setTruckImage(`https://prime-shippa-api.point-dev.net/storage/${selectedTruck.image.replace('public/', '')}` || '');
                }
        }, [selectedTruck]);

        const loading = useSelector(state => state.createNewTruckService.loading || state.updateTruckInfoService.loading);
        const error = useSelector(state => state.createNewTruckService.error);

        const handleDialogClose = () => {
                if (abortControllerRef.current) {
                        abortControllerRef.current.abort();
                }
                onCloseDialog();
                resetForm();
        };

        const resetForm = () => {
                setTruckName('');
                setTruckCapacity('');
                setTrackNumber('');
                setTrackCost('');
                setAvaterFile('');
                setFileName('');
                setDocument('');
                setTruckImage('');
                setTruckType('');
                setValidationErrors({
                        truckName: '',
                        truckCapacity: '',
                        trackNumber: '',
                        trackCost: '',
                        truckType: '',
                        driver: '',
                        document: '',
                        fileName: '',
                        truckType: ''
                });
        };

        const handleSelectImage = (event) => {
                const file = event.target.files[0];
                if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                                console.log("Selected file:", file.type);
                                setTruckImage(e.target.result);
                                setAvaterFile(file);
                                // setAvaterName(file.name);
                        };
                        reader.readAsDataURL(file);
                }
        };

        const handleAddTruckToBranch = async () => {
                const errors = {};

                if (truckName.trim() === '') {
                        errors.truckName = 'Truck Name is required';
                }

                if (!truckCapacity || truckCapacity > 1000) {
                        errors.truckCapacity = 'Truck Capacity is required and must to be less than 1000';
                }

                if (!trackNumber || trackNumber.length !== 6) {
                        errors.trackNumber = 'Truck Number is required and must to be 6 number';
                }

                if (!trackCost) {
                        errors.trackCost = 'Truck Cost is required';
                }

                if (!document) {
                        errors.document = 'Document is required';
                }

                if (!truckType) {
                        errors.truckType = 'Type Truck is required'
                }
                setValidationErrors(errors);

                if (Object.keys(errors).length === 0) {
                        abortControllerRef.current = new AbortController();
                        const signal = abortControllerRef.current.signal;

                        let response;
                        console.log("av: " + avaterFile);
                        if (isUpdateInfoTruck) {
                                response = await dispatch(updateTruckInfoService({
                                        truckID,
                                        payload: {
                                                name: truckName,
                                                capacity: truckCapacity,
                                                car_number: trackNumber,
                                                cost: trackCost,
                                                document: document === '' ? fileName : document,
                                                image: avaterFile === '' ? fileName : avaterFile,
                                                class: truckType
                                        },
                                        signal
                                }));
                        } else {
                                response = await dispatch(createNewTruckService({
                                        payload: {
                                                name: truckName,
                                                capacity: truckCapacity,
                                                car_number: trackNumber,
                                                cost: trackCost,
                                                document: document,
                                                image: avaterFile,
                                                class: truckType
                                        },
                                        signal
                                }));
                        }

                        if (response.payload && response.payload.status === 'fail') {
                                console.log("Detailed error response:", response.payload);

                                if (response.payload.name && response.payload.name.length > 0) {
                                        setTruckName('');
                                        errors.name = response.payload.name[0];
                                }
                                if (response.payload.capacity && response.payload.capacity.length > 0) {
                                        setTruckCapacity('');
                                        errors.capacity = response.payload.capacity[0];
                                }
                                if (response.payload.car_number && response.payload.car_number.length > 0) {
                                        setTrackNumber('');
                                        errors.car_number = response.payload.car_number[0];
                                }
                                if (response.payload.cost && response.payload.cost.length > 0) {
                                        setTrackCost('');
                                        errors.cost = response.payload.cost[0];
                                }
                                if (response.payload.document && response.payload.document.length > 0) {
                                        setDocument('');
                                        errors.document = response.payload.document[0];
                                }

                                setValidationErrors(errors);
                        } else {
                                dispatch(getTruckBranch());
                                handleDialogClose();
                        }
                        setErrorMessage('An error occurred while adding the truck.');
                        setErrorSnackbarOpen(true);
                }
        };

        const handleFileChange = (e) => {
                const file = e.target.files[0];
                if (file) {
                        setDocument(file);
                        setFileName(file.name);
                        setValidationErrors({ ...validationErrors, document: '' });
                }
        };

        const handleClick = () => {
                if (fileInputRef.current) {
                        fileInputRef.current.click();
                }
        };

        return (

                <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                        <DialogContent sx={{ justifyContent: 'center' }}>
                                <MDTypography fontWeight="bold" color="black" fontSize={'18px'} p={1} textAlign='center'>
                                        {isUpdateInfoTruck ? 'Update Truck Information Inside Branch' : 'Add New Truck to Branch'}
                                </MDTypography>
                                <Divider />
                                <MDBox display="flex" flexDirection="column" justifyContent="center">
                                        <MDBox display="flex" justifyContent="center" p={2}>
                                                <MainBadgeItem avatarImage={truckImage} handleSelectImage={handleSelectImage} />
                                        </MDBox>
                                        <MDBox display="flex">
                                                <TextFeildForm
                                                        value={truckName}
                                                        isFulWidth={true}
                                                        placeholder={validationErrors.truckName ? validationErrors.truckName : "Truck Name"}
                                                        label={"Truck Name"}
                                                        validationColor={validationErrors.truckName ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.truckName}
                                                        onChange={(e) => {
                                                                setTruckName(e.target.value);
                                                                setValidationErrors({ ...validationErrors, truckName: '' });
                                                        }}
                                                />
                                        </MDBox>
                                        <MDBox display="flex">
                                                <TextFeildForm
                                                        value={truckCapacity}
                                                        isNumaric={true}
                                                        isFulWidth={true}
                                                        placeholder={validationErrors.truckCapacity ? validationErrors.truckCapacity : "Truck Capacity"}
                                                        label={"Truck Capacity"}
                                                        validationColor={validationErrors.truckCapacity ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.truckCapacity}
                                                        onChange={(e) => {
                                                                setTruckCapacity(e.target.value);
                                                                setValidationErrors({ ...validationErrors, truckCapacity: '' });
                                                        }}
                                                />
                                        </MDBox>
                                        <MDBox display="flex">
                                                <MDBox sx={{ width: '47%' }}>
                                                        <TextFeildForm
                                                                value={trackNumber}
                                                                isFulWidth={true}
                                                                placeholder={validationErrors.trackNumber ? validationErrors.trackNumber : "Truck Number"}
                                                                label={"Truck Number"}
                                                                validationColor={validationErrors.trackNumber ? colors.gradients.error.main : colors.white}
                                                                validationErrors={validationErrors.trackNumber}
                                                                onChange={(e) => {
                                                                        setTrackNumber(e.target.value);
                                                                        setValidationErrors({ ...validationErrors, trackNumber: '' });
                                                                }}
                                                        />
                                                </MDBox>
                                                <MDBox sx={{ width: '47%' }} onClick={handleClick}>
                                                        <label>
                                                                <input
                                                                        type="file"
                                                                        style={{ display: 'none' }}
                                                                        onChange={handleFileChange}
                                                                        accept=".pdf, .doc, .docx"
                                                                        ref={fileInputRef}
                                                                />
                                                                <TextFeildForm
                                                                        isFulWidth={true}
                                                                        value={fileName || ''}
                                                                        placeholder={validationErrors.document ? validationErrors.document : 'Select a file'}
                                                                        label={"Document"}
                                                                        validationColor={validationErrors.document ? colors.gradients.error.main : colors.white}
                                                                        validationErrors={validationErrors.document}
                                                                        readOnly
                                                                />
                                                        </label>
                                                </MDBox>
                                        </MDBox>
                                        <MDBox display="flex">
                                                <TextFeildForm
                                                        value={trackCost}
                                                        isNumaric={true}
                                                        isFulWidth={true}
                                                        placeholder={validationErrors.trackCost ? validationErrors.trackCost : "Truck Cost"}
                                                        label={"Truck Cost"}
                                                        validationColor={validationErrors.trackCost ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.trackCost}
                                                        onChange={(e) => {
                                                                setTrackCost(e.target.value);
                                                                setValidationErrors({ ...validationErrors, trackCost: '' });
                                                        }}
                                                />
                                        </MDBox>
                                        <MDBox display="flex">
                                                <DropdownTextField
                                                        isFulWidth={true}
                                                        value={truckType}
                                                        options={["normal", "fast"]}
                                                        validationErrors={validationErrors.truckType}
                                                        validationColor={validationErrors.truckType ? colors.gradients.error.main : colors.white}
                                                        placholder={"Track Type"}
                                                        label={'Track Type'}
                                                        onChange={(newValue) => setTruckType(newValue)}
                                                />
                                        </MDBox>
                                </MDBox>
                        </DialogContent>
                        <DialogActions>
                                <MDBox display="flex" justifyContent="space-between">
                                        <MDButton
                                                onClick={handleAddTruckToBranch}
                                                sx={{
                                                        backgroundColor: colors.gradients.info.main,
                                                        color: '#fff',
                                                        '&:hover': {
                                                                backgroundColor: '#2f4858'
                                                        }
                                                }}
                                        >
                                                {loading ? (
                                                        <CircularProgress size={24} sx={{ color: colors.white.main }} />
                                                ) : (
                                                        isUpdateInfoTruck ? 'Update' : 'Create'
                                                )}
                                        </MDButton>
                                        <Button onClick={handleDialogClose}>Close</Button>
                                </MDBox>
                        </DialogActions>
                        <Snackbar
                                open={errorSnackbarOpen}
                                autoHideDuration={4000}
                                onClose={() => { setErrorSnackbarOpen(false); }}
                                message={error || errorMessage}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        />
                </Dialog>

        );
};

export default AddTruckDialog;
