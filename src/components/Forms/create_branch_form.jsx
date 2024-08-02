import React, { useEffect, useRef, useState } from 'react';
import MDBox from '../../items/MDBox/MDBox.jsx';
import TextFeildForm from '../Items/Form_TextFeild/text_feild_form.jsx';
import colors from '../../assets/theme/base/colors.jsx';
import MainBadgeItem from '../Items/Badge/badge.jsx';
import DropdownTextField from '../Dropdown/drop_down_textFiled.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchesManagers } from '../../layouts/manager/feature/branches_manage/services/get_branch_manager.jsx';
import LocationComponent from '../../layouts/manager/feature/branchs/presentitons/components/location_component.jsx';
import { getEmployeesArchiveService } from '../../layouts/branch/feature/employees_archive/services/get_employees_archive_service.jsx';

const BranchInfoForm = ({
        branchID, setBranchID,
        avatarImage, setAvatarImage,
        branchName, setBranchName,
        city, setCity,
        mobile, setMobile,
        lng, setLng,
        lat, setLat,
        numberPhone, setNumberPhone,
        email, setEmail,
        address, setAddress,
        cost, setCost,
        managerName, setManagerName,
        managerID, setManagerID,
        percent, setPercent,
        document, setDocument,
        fileName, setFileName,
        image, setImage,
        validationErrors, setValidationErrors,
        fileInputRef,
        isUpdateBranchInfo, setIsUpdateBranchInfo
}) => {
        const dispatch = useDispatch();
        const branchManager = useSelector(state => state.getBranchesManagers.data);
        const branchManagers = branchManager.filter(manager => manager.type === 'branch_admin')
        const branchManagersLoading = useSelector(state => state.getBranchesManagers.loading);

        useEffect(() => {
                dispatch(getEmployeesArchiveService());
        }, [dispatch]);

        useEffect(() => {
                dispatch(getBranchesManagers());
        }, [dispatch]);

        const handleFileChange = (e) => {
                const file = e.target.files[0];
                if (file) {
                        console.log("File object:", file);
                        console.log("File type:", file.type);
                        setDocument(file);
                        setFileName(file.name);
                        setValidationErrors({ ...validationErrors, document: '' });
                }
        };

        const handleDocumentSelected = () => {
                if (fileInputRef.current) {
                        fileInputRef.current.click();
                }
        };

        const handleSelectImage = (event) => {
                const file = event.target.files[0];
                if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                                console.log("Selected file:", file.type);
                                setImage(e.target.result);
                                setAvatarImage(file);
                        };
                        reader.readAsDataURL(file);
                }
        };

        const handleOpenMaps = () => {

                let mapOptions = {
                        center: [51.958, 9.141],
                        zoom: 10
                }

                let map = new L.map('map', mapOptions);

                let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                map.addLayer(layer);


                let marker = null;
                map.on('click', (event) => {

                        if (marker !== null) {
                                map.removeLayer(marker);
                        }

                        marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);

                        document.getElementById('latitude').value = event.latlng.lat;
                        document.getElementById('longitude').value = event.latlng.lng;

                })

        }

        return (
                <>
                        <MDBox display="flex" justifyContent="center" p={2}  >
                                <MainBadgeItem
                                        avatarImage={image}
                                        handleSelectImage={handleSelectImage}
                                />
                        </MDBox>
                        {/* //! first row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <TextFeildForm
                                        value={branchName}
                                        placeholder={validationErrors.branchName ? validationErrors.branchName : "Branch Name"}
                                        label={"Branch Name"}
                                        validationColor={validationErrors.branchName ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.branchName}
                                        onChange={(e) => {
                                                setBranchName(e.target.value);
                                                setValidationErrors({ ...validationErrors, branchName: '' });
                                        }}
                                />

                                <TextFeildForm
                                        value={address}
                                        placeholder={validationErrors.address ? validationErrors.address : "Address"}
                                        label={"Address"}
                                        validationColor={validationErrors.address ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.address}
                                        onChange={(e) => {
                                                setAddress(e.target.value);
                                                setValidationErrors({ ...validationErrors, address: '' });
                                        }}
                                />

                        </MDBox>

                        {/* //! second row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <TextFeildForm
                                        value={mobile}
                                        isNumaric={true}
                                        placeholder={validationErrors.mobile ? validationErrors.mobile : "Mobile Number"}
                                        label={"Mobile Number"}
                                        validationColor={validationErrors.mobile ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.mobile}
                                        onChange={(e) => {
                                                setMobile(e.target.value);
                                                setValidationErrors({ ...validationErrors, mobile: '' });
                                        }}
                                />
                                <TextFeildForm
                                        value={numberPhone}
                                        isNumaric={true}
                                        placeholder={validationErrors.numberPhone ? validationErrors.numberPhone : "Phone Number"}
                                        label={"Phone Number"}
                                        validationErrors={validationErrors.numberPhone}
                                        validationColor={validationErrors.numberPhone ? colors.gradients.error.main : colors.white}
                                        onChange={(e) => {
                                                setNumberPhone(e.target.value);
                                                setValidationErrors({ ...validationErrors, numberPhone: '' });
                                        }}
                                />
                        </MDBox>

                        {/* //! third row */}
                        <MDBox display="flex" justifyContent="space-between" >

                                <DropdownTextField
                                        value={city}
                                        isFulWidth={false}
                                        options={["Abu Dhabi", "Ajman", "Al Ain", "Dubai", "Fujairah", "Ras Al Khaimah(RAK)", "Sharjah", "Umm Al Quwain(UAQ)"]}
                                        validationErrors={validationErrors.city}
                                        validationColor={validationErrors.city ? colors.gradients.error.main : colors.white}
                                        placholder={"City"}
                                        label={"City"}
                                        onChange={(newValue) => setCity(newValue)}
                                />

                                <DropdownTextField
                                        value={managerName}
                                        isFulWidth={false}
                                        placholder={"Branch Manager"}
                                        label={"Branch Manager"}
                                        validationErrors={validationErrors.managerID}
                                        validationColor={validationErrors.managerID ? colors.gradients.error.main : colors.white}
                                        options={branchManagers?.map(manager => manager.username)}
                                        branchManagersLoading={branchManagersLoading}
                                        onChange={(newValue) => {
                                                const selectedManager = branchManagers.find(manager => manager.username === newValue);
                                                if (selectedManager) {
                                                        setManagerID(selectedManager.id);
                                                        console.log("selectedManager ID: " + selectedManager.id);
                                                } else {
                                                        setManagerID('');
                                                }
                                        }}
                                />


                        </MDBox>


                        {/* //! fourth row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <TextFeildForm
                                        value={email}
                                        placeholder={validationErrors.email ? validationErrors.email : "Email"}
                                        label={"Email"}
                                        validationColor={validationErrors.email ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.email}
                                        onChange={(e) => {
                                                setEmail(e.target.value);
                                                setValidationErrors({ ...validationErrors, email: '' });
                                        }}
                                />
                                {isUpdateBranchInfo ? <MDBox /> :
                                        <TextFeildForm
                                                value={cost}
                                                placeholder={validationErrors.cost ? validationErrors.cost : "Cost of Construction"}
                                                label={"Cost of Construction"}
                                                validationColor={validationErrors.cost ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.cost}
                                                onChange={(e) => {
                                                        setCost(e.target.value);
                                                        setValidationErrors({ ...validationErrors, cost: '' });
                                                }}
                                        />
                                }

                                <TextFeildForm
                                        value={percent}
                                        placeholder={validationErrors.percent ? validationErrors.percent : "Profit percentage Manager"}
                                        label={"Profit percentage Manager"}
                                        validationColor={validationErrors.percent ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.percent}
                                        onChange={(e) => {
                                                setPercent(e.target.value);
                                                setValidationErrors({ ...validationErrors, percent: '' });
                                        }}
                                />

                        </MDBox>

                        {/* //! six row */}
                        <MDBox
                                sx={{ width: '95%' }}
                                onClick={handleDocumentSelected}
                        >
                                <label>
                                        <input
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                accept=".pdf, .doc, .docx"
                                                // disabled={document !== ''}
                                                ref={fileInputRef}
                                        />
                                        <TextFeildForm
                                                value={fileName || ''}
                                                placeholder={validationErrors.document ? validationErrors.document : 'Select a Document'}
                                                label={"Document Files"}
                                                validationColor={validationErrors.document ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.document}
                                                readOnly
                                        />
                                </label>
                        </MDBox>

                        {/* //! fifth row */}
                        <div className="wrap">
                                <MDBox display="flex" justifyContent="space-between" >
                                        <TextFeildForm
                                                value={lat}
                                                isNumaric={true}
                                                placeholder={validationErrors.lat ? validationErrors.lat : "Latitude"}
                                                label={"Latitude"}
                                                validationColor={validationErrors.lat ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.lat}
                                                onChange={(e) => {
                                                        setLat(e.target.value);
                                                        setValidationErrors({ ...validationErrors, lat: '' });
                                                }}
                                        />
                                        <TextFeildForm
                                                value={lng}
                                                isNumaric={true}
                                                placeholder={validationErrors.lng ? validationErrors.lng : "Langtuning"}
                                                label={"Langtuning"}
                                                validationColor={validationErrors.lng ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.lng}
                                                onChange={(e) => {
                                                        setLng(e.target.value);
                                                        setValidationErrors({ ...validationErrors, lng: '' });
                                                }}
                                        />
                                </MDBox>
                                <LocationComponent lat={lat} lng={lng} setLat={setLat} setLng={setLng} isLocationDetectionEnabled={true} />
                        </div>

                </>
        )
}

export default BranchInfoForm
