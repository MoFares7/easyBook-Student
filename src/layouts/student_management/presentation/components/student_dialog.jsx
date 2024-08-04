import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import MDTextField from '../../../../items/MDTextField';
import PrimaryButton from '../../../../items/MDButton';
import colors from '../../../../assets/theme/base/colors';
import MDBox from '../../../../items/MDBox/MDBox';
import MDDropDownField from '../../../../items/MDDropDown';
import { CITY_OPTIONS } from '../../../../core/models/city_options';
import { COUNTRY_OPTIONS } from '../../../../core/models/country_options';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentsService } from '../../services/get_student_service';
import { addStudentService } from '../../services/add_student_service';
import { getGradesService } from '../../services/get_grades_services';
import { getGendersService } from '../../services/get_genders_service';
import { modifyStudentService } from '../../services/modify_student_service';
import i18n from '../../../../../i18.';
import { getValue } from '../../../../core/storage/storage';
import arTranslations from '../../../../assets/translation/ar.json';
import enTranslations from '../../../../assets/translation/en.json';

const StudentDialog = ({ open, handleClose, student }) => {
        const [studentFirstName, setStudentFirstName] = useState('');
        const [studentLastName, setStudentLastName] = useState('');
        const [studentBirthDate, setStudentBirthDate] = useState('');
        const [studentEducationalLevel, setStudentEducationalLevel] = useState('');
        const [studentCountry, setStudentCountry] = useState('');
        const [studentCity, setStudentCity] = useState('');
        const [studentMobile, setStudentMobile] = useState('');
        const [studentGender, setStudentGender] = useState('');
        const [studentNote, setStudentNote] = useState('');
        const [errors, setErrors] = useState({});
        const [isEditing, setIsEditing] = useState(false);

        const dispatch = useDispatch();
        const { loading: addStudentLoading, error } = useSelector((state) => state.addStudentService);
        const { loading: modifyStudentLoading, modifyStudentError } = useSelector((state) => state.modifyStudentService);
        const { data: grades = [], loading: gradesLoading, error: gradesError } = useSelector((state) => state.getGradesService);
        const { data: gender = [], loading: genderLoading, error: genderError } = useSelector((state) => state.getGendersService);

        const language = getValue("lang") || 'en';
        const translations = language === 'ar' ? arTranslations : enTranslations;

        useEffect(() => {
                if (student) {
                        setStudentFirstName(student.firstName || '');
                        setStudentLastName(student.lastName || '');
                        setStudentBirthDate(student.birthDate || '');
                        setStudentEducationalLevel(student.grade?.id || '');
                        setStudentCountry(student.country || '');
                        setStudentCity(student.city || '');
                        setStudentMobile(student.phone || '');
                        setStudentGender(student.gender?.id || '');
                        setStudentNote(student.remarks || '');
                        setIsEditing(true);
                } else {
                        setIsEditing(false);
                }
        }, [student]);

        useEffect(() => {
                dispatch(getGradesService());
        }, [dispatch]);

        useEffect(() => {
                dispatch(getGendersService());
        }, [dispatch]);

        const handleAddStudent = async (e) => {
                e.preventDefault();

                let valid = true;
                let newErrors = {};

                if (!studentFirstName) {
                        newErrors.studentFirstName = t('validation.required', { field: t('first_name') });
                        valid = false;
                }
                if (!studentLastName) {
                        newErrors.studentLastName = t('validation.required', { field: t('last_name') });
                        valid = false;
                }
                if (!studentBirthDate) {
                        newErrors.studentBirthDate = t('validation.required', { field: t('birth_date') });
                        valid = false;
                }
                if (!studentCountry) {
                        newErrors.studentCountry = t('validation.required', { field: t('country') });
                        valid = false;
                }
                if (!studentCity) {
                        newErrors.studentCity = t('validation.required', { field: t('city') });
                        valid = false;
                }
                if (!studentEducationalLevel) {
                        newErrors.studentEducationalLevel = t('validation.required', { field: t('educational_level') });
                        valid = false;
                }
                if (!studentGender) {
                        newErrors.studentGender = t('validation.required', { field: t('gender') });
                        valid = false;
                }
                if (!studentMobile) {
                        newErrors.studentMobile = t('validation.required', { field: t('mobile') });
                        valid = false;
                }

                setErrors(newErrors);

                if (valid) {
                        try {
                                if (isEditing) {
                                        await dispatch(modifyStudentService({
                                                payload: {
                                                        id: student.id,
                                                        firstName: studentFirstName,
                                                        lastName: studentLastName,
                                                        birthDate: studentBirthDate,
                                                        grade: studentEducationalLevel,
                                                        gender: studentGender,
                                                        country: studentCountry,
                                                        city: studentCity,
                                                        phone: studentMobile,
                                                        remarks: studentNote
                                                }
                                        }));
                                } else {
                                        await dispatch(addStudentService({
                                                payload: {
                                                        firstName: studentFirstName,
                                                        lastName: studentLastName,
                                                        birthDate: studentBirthDate,
                                                        grade: studentEducationalLevel,
                                                        gender: studentGender,
                                                        country: studentCountry,
                                                        city: studentCity,
                                                        phone: studentMobile,
                                                        remarks: studentNote
                                                }
                                        }));
                                }

                                handleClose();
                                dispatch(getStudentsService());
                        } catch (err) {
                                console.error('Error saving student:', err.response ? err.response.data : err.message);
                        }
                }
        };

        const formatGrades = (grades) => {
                const cultureCode = language === 'ar' ? 1 : 0;
                return grades.map(grade => {
                        const translation = (grade.translations && Array.isArray(grade.translations))
                                ? grade.translations.find(t => t.cultureCode === cultureCode)
                                : null;

                        return {
                                value: grade.id,
                                label: translation ? translation.name : 'Unknown'
                        };
                });
        };

        const formatGenders = (genders) => {
                const cultureCode = language === 'ar' ? 1 : 0;
                return genders.map(gender => {
                        const translation = (gender.translations && Array.isArray(gender.translations))
                                ? gender.translations.find(t => t.cultureCode === cultureCode)
                                : null;

                        return {
                                value: gender.id,
                                label: translation ? translation.name : 'Unknown'
                        };
                });
        };

        return (
                <Dialog
                        open={open}
                        onClose={handleClose}
                        maxWidth="md"
                        fullWidth
                        sx={{
                                '& .MuiDialog-paper': {
                                        width: '80%',
                                        maxWidth: '800px',
                                }
                        }}
                >
                        <DialogTitle sx={{ fontSize: '30px', fontWeight: 600 }}>
                                {isEditing ? translations.edit_student : translations.add_student}
                        </DialogTitle>
                        <MDBox sx={{ px: 2 }}>
                                <MDBox sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <MDBox sx={{ mx: 1, width: '50%' }}>
                                                <MDTextField
                                                        margin={'1rem 0'}
                                                        isFulWidth={true}
                                                        label={translations.first_name}
                                                        labelColor={colors.black.main}
                                                        error={errors.studentFirstName}
                                                        value={studentFirstName}
                                                        onChange={(e) => setStudentFirstName(e.target.value)}
                                                />
                                        </MDBox>
                                        <MDBox sx={{ mx: 1, width: '50%' }}>
                                                <MDTextField
                                                        margin={'1rem 0'}
                                                        isFulWidth={true}
                                                        label={translations.last_name}
                                                        labelColor={colors.black.main}
                                                        error={errors.studentLastName}
                                                        value={studentLastName}
                                                        onChange={(e) => setStudentLastName(e.target.value)}
                                                />
                                        </MDBox>
                                </MDBox>
                                <MDBox sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                        <MDBox sx={{ mx: 1, width: '50%' }}>
                                                <MDTextField
                                                        margin={'1rem 0'}
                                                        isFulWidth={true}
                                                        label={translations.birth_date}
                                                        labelColor={colors.black.main}
                                                        type="date"
                                                        error={errors.studentBirthDate}
                                                        value={studentBirthDate}
                                                        onChange={(e) => setStudentBirthDate(e.target.value)}
                                                />
                                        </MDBox>
                                        <MDBox sx={{ mx: 1, width: '50%' }}>
                                                <MDDropDownField
                                                        isFulWidth={true}
                                                        margin={'1rem 0'}
                                                        isFullWidth={true}
                                                        label={translations.educational_level}
                                                        labelColor={colors.black.main}
                                                        error={errors.studentEducationalLevel}
                                                        value={studentEducationalLevel}
                                                        onChange={(e) => setStudentEducationalLevel(e.target.value)}
                                                        options={gradesLoading ? [] : formatGrades(grades)}
                                                />
                                        </MDBox>
                                </MDBox>
                                <MDBox sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                        <MDBox sx={{ mx: 1, width: '50%' }}>
                                                <MDDropDownField
                                                        isFulWidth={true}
                                                        margin={'1.1rem 0'}
                                                        isFullWidth={true}
                                                        label={translations.country}
                                                        labelColor={colors.black.main}
                                                        error={errors.studentCountry}
                                                        value={studentCountry}
                                                        onChange={(e) => setStudentCountry(e.target.value)}
                                                        options={COUNTRY_OPTIONS}
                                                />
                                        </MDBox>
                                        <MDBox sx={{ mx: 1, width: '50%' }}>
                                                <MDDropDownField
                                                        isFulWidth={true}
                                                        margin={'1.1rem 0'}
                                                        isFullWidth={true}
                                                        label={translations.city}
                                                        labelColor={colors.black.main}
                                                        error={errors.studentCity}
                                                        value={studentCity}
                                                        onChange={(e) => setStudentCity(e.target.value)}
                                                        options={CITY_OPTIONS}
                                                />
                                        </MDBox>
                                </MDBox>
                                <MDBox sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                        <MDBox sx={{ mx: 1, width: '50%' }}>
                                                <MDTextField
                                                        type={"number"}
                                                        margin={'1rem 0'}
                                                        isFulWidth={true}
                                                        label={translations.mobile}
                                                        labelColor={colors.black.main}
                                                        error={errors.studentMobile}
                                                        value={studentMobile}
                                                        onChange={(e) => setStudentMobile(e.target.value)}
                                                />
                                        </MDBox>
                                        <MDBox sx={{ mx: 1, width: '50%' }}>
                                                <MDDropDownField
                                                        isFulWidth={true}
                                                        margin={'1rem 0'}
                                                        isFullWidth={true}
                                                        label={translations.gender}
                                                        labelColor={colors.black.main}
                                                        error={errors.studentGender}
                                                        value={studentGender}
                                                        onChange={(e) => setStudentGender(e.target.value)}
                                                        options={genderLoading ? [] : formatGenders(gender)}
                                                />
                                        </MDBox>
                                </MDBox>
                                <MDBox sx={{ mx: 1 }}>
                                        <MDTextField
                                                margin={'1rem 0'}
                                                isFulWidth={true}
                                                label={translations.note}
                                                labelColor={colors.black.main}
                                                error={errors.studentNote}
                                                value={studentNote}
                                                onChange={(e) => setStudentNote(e.target.value)}
                                        />
                                </MDBox>
                        </MDBox>
                        <DialogActions sx={{ my: 1.5, mx: 2, mb: 3 }}>
                                <PrimaryButton
                                        width={"100%"}
                                        hPadding={1}
                                        wPadding={1}
                                        title={isEditing ? translations.modify : translations.add_student}
                                        borderColor={colors.primary.state}
                                        backgroundColor={colors.primary.state}
                                        colorTitle={colors.white.main}
                                        isLoading={addStudentLoading || modifyStudentLoading}
                                        onClick={handleAddStudent}
                                />
                                <MDBox sx={{ px: 0.3 }} />
                                <PrimaryButton
                                        width={"100%"}
                                        hPadding={1}
                                        wPadding={1}
                                        title={translations.cancel}
                                        borderColor={colors.primary.state}
                                        backgroundColor={colors.transparent.main}
                                        colorTitle={colors.primary.state}
                                        onClick={handleClose}
                                />
                        </DialogActions>
                </Dialog>
        );
};

export default StudentDialog;
