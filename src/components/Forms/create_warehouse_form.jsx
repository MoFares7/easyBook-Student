import React from 'react'
import DropdownTextField from '../Dropdown/drop_down_textFiled';
import MDBox from '../../items/MDBox/MDBox';
import TextFeildForm from '../Items/Form_TextFeild/text_feild_form';
import MainBadgeItem from '../Items/Badge/badge';
import colors from '../../assets/theme/base/colors';

const CreateWarehouseForm = ({
        isUpdatewarehouseInfo, setIsUpdatewarehouseInfo,
        warehouseID, setWarehouseID,
        image, setImage,
        name, setname,
        capacity, setcapacity,
        phoneNumber, setPhoneNumber,
        email, setEmail,
        address, setAddress,
        costs, setcosts,
        description, setDescription,
        ownership, setownership,
        document, setdocument,
        avatarImage, setAvatarImage,
        fileName, setFileName,
        fileInputRef,
        validationErrors, setValidationErrors
}) => {

        const handleFileChange = (e) => {
                const file = e.target.files[0];
                console.log("Selected file:", file);
                if (file) {
                        console.log("File type:", file.type);
                        setdocument(file);
                        setFileName(file.name);
                        setValidationErrors({ ...validationErrors, document: '' });
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

        const handledocumentSelected = () => {
                if (fileInputRef.current) {
                        fileInputRef.current.click();
                }
        };

        return (
                <>
                        <MDBox display="flex" justifyContent="center" p={2}  >
                                <MainBadgeItem
                                        avatarImage={image}
                                        handleSelectImage={handleSelectImage} />

                        </MDBox>
                        {/* //! first row */}
                        <MDBox display="flex" justifyContent="space-between"  >
                                <TextFeildForm
                                        value={name}
                                        placeholder={validationErrors.name ? validationErrors.name : "Warehouse Name"}
                                        label={"Warehouse Name"}
                                        validationColor={validationErrors.name ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.name}
                                        onChange={(e) => {
                                                setname(e.target.value);
                                                setValidationErrors({ ...validationErrors, name: '' });
                                        }}
                                />
                                <TextFeildForm
                                        isNumaric={true}
                                        value={capacity}
                                        placeholder={validationErrors.capacity ? validationErrors.capacity : "Warehouse Capacity"}
                                        label={"Warehouse Capacity"}
                                        validationColor={validationErrors.capacity ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.capacity}
                                        onChange={(e) => {
                                                setcapacity(e.target.value);
                                                setValidationErrors({ ...validationErrors, capacity: '' });
                                        }}
                                />

                        </MDBox>

                        {/* //! third row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <TextFeildForm
                                        isNumaric={true}
                                        value={phoneNumber}
                                        placeholder={validationErrors.phoneNumber ? validationErrors.phoneNumber : "Phone Number"}
                                        label={"Phone Number"}
                                        validationColor={validationErrors.phoneNumber ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.phoneNumber}
                                        onChange={(e) => {
                                                setPhoneNumber(e.target.value);
                                                setValidationErrors({ ...validationErrors, phoneNumber: '' });
                                        }}
                                />
                                <TextFeildForm
                                        value={email}
                                        placeholder={validationErrors.email ? validationErrors.email : "Email"}
                                        label={"Email"}
                                        validationErrors={validationErrors.email}
                                        validationColor={validationErrors.email ? colors.gradients.error.main : colors.white}
                                        onChange={(e) => {
                                                setEmail(e.target.value);
                                                setValidationErrors({ ...validationErrors, email: '' });
                                        }}
                                />

                        </MDBox>


                        <MDBox display="flex" justifyContent="center" >
                                <TextFeildForm
                                        value={description}
                                        placeholder={validationErrors.description ? validationErrors.description : "Description"}
                                        label={"Description"}
                                        validationColor={validationErrors.description ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.description}
                                        onChange={(e) => {
                                                setDescription(e.target.value);
                                                setValidationErrors({ ...validationErrors, description: '' });
                                        }}
                                />
                        </MDBox>

                        {/* //! fourth row */}
                        <MDBox display="flex" justifyContent="space-between" >
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
                                <TextFeildForm
                                        isNumaric={true}
                                        value={costs}
                                        placeholder={validationErrors.costs ? validationErrors.costs : "Costs in AED"}
                                        label={"Costs in AED"}
                                        validationColor={validationErrors.costs ? colors.gradients.error.main : colors.white}
                                        validationErrors={validationErrors.costs}
                                        onChange={(e) => {
                                                setcosts(e.target.value);
                                                setValidationErrors({ ...validationErrors, costs: '' });
                                        }}
                                />

                        </MDBox>


                        {/* //! seven row */}
                        <MDBox display="flex" justifyContent="space-between" >
                                <MDBox
                                        sx={{ width: '50%' }}
                                        onClick={handledocumentSelected}
                                >
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
                                                        placeholder={validationErrors.document ? validationErrors.document : 'Select a document'}
                                                        label={"document File"}
                                                        validationColor={validationErrors.document ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.document}
                                                        readOnly
                                                />
                                        </label>
                                </MDBox>
                                <MDBox sx={{ width: '50%' }}>
                                        <DropdownTextField
                                                isFulWidth={true}
                                                value={ownership}
                                                options={["rent ", "own"]}
                                                validationErrors={validationErrors.ownership}
                                                validationColor={validationErrors.ownership ? colors.gradients.error.main : colors.white}
                                                placholder={"OwnerShip"}
                                                label={"OwnerShip"}
                                                onChange={(newValue) => {
                                                        setownership(newValue);
                                                }}
                                        />
                                </MDBox>
                        </MDBox>

                </>

        )
}

export default CreateWarehouseForm
