// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogActions, Button, Divider, DialogTitle, CircularProgress } from '@mui/material';
// import typography from './../../assets/theme-dark/base/typography';
// import MDBox from '../../items/MDBox/MDBox.jsx';
// import MDTypography from '../../items/MDTypography/index.jsx';
// import MDButton from '../../items/MDButton/index.jsx';
// import colors from '../../assets/theme/base/colors.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { getWarehousesBranch } from '../../layouts/branch/feature/warehouse_managment/services/get_warehouses_service.jsx';
// import { getTruckBranch } from '../../layouts/branch/feature/crisis_management/service/get_track_service.jsx';
// import Lottie from 'lottie-react';
// import re_employement from '../../assets/lottie/re_employement.json';
// import { reEmployementService } from '../../layouts/branch/feature/employee_managment/services/re_employement_service.jsx';
// import { getEmployeesArchiveService } from '../../layouts/branch/feature/employees_archive/services/get_employees_archive_service.jsx';
// import { fetchBranches } from '../../layouts/manager/feature/branchs/services/apis/get_branches_api.jsx';
// import { getValue } from '../../core/storage/storage.jsx';
// import { getBranchesManagers } from '../../layouts/manager/feature/branches_manage/services/get_branch_manager.jsx';
// import DropdownTextField from '../Dropdown/drop_down_textFiled.jsx';

// const ReEmployementDialog = ({ isDialogOpen, DialogClose, isManager, headTitle, employeeID, handleReEmployment }) => {
//         const dispatch = useDispatch();
//         const [employeeType, setEmployeeType] = useState('');
//         const [branchesName, setBranchesName] = useState('');
//         const [warehouseName, setwarehouseName] = useState('');
//         const [truckID, setTruckID] = useState('');
//         const [truckName, setTruckName] = useState('');
//         const [branchID, setBranchesID] = useState('');
//         const [warehouseID, setWarehouseID] = useState('');
//         const [driver_license, setDriver_license] = useState('');
//         const [validationErrors, setValidationErrors] = useState({
//                 warehouseName: '',
//                 truckName: '',
//                 employeeType: ''
//         });

//         useEffect(() => {
//                 if (!isManager) {
//                         dispatch(getWarehousesBranch());
//                         dispatch(getTruckBranch());
//                 } else {
//                         dispatch(fetchBranches());
//                 }
//         }, [dispatch, isManager]);

//         const branchData = useSelector(state => state.branches.branches);
//         const branchLoading = useSelector(state => state.branches.loading);
//         const warehouseData = useSelector(state => state.getWarehousesBranch.data);
//         const warehouseLoading = useSelector(state => state.getWarehousesBranch.loading);
//         const truckInfo = useSelector(state => state.getTrucksBranch);
//         const truckLoading = useSelector(state => state.getTrucksBranch.loadings);
//         const loading = useSelector(state => state.reEmployementService.loading);
//         const truckData = Array.isArray(truckInfo) ? truckInfo.filter(truck => truck.driver === null) : [];

//         const handleReEmployementConfirmation = async () => {
//                 const res = await dispatch(reEmployementService({
//                         userId: employeeID,
//                         payload: {
//                                 type: isManager === true ? 'branch_admin' : employeeType,
//                                 branch_id: isManager === true ? branchID : null,
//                                 warehouse_id: employeeType === 'Warehouse_supervisor' ? warehouseID : null,
//                                 truck_id: employeeType === 'driver' ? truckID : null,
//                                 driver_license: employeeType === 'driver' ? driver_license : null
//                         }
//                 }));
//                 // if (res.payload.status === 'success') {
//                 dispatch(getBranchesManagers());
//                 dispatch(getEmployeesArchiveService());
//                 handleDialogClose();
//                 // }
//         };

//         const handleDialogClose = () => {
//                 DialogClose();
//         };

//         return (
//                 <MDBox>
//                         <Dialog open={isDialogOpen} onClose={handleDialogClose}>
//                                 <DialogTitle >
//                                         <MDTypography typography={typography.h6} p={1}
//                                                 textAlign='center' >{headTitle}
//                                         </MDTypography>
//                                         <Divider sx={{
//                                                 color: "#252525",
//                                                 backgroundColor: "#252525;"
//                                         }} />

//                                 </DialogTitle>

//                                 <DialogContent>

//                                         <MDBox
//                                                 sx={{
//                                                         display: 'flex',
//                                                         flexDirection: 'column',
//                                                         alignItems: 'center',
//                                                 }}
//                                         >
//                                                 <Lottie animationData={re_employement} autoPlay style={{ width: 120, height: 120 }} />
//                                                 {!isManager ?
//                                                         <>
//                                                                 <DropdownTextField
//                                                                         value={employeeType}
//                                                                         isFulWidth={true}
//                                                                         options={["Warehouse_supervisor", "receptionist", "driver"]}
//                                                                         validationErrors={validationErrors.employeeType}
//                                                                         validationColor={validationErrors.employeeType ? colors.gradients.error.main : colors.white}
//                                                                         placholder={"Employee Type"}
//                                                                         label={'Employee Type'}
//                                                                         onChange={(newValue) => setEmployeeType(newValue)}
//                                                                 />
//                                                                 {employeeType === 'Warehouse_supervisor' ? (
//                                                                         <DropdownTextField
//                                                                                 value={warehouseName}
//                                                                                 isFulWidth={true}
//                                                                                 placeholder={'Select Warehouse'}
//                                                                                 label={'Warehouse'}
//                                                                                 validationErrors={validationErrors.warehouseName}
//                                                                                 validationColor={validationErrors.warehouseName ? colors.gradients.error.main : colors.white}
//                                                                                 options={warehouseData.filter(warehouse => warehouse.type === 'accepted' && warehouse.status === 'active' && warehouse.warehouse_manager === null).map(warehouse => warehouse.name)}
//                                                                                 displayProperty="name" branchManagersLoading={warehouseLoading}
//                                                                                 onChange={(newValue) => {
//                                                                                         const selectedWarehouse = warehouseData.find(warehouse => warehouse.name === newValue);
//                                                                                         if (selectedWarehouse) {
//                                                                                                 console.log("selectedWarehouse.id: " + selectedWarehouse.id);
//                                                                                                 console.log(typeof selectedWarehouse.id)
//                                                                                                 setWarehouseID(selectedWarehouse.id);
//                                                                                         } else {
//                                                                                                 setWarehouseID('');
//                                                                                         }
//                                                                                 }}
//                                                                         />
//                                                                 ) : (
//                                                                         <MDBox />
//                                                                 )}

//                                                                 {employeeType === 'driver' ?
//                                                                         <>
//                                                                                 {truckData && truckData.data && (
//                                                                                         <DropdownTextField
//                                                                                                 value={truckName}
//                                                                                                 isFulWidth={true}
//                                                                                                 placeholder={'Select Truck'}
//                                                                                                 label={'Trucks'}
//                                                                                                 validationErrors={validationErrors.truckName}
//                                                                                                 validationColor={validationErrors.truckName ? colors.gradients.error.main : colors.white}
//                                                                                                 options={truckData.data.filter(truck => truck.type === 'accepted' && truck.status === 'active').map(truck => truck.name)}
//                                                                                                 branchManagersLoading={truckLoading}
//                                                                                                 onChange={(newValue) => {
//                                                                                                         const selectedTruck = truckData.data.find(truck => truck.name === newValue);
//                                                                                                         if (selectedTruck) {
//                                                                                                                 console.log("selectedTruck.id: " + selectedTruck.id);
//                                                                                                                 console.log(typeof selectedTruck.id)
//                                                                                                                 setTruckID(selectedTruck.id);
//                                                                                                         } else {
//                                                                                                                 setTruckID('');
//                                                                                                         }
//                                                                                                 }}
//                                                                                         />
//                                                                                 )}
//                                                                         </>
//                                                                         :
//                                                                         <MDBox />
//                                                                 }
//                                                         </>

//                                                         :
//                                                         <DropdownTextField
//                                                                 value={branchesName}
//                                                                 isFulWidth={true}
//                                                                 options={branchData.filter(branchName => branchName.branch__manager === null).map(branchName => branchName.name)}
//                                                                 validationErrors={validationErrors.employeeType}
//                                                                 validationColor={validationErrors.employeeType ? colors.gradients.error.main : colors.white}
//                                                                 placholder={"Select Branch"}
//                                                                 label={'Select Branch'}
//                                                                 branchManagersLoading={branchLoading}
//                                                                 onChange={(newValue) => {
//                                                                         const selectedBranch = branchData.find(branchName => branchName.name === newValue);
//                                                                         if (selectedBranch) {
//                                                                                 setBranchesID(selectedBranch.id);
//                                                                         } else {
//                                                                                 setBranchesID('')
//                                                                         }

//                                                                 }}
//                                                         />
//                                                 }

//                                         </MDBox>
//                                 </DialogContent>

//                                 <DialogActions>
//                                         <MDBox display="flex" justifyContent="space-between">
//                                                 <MDButton onClick={handleReEmployementConfirmation}
//                                                         sx={{
//                                                                 backgroundColor: colors.gradients.info.main,
//                                                                 color: '#fff',
//                                                                 '&:hover': {
//                                                                         backgroundColor: '#2f4858'
//                                                                 }
//                                                         }}>{loading ?
//                                                                 <CircularProgress size={24} sx={{ color: colors.white.main }} />
//                                                                 :
//                                                                 'Employement'}</MDButton>
//                                                 <Button onClick={handleDialogClose}>Close</Button>
//                                         </MDBox>
//                                 </DialogActions>
//                         </Dialog>
//                 </MDBox>
//         )
// }

// export default ReEmployementDialog


import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Divider, DialogTitle, CircularProgress } from '@mui/material';
import typography from './../../assets/theme-dark/base/typography';
import MDBox from '../../items/MDBox/MDBox.jsx';
import MDTypography from '../../items/MDTypography/index.jsx';
import MDButton from '../../items/MDButton/index.jsx';
import colors from '../../assets/theme/base/colors.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehousesBranch } from '../../layouts/branch/feature/warehouse_managment/services/get_warehouses_service.jsx';
import { getTruckBranch } from '../../layouts/branch/feature/crisis_management/service/get_track_service.jsx';
import Lottie from 'lottie-react';
import re_employement from '../../assets/lottie/re_employement.json';
import { reEmployementService } from '../../layouts/branch/feature/employee_managment/services/re_employement_service.jsx';
import { getEmployeesArchiveService } from '../../layouts/branch/feature/employees_archive/services/get_employees_archive_service.jsx';
import { fetchBranches } from '../../layouts/manager/feature/branchs/services/apis/get_branches_api.jsx';
import { getBranchesManagers } from '../../layouts/manager/feature/branches_manage/services/get_branch_manager.jsx';
import DropdownTextField from '../Dropdown/drop_down_textFiled.jsx';

const ReEmployementDialog = ({ isDialogOpen, DialogClose, isManager, headTitle, employeeID, handleReEmployment }) => {
        const dispatch = useDispatch();
        const [employeeType, setEmployeeType] = useState('');
        const [branchesName, setBranchesName] = useState('');
        const [warehouseName, setwarehouseName] = useState('');
        const [truckID, setTruckID] = useState('');
        const [truckName, setTruckName] = useState('');
        const [branchID, setBranchesID] = useState('');
        const [warehouseID, setWarehouseID] = useState('');
        const [driverLicense, setDriverLicense] = useState(null);
        const [validationErrors, setValidationErrors] = useState({
                warehouseName: '',
                truckName: '',
                employeeType: ''
        });

        useEffect(() => {
                if (!isManager) {
                        dispatch(getWarehousesBranch());
                        dispatch(getTruckBranch());
                } else {
                        dispatch(fetchBranches());
                }
        }, [dispatch, isManager]);

        const branchData = useSelector(state => state.branches.branches);
        const branchLoading = useSelector(state => state.branches.loading);
        const warehouseData = useSelector(state => state.getWarehousesBranch.data);
        const warehouseLoading = useSelector(state => state.getWarehousesBranch.loading);
        const truckData = useSelector(state => state.getTrucksBranch);
        const truckLoading = useSelector(state => state.getTrucksBranch.loadings);
        const loading = useSelector(state => state.reEmployementService.loading);
        // const truckData = Array.isArray(truckInfo) ? truckInfo.filter(truck => truck.driver === null) : [];

        const handleReEmployementConfirmation = async () => {
                const res = await dispatch(reEmployementService({
                        userId: employeeID,
                        payload: {
                                type: isManager === true ? 'branch_admin' : employeeType,
                                branch_id: isManager === true ? branchID : null,
                                warehouse_id: employeeType === 'Warehouse_supervisor' ? warehouseID : null,
                                truck_id: employeeType === 'driver' ? truckID : null,
                                driver_license: employeeType === 'driver' ? driverLicense : null
                        }
                })).then(res => {
                        if (res.payload.status === 'success') {
                                dispatch(getBranchesManagers());
                                dispatch(getEmployeesArchiveService());
                                handleDialogClose();
                        }
                });
        };

        const handleDialogClose = () => {
                DialogClose();
                setDriverLicense('')
                setEmployeeType('')
        };

        const handleFileChange = (event) => {
                setDriverLicense(event.target.files[0]);
        };

        return (
                <MDBox>
                        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                                <DialogTitle>
                                        <MDTypography typography={typography.h6} p={1} textAlign='center'>{headTitle}</MDTypography>
                                        <Divider sx={{ color: "#252525", backgroundColor: "#252525;" }} />
                                </DialogTitle>

                                <DialogContent>
                                        <MDBox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Lottie animationData={re_employement} autoPlay style={{ width: 120, height: 120 }} />
                                                {!isManager ?
                                                        <>
                                                                <DropdownTextField
                                                                        value={employeeType}
                                                                        isFulWidth={true}
                                                                        options={["Warehouse_supervisor", "receptionist", "driver"]}
                                                                        validationErrors={validationErrors.employeeType}
                                                                        validationColor={validationErrors.employeeType ? colors.gradients.error.main : colors.white}
                                                                        placholder={"Employee Type"}
                                                                        label={'Employee Type'}
                                                                        onChange={(newValue) => setEmployeeType(newValue)}
                                                                />
                                                                {employeeType === 'Warehouse_supervisor' ? (
                                                                        <DropdownTextField
                                                                                value={warehouseName}
                                                                                isFulWidth={true}
                                                                                placeholder={'Select Warehouse'}
                                                                                label={'Warehouse'}
                                                                                validationErrors={validationErrors.warehouseName}
                                                                                validationColor={validationErrors.warehouseName ? colors.gradients.error.main : colors.white}
                                                                                options={warehouseData.filter(warehouse => warehouse.type === 'accepted' && warehouse.status === 'active' && warehouse.warehouse_manager === null).map(warehouse => warehouse.name)}
                                                                                displayProperty="name" branchManagersLoading={warehouseLoading}
                                                                                onChange={(newValue) => {
                                                                                        const selectedWarehouse = warehouseData.find(warehouse => warehouse.name === newValue);
                                                                                        if (selectedWarehouse) {
                                                                                                setWarehouseID(selectedWarehouse.id);
                                                                                        } else {
                                                                                                setWarehouseID('');
                                                                                        }
                                                                                }}
                                                                        />
                                                                ) : (
                                                                        <MDBox />
                                                                )}

                                                                {employeeType === 'driver' && (
                                                                        <>
                                                                                {truckData && truckData.data && (
                                                                                        <DropdownTextField
                                                                                                value={truckName}
                                                                                                isFulWidth={true}
                                                                                                placeholder={'Select Truck'}
                                                                                                label={'Trucks'}
                                                                                                validationErrors={validationErrors.truckName}
                                                                                                validationColor={validationErrors.truckName ? colors.gradients.error.main : colors.white}
                                                                                                options={truckData.data.filter(truck => truck.driver === null && truck.type === 'accepted' && truck.status === 'active').map(truck => truck.name)}
                                                                                                branchManagersLoading={truckLoading}
                                                                                                onChange={(newValue) => {
                                                                                                        const selectedTruck = truckData.data.find(truck => truck.name === newValue);
                                                                                                        if (selectedTruck) {
                                                                                                                console.log("selectedTruck.id: " + selectedTruck.id);
                                                                                                                console.log(typeof selectedTruck.id)
                                                                                                                setTruckID(selectedTruck.id);
                                                                                                        } else {
                                                                                                                setTruckID('');
                                                                                                        }
                                                                                                }}
                                                                                        />
                                                                                )}
                                                                                <Button
                                                                                        variant="contained"
                                                                                        component="label"
                                                                                        sx={{ mt: 2, mb: 2, backgroundColor: colors.gradients.info.main, color: '#fff', '&:hover': { backgroundColor: '#2f4858' } }}
                                                                                >
                                                                                        Upload Driver License
                                                                                        <input
                                                                                                type="file"
                                                                                                hidden
                                                                                                accept="image/*"
                                                                                                onChange={handleFileChange}
                                                                                        />
                                                                                </Button>
                                                                                {driverLicense && (
                                                                                        <img
                                                                                                src={URL.createObjectURL(driverLicense)}
                                                                                                alt="Driver License"
                                                                                                style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: '10px' }}
                                                                                        />
                                                                                )}
                                                                        </>
                                                                )}
                                                        </>
                                                        :
                                                        <DropdownTextField
                                                                value={branchesName}
                                                                isFulWidth={true}
                                                                options={branchData.filter(branchName => branchName.branch__manager === null).map(branchName => branchName.name)}
                                                                validationErrors={validationErrors.employeeType}
                                                                validationColor={validationErrors.employeeType ? colors.gradients.error.main : colors.white}
                                                                placholder={"Select Branch"}
                                                                label={'Select Branch'}
                                                                branchManagersLoading={branchLoading}
                                                                onChange={(newValue) => {
                                                                        const selectedBranch = branchData.find(branchName => branchName.name === newValue);
                                                                        if (selectedBranch) {
                                                                                setBranchesID(selectedBranch.id);
                                                                        } else {
                                                                                setBranchesID('')
                                                                        }

                                                                }}
                                                        />
                                                }
                                        </MDBox>
                                </DialogContent>

                                <DialogActions>
                                        <MDBox display="flex" justifyContent="space-between">
                                                <MDButton onClick={handleReEmployementConfirmation}
                                                        sx={{
                                                                backgroundColor: colors.gradients.info.main,
                                                                color: '#fff',
                                                                '&:hover': {
                                                                        backgroundColor: '#2f4858'
                                                                }
                                                        }}>{loading ?
                                                                <CircularProgress size={24} sx={{ color: colors.white.main }} />
                                                                :
                                                                'Employement'}</MDButton>
                                                <Button onClick={handleDialogClose}>Close</Button>
                                        </MDBox>
                                </DialogActions>
                        </Dialog>
                </MDBox>
        )
}

export default ReEmployementDialog;
