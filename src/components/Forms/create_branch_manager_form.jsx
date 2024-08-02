import React from 'react'
import MDBox from '../../items/MDBox/MDBox';
import TextFeildForm from '../Items/Form_TextFeild/text_feild_form';
import colors from '../../assets/theme/base/colors';
import DropdownTextField from '../Dropdown/drop_down_textFiled';

const CreateBranchManagerFrom = ({
         fulName, setFulName,
         fatherName, setFatherName,
         mohterName, setMohterName,
         nationalNumber, setNationalNumber,
         managerID, setManagerID,
         phoneNumber, setPhoneNumber,
         email, setEmail,
         password, setPassword,
         address, setAddress,
         national, setNational,
         degree, setDegree,
         brithDate, setBrithDate,
         salary, setSalary,
         gender, setGender,
         cv, setCv,
         fileName, setFileName,
         fileInputRef ,
        validationErrors, setValidationErrors,
        isUpdateManagerInfo
}) => {

        const handleFileChange = (e) => {
                const file = e.target.files[0];
                console.log("Selected file:", file);
                if (file) {
                        console.log("File type:", file.type);
                        setCv(file);
                        setFileName(file.name);
                        setValidationErrors({ ...validationErrors, cv: '' });
                }
        };

        const handleCvSelected = () => {
                if (fileInputRef.current) {
                        fileInputRef.current.click();
                }
        };

  return ( 
          <>
                  {/* //! first row */}
                  <MDBox display="flex" justifyContent="space-between"  >
                          <TextFeildForm
                                  value={fulName}
                                  placeholder={validationErrors.fulName ? validationErrors.fulName : "Full Name"}
                                  label={"Full Name"}
                                  validationColor={validationErrors.fulName ? colors.gradients.error.main : colors.white}
                                  validationErrors={validationErrors.fulName}
                                  onChange={(e) => {
                                          setFulName(e.target.value);
                                          setValidationErrors({ ...validationErrors, fulName: '' });
                                  }}
                          />
                          <TextFeildForm
                                  value={fatherName}
                                  placeholder={validationErrors.fatherName ? validationErrors.fatherName : "Father Name"}
                                  label={"Father Name"}
                                  validationColor={validationErrors.fatherName ? colors.gradients.error.main : colors.white}
                                  validationErrors={validationErrors.fatherName}
                                  onChange={(e) => {
                                          setFatherName(e.target.value);
                                          setValidationErrors({ ...validationErrors, fatherName: '' });
                                  }}
                          />

                  </MDBox>

                  {/* //! third row */}
                  <MDBox display="flex" justifyContent="space-between" >
                          <TextFeildForm
                                  value={mohterName}
                                  placeholder={validationErrors.mohterName ? validationErrors.mohterName : "Mohter Name"}
                                  label={"Mother Name"}
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
                                  // label={"Brith Date"}
                                  validationColor={validationErrors.brithDate ? colors.gradients.error.main : colors.white}
                                  validationErrors={validationErrors.brithDate}
                                  onChange={(e) => {
                                          setBrithDate(e.target.value);
                                          setValidationErrors({ ...validationErrors, brithDate: '' });
                                  }}
                          />

                  </MDBox>

                  {/* //! fourth row */}
                  <MDBox display="flex" justifyContent="space-between" >
                          <TextFeildForm
                                  value={national}
                                  placeholder={validationErrors.national ? validationErrors.national : "Nationality Employee"}
                                  label={"Nationality Employee "}
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
                                  label={"National Number"}
                                  validationErrors={validationErrors.nationalNumber}
                                  validationColor={validationErrors.nationalNumber ? colors.gradients.error.main : colors.white}
                                  onChange={(e) => {
                                          setNationalNumber(e.target.value);
                                          setValidationErrors({ ...validationErrors, nationalNumber: '' });
                                  }}
                          />
                  </MDBox>

                  {/* //! fifth row */}
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
                                  value={degree}
                                  placeholder={validationErrors.degree ? validationErrors.degree : "Degree"}
                                  label={"Degree"}
                                  validationColor={validationErrors.degree ? colors.gradients.error.main : colors.white}
                                  validationErrors={validationErrors.degree}
                                  onChange={(e) => {
                                          setDegree(e.target.value);
                                          setValidationErrors({ ...validationErrors, degree: '' });
                                  }}
                          />
                          <TextFeildForm
                                  value={salary}
                                  placeholder={validationErrors.salary ? validationErrors.salary : "Salary"}
                                  label={"Salary"}
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
                          {isUpdateManagerInfo ?
                                  <MDBox />
                                  :
                                  <TextFeildForm
                                          value={password}
                                          placeholder={validationErrors.password ? validationErrors.password : "Password"}
                                          label={"Password"}
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
                                  isNumaric={true}
                                  value={phoneNumber}
                                  placeholder={validationErrors.phoneNumber ? validationErrors.phoneNumber : 'Phone Number'}
                                  label={"Phone Number"}
                                  validationColor={validationErrors.phoneNumber ? colors.gradients.error.main : colors.white}
                                  validationErrors={validationErrors.phoneNumber}
                                  onChange={(e) => {
                                          setPhoneNumber(e.target.value);
                                          setValidationErrors({ ...validationErrors, phoneNumber: '' });
                                  }}
                          />

                          <DropdownTextField
                                  value={gender}
                                  options={["male", "female"]}
                                  validationErrors={validationErrors.gender}
                                  validationColor={validationErrors.gender ? colors.gradients.error.main : colors.white}
                                  placholder={"Gender"}
                                  label={"Gender"}
                                  onChange={(newValue) => setGender(newValue)}
                          />
                  </MDBox>

                  {/* Select files cv */}
                  <MDBox
                          sx={{ width: '95%' }}
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
                                          value={fileName || ''}
                                          placeholder={validationErrors.cv ? validationErrors.cv : 'Select a Cv'}
                                          label={"Cv File"}
                                          validationColor={validationErrors.cv ? colors.gradients.error.main : colors.white}
                                          validationErrors={validationErrors.cv}
                                          readOnly
                                  />
                          </label>
                  </MDBox>
          </>
  )
}

export default CreateBranchManagerFrom
