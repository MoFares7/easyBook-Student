import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MDBox from '../../items/MDBox/MDBox';
import TextFeildForm from '../Items/Form_TextFeild/text_feild_form';
import colors from '../../assets/theme/base/colors';
import imageUpload from '../../layouts/branch/assets/lottie/image-upload.json';
import Lottie from 'lottie-react';
import DropdownTextField from '../Dropdown/drop_down_textFiled';
import { getWarehousesBranch } from '../../layouts/branch/feature/warehouse_managment/services/get_warehouses_service';
import { getTruckBranch } from './../../layouts/branch/feature/crisis_management/service/get_track_service';

const EmployeeForm = ({
        fullName, setFullName,
        fatherName, setFatherName,
        mohterName, setMohterName,
        brithDate, setBrithDate,
        employeeType, setEmployeeType,
        gender, setGender,
        national, setNational,
        nationalNumber, setNationalNumber,
        phoneNumber, setPhoneNumber,
        warehouseName, setWarehouseID,
        email, setEmail,
        password, setPassword,
        salary, setSalary,
        address, setAddress,
        degree, setDegree,
        cv, fileName,
        handleCvSelected, driverLicense, setDriverLicense, setDriverLicenseImageFile, truckName, setTruckID,
        fileInputRef, handleFileChange, validationErrors, setValidationErrors,
        isUpdateEmployeeInfo
}) => {

        const dispatch = useDispatch();

        useEffect(() => {
                dispatch(getWarehousesBranch());
                dispatch(getTruckBranch());
        }, [dispatch]);

        const warehouseData = useSelector(state => state.getWarehousesBranch.data);
        const warehouseLoading = useSelector(state => state.getWarehousesBranch.loading);
        const truckData = useSelector(state => state.getTrucksBranch);
        const truckLoading = useSelector(state => state.getTrucksBranch.loadings);

        const handleCvdriverLicense = (e) => {
                const file = e.target.files[0];
                if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                                setDriverLicense(reader.result);
                                setDriverLicenseImageFile(file)
                        };
                        reader.readAsDataURL(file);
                }
        };
        console.log("type: " + employeeType);

        return (
                <>
                        {/* //! first row */}
                        <MDBox display="flex" justifyContent="space-between"  >
                                <TextFeildForm
                                        value={fullName}
                                        placeholder={validationErrors.fullName ? validationErrors.fullName : "Ful Name"}
                                        label={'Full Name'}
                                        validationColor={validationErrors.fullName ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.fullName}
                                        onChange={(e) => {
                                                setFullName(e.target.value);
                                                setValidationErrors({ ...validationErrors, fullName: '' });
                                        }}
                                />
                                <TextFeildForm
                                        value={fatherName}
                                        placeholder={validationErrors.fatherName ? validationErrors.fatherName : "Father Name"}
                                        label={'Father Name'}
                                        validationColor={validationErrors.fatherName ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.fatherName}
                                        onChange={(e) => {
                                                setFatherName(e.target.value);
                                                setValidationErrors({ ...validationErrors, fatherName: '' });
                                        }}
                                />

                        </MDBox>

                        {/* //! secondly row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <TextFeildForm
                                        value={mohterName}
                                        placeholder={validationErrors.mohterName ? validationErrors.mohterName : "Mohter Name"}
                                        label={'Mother Name'}
                                        validationColor={validationErrors.mohterName ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.mohterName}
                                        onChange={(e) => {
                                                setMohterName(e.target.value);
                                                setValidationErrors({ ...validationErrors, mohterName: '' });
                                        }}
                                />

                                <TextFeildForm
                                        isDate={true}
                                        value={brithDate}
                                        placeholder={validationErrors.brithDate ? validationErrors.brithDate : "Brith Date"}
                                        validationColor={validationErrors.brithDate ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.brithDate}
                                        onChange={(e) => {
                                                setBrithDate(e.target.value);
                                                setValidationErrors({ ...validationErrors, brithDate: '' });
                                        }}
                                />

                        </MDBox>

                        {/* //! third row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                {isUpdateEmployeeInfo ?
                                        <TextFeildForm
                                                value={email}
                                                placeholder={validationErrors.email ? validationErrors.email : "Email"}
                                                label={'Email'}
                                                validationColor={validationErrors.email ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.email}
                                                onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        setValidationErrors({ ...validationErrors, email: '' });
                                                }}
                                        />
                                        : <DropdownTextField
                                                value={employeeType}
                                                options={["Warehouse_supervisor", "receptionist", "driver"]}
                                                validationErrors={validationErrors.employeeType}
                                                validationColor={validationErrors.employeeType ? colors.gradients.error.main : colors.white}
                                                placholder={"Employee Type"}
                                                label={'Employee Type'}
                                                onChange={(newValue) => setEmployeeType(newValue)}
                                        />}

                                <DropdownTextField
                                        value={gender}
                                        options={["male", "female"]}
                                        validationErrors={validationErrors.gender}
                                        validationColor={validationErrors.gender ? colors.gradients.error.main : colors.white}
                                        placholder={"Gender"}
                                        label={'Gender'}
                                        onChange={(newValue) => setGender(newValue)}
                                />
                        </MDBox>

                        {/* //! fourth row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <TextFeildForm
                                        value={national}
                                        placeholder={validationErrors.national ? validationErrors.national : "Nationality"}
                                        label={'Nationalty'}
                                        validationErrors={validationErrors.national}
                                        validationColor={validationErrors.national ? colors.gradients.error.main : colors.white}
                                        onChange={(e) => {
                                                setNational(e.target.value);
                                                setValidationErrors({ ...validationErrors, national: '' });
                                        }}
                                />
                                <TextFeildForm
                                        isNumaric={true}
                                        value={nationalNumber}
                                        placeholder={validationErrors.nationalNumber ? validationErrors.nationalNumber : "National Number"}
                                        label={'National Number'}
                                        validationErrors={validationErrors.nationalNumber}
                                        validationColor={validationErrors.nationalNumber ? colors.gradients.error.main : colors.white}
                                        onChange={(e) => {
                                                setNationalNumber(e.target.value);
                                                setValidationErrors({ ...validationErrors, nationalNumber: '' });
                                        }}
                                />
                        </MDBox>

                        {/* //! fifth row */}
                        <MDBox display="flex" justifyContent="center" >
                                <TextFeildForm
                                        isNumaric={true}
                                        value={phoneNumber}
                                        placeholder={validationErrors.phoneNumber ? validationErrors.phoneNumber : 'Phone Number'}
                                        label={'Phone Number'}
                                        validationColor={validationErrors.phoneNumber ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.phoneNumber}
                                        onChange={(e) => {
                                                setPhoneNumber(e.target.value);
                                                setValidationErrors({ ...validationErrors, phoneNumber: '' });
                                        }}
                                />
                                <TextFeildForm
                                        isNumaric={true}
                                        value={salary}
                                        placeholder={validationErrors.salary ? validationErrors.salary : 'Salary'}
                                        label={'Salary'}
                                        validationColor={validationErrors.salary ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.salary}
                                        onChange={(e) => {
                                                setSalary(e.target.value);
                                                setValidationErrors({ ...validationErrors, salary: '' });
                                        }}
                                />
                        </MDBox>

                        {/* //! six row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                {isUpdateEmployeeInfo ?
                                        <MDBox />
                                        :
                                        <TextFeildForm
                                                value={email}
                                                placeholder={validationErrors.email ? validationErrors.email : "Email"}
                                                label={'Email'}
                                                validationColor={validationErrors.email ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.email}
                                                onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        setValidationErrors({ ...validationErrors, email: '' });
                                                }}
                                        />
                                }
                                {isUpdateEmployeeInfo ?
                                        <MDBox />
                                        :
                                        <TextFeildForm
                                                value={password}
                                                placeholder={validationErrors.password ? validationErrors.password : "Password"}
                                                label={'Password'}
                                                validationColor={validationErrors.password ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.password}
                                                onChange={(e) => {
                                                        setPassword(e.target.value);
                                                        setValidationErrors({ ...validationErrors, password: '' });
                                                }}
                                        />
                                }


                        </MDBox>

                        {/* //! seven row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <TextFeildForm
                                        value={address}
                                        placeholder={validationErrors.address ? validationErrors.address : "Address"}
                                        label={'Address'}
                                        validationColor={validationErrors.address ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.address}
                                        onChange={(e) => {
                                                setAddress(e.target.value);
                                                setValidationErrors({ ...validationErrors, address: '' });
                                        }}
                                />
                                <TextFeildForm
                                        value={degree}
                                        placeholder={validationErrors.degree ? validationErrors.degree : "Degree Education"}
                                        label={'Degree Education'}
                                        validationColor={validationErrors.degree ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.degree}
                                        onChange={(e) => {
                                                setDegree(e.target.value);
                                                setValidationErrors({ ...validationErrors, degree: '' });
                                        }}
                                />
                        </MDBox>

                        {/* //! Select files  */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <MDBox
                                        sx={{
                                                fontSize: '1rem',
                                                width: '50%',
                                                borderRadius: '0.5rem',
                                                color: 'red',
                                        }}
                                        onClick={handleCvSelected}
                                >
                                        <label>
                                                <input
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                        accept=".pdf, .doc, .docx"
                                                        // disabled={cv !== ''}
                                                        ref={fileInputRef}
                                                />
                                                <TextFeildForm
                                                        isFulWidth={true}
                                                        value={fileName || ''}
                                                        placeholder={validationErrors.cv ? validationErrors.cv : 'Select a Cv'}
                                                        label={'Cv Employee'}
                                                        validationColor={validationErrors.cv ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.cv}
                                                        readOnly
                                                />
                                        </label>
                                </MDBox>

                                {/* fetch warehouses in branch */}
                                {employeeType === 'Warehouse_supervisor' ? (
                                        <DropdownTextField
                                                value={warehouseName}
                                                isFulWidth={false}
                                                placeholder={'Select Warehouse'}
                                                label={'Warehouse'}
                                                validationErrors={validationErrors.warehouseName}
                                                validationColor={validationErrors.warehouseName ? colors.gradients.error.main : colors.white}
                                                options={warehouseData.filter(warehouse => warehouse.type === 'accepted' && warehouse.status === 'active' && warehouse.warehouse_manager === null).map(warehouse => warehouse.name)}
                                                branchManagersLoading={warehouseLoading}
                                                onChange={(newValue) => {
                                                        const selectedWarehouse = warehouseData.find(warehouse => warehouse.name === newValue);
                                                        if (selectedWarehouse) {
                                                                console.log("selectedWarehouse.id: " + selectedWarehouse.id);
                                                                console.log(typeof selectedWarehouse.id)
                                                                setWarehouseID(selectedWarehouse.id);
                                                        } else {
                                                                setWarehouseID('');
                                                        }
                                                }}
                                        />
                                ) : (
                                        <MDBox />
                                )}

                                {employeeType === 'driver' ?
                                        <>
                                                {truckData && truckData.data && (
                                                        <DropdownTextField
                                                                value={truckName}
                                                                isFulWidth={false}
                                                                placeholder={'Select Truck'}
                                                                label={'Trucks'}
                                                                validationErrors={validationErrors.truckName}
                                                                validationColor={validationErrors.truckName ? colors.gradients.error.main : colors.white}
                                                                options={truckData.data.filter(truck => truck.type === 'accepted' && truck.status === 'active' && truck.driver === null).map(truck => truck.name)}
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
                                        </>
                                        :
                                        <MDBox />
                                }
                        </MDBox>
                        {employeeType === 'driver' ?
                                <MDBox
                                        sx={{
                                                m: 2,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                textAlign: 'center',
                                        }}
                                >
                                        <MDBox
                                                sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        fontSize: '1rem',
                                                        fontSize: '1rem',
                                                        width: '50%',
                                                        borderRadius: '0.5rem',
                                                        borderStyle: 'solid',
                                                        borderWidth: '1px',
                                                }}
                                                onClick={() => {
                                                        document.getElementById('fileInput').click();
                                                }}
                                        >
                                                {driverLicense ? (
                                                        <img src={driverLicense} width={100} alt="Selected Image" />
                                                ) : (
                                                        <Lottie animationData={imageUpload} autoplay loop style={{ alignItems: 'center', width: 150, height: 150 }} />

                                                )}
                                                <input
                                                        id="fileInput"
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        onChange={handleCvdriverLicense}
                                                        accept="image/*"
                                                />
                                        </MDBox>
                                </MDBox>
                                :
                                <MDBox />
                        }

                </>
        )
}

export default EmployeeForm
