import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { Box, IconButton, Select, MenuItem } from '@mui/material';
import colors from '../../assets/theme/base/colors';
import rgba from '../../assets/theme/functions/rgba';
import male from '../../assets/icons/male.png';
import female from '../../assets/icons/female.png';
import c_orange from '../../assets/icons/c_orange.png';
import c_blue from '../../assets/icons/c_blue.png';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import MDTypography from '../../items/MDTypography';
import typography from './../../assets/theme/base/typography';
import borders from './../../assets/theme/base/borders';
import StudentDialog from '../../layouts/student_management/presentation/components/student_dialog';
import MainDialog from '../Dialogs/main_dialog';
import removeIcon from '../../assets/icons/info-circle.png';
import { useDispatch, useSelector } from 'react-redux';
import { removeStudentService } from '../../layouts/student_management/services/remove_student_service';
import { getStudentsService } from '../../layouts/student_management/services/get_student_service';
import MDBox from '../../items/MDBox/MDBox';
import LoaderCard from '../handleState/loader_card';
import ErrorCard from '../handleState/error_card';
import EmptyCard from '../handleState/empty_card';
import enTranslations from '../../assets/translation/en.json';
import arTranslations from '../../assets/translation/ar.json';
import { useTranslation } from 'react-i18next';
import { getValue } from '../../core/storage/storage';
import MDDropDownField from '../../items/MDDropDown';

const StyledTable = styled(Table)({
        borderCollapse: 'collapse',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
        border: 'none',
        [`&.${tableCellClasses.head}`]: {
                backgroundColor: colors.primary.state,
                color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
        },
}));

const StyledTableRow = styled(TableRow)(({ isEven }) => ({
        backgroundColor: isEven ? 'white' : rgba(colors.primary.main, 0.08),
        '& td, & th': {
                border: 'none',
        },
}));

function createData(firstName, lastName, birthDate, educationLevel, gender, country, city, mobileNumber, note, action) {
        return { firstName, lastName, birthDate, educationLevel, gender, country, city, mobileNumber, note, action };
}

const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
};

export default function StudentsTable({ students, loading, error, onDelete }) {
        const dispatch = useDispatch();
        const { t, i18n } = useTranslation();
        const [page, setPage] = useState(1);
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const [selectedStudent, setSelectedStudent] = useState(null);
        const [dialogOpen, setDialogOpen] = useState(false);
        const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
        const { loading: deleteLoading } = useSelector(state => state.removeStudentService);
        const isRtl = i18n.language === 'ar';

        useEffect(() => {
                dispatch(getStudentsService());
        }, [dispatch]);

        const handleChangePage = (event, value) => {
                setPage(value);
        };

        const handleChangeRowsPerPage = (event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(1);
        };

        const handleEditClick = (student) => {
                setSelectedStudent(student);
                setDialogOpen(true);
        };

        const handleDeleteClick = (student) => {
                setSelectedStudent(student);
                setDeleteDialogOpen(true);
        };

        const handleCloseDialog = () => {
                setDialogOpen(false);
                setSelectedStudent(null);
        };

        const handleCloseDeleteDialog = () => {
                setDeleteDialogOpen(false);
                setSelectedStudent(null);
        };

        const handleDeleteConfirm = () => {
                if (selectedStudent && selectedStudent.id) {
                        dispatch(removeStudentService({ Id: selectedStudent.id }))
                                .then(() => {
                                        onDelete(selectedStudent.id);
                                        dispatch(getStudentsService());
                                        handleCloseDeleteDialog();
                                })
                                .catch(error => {
                                        console.error('Failed to delete student:', error);
                                });
                }
        };

        if (loading) {
                return <LoaderCard />;
        }

        if (error) {
                return <ErrorCard />;
        }

        if (!students || students.length === 0) {
                return <EmptyCard />;
        }

        const language = getValue("lang") || 'en';
        const translations = language === 'ar' ? arTranslations : enTranslations;

        const rows = students.map(student => {
                const gradeTranslation = student.grade?.translations.find(t => t.cultureCode === (language === 'ar' ? 1 : 0))?.name ?? 'Not Found';
                const genderTranslation = student.gender?.translations.find(t => t.cultureCode === (language === 'ar' ? 1 : 0))?.name ?? 'Not Found';

                return createData(
                        student.firstName,
                        student.lastName,
                        formatDate(student.birthDate),
                        gradeTranslation,
                        genderTranslation,
                        student.country,
                        student.city,
                        student.phone,
                        student.remarks,
                        student
                );
        });

        const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

        return (
                <MDBox>
                        <TableContainer>
                                <StyledTable sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                                <StyledTableRow>
                                                        <StyledTableCell
                                                                sx={theme => ({
                                                                        borderTopRightRadius: getValue('lang') === 'ar' ? borders.borderRadius.lg : 0,
                                                                        borderBottomRightRadius: getValue('lang') === 'ar' ? borders.borderRadius.lg : 0,
                                                                        borderTopLeftRadius: getValue('lang') !== 'ar' ? borders.borderRadius.lg : 0,
                                                                        borderBottomLeftRadius: getValue('lang') !== 'ar' ? borders.borderRadius.lg : 0,
                                                                })}
                                                        >
                                                                {translations.table.firstName}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                                {translations.table.lastName}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                                {translations.table.birthDate}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                                {translations.table.educationLevel}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                                {translations.table.gender}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                                {translations.table.country}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                                {translations.table.city}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                                {translations.table.mobileNumber}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                                {translations.table.notes}
                                                        </StyledTableCell>
                                                        <StyledTableCell
                                                                sx={theme => ({
                                                                        borderTopLeftRadius: getValue('lang') === 'ar' ? borders.borderRadius.lg : 0,
                                                                        borderBottomLeftRadius: getValue('lang') === 'ar' ? borders.borderRadius.lg : 0,
                                                                        borderTopRightRadius: getValue('lang') !== 'ar' ? borders.borderRadius.lg : 0,
                                                                        borderBottomRightRadius: getValue('lang') !== 'ar' ? borders.borderRadius.lg : 0,
                                                                })} align="center">
                                                                {translations.table.actions}
                                                        </StyledTableCell>
                                                </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                                {paginatedRows.map((row, index) => (
                                                        <StyledTableRow key={row.firstName + row.lastName} isEven={index % 2 === 0}>
                                                                <StyledTableCell component="th" scope="row">{row.firstName}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.birthDate}</StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                                <img src={row.educationLevel === 'Grade 1' ? c_orange : c_blue} alt={row.educationLevel} style={{ width: 9, height: 9 }} />
                                                                                <span>{row.educationLevel}</span>
                                                                        </Box>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                        <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                                <img src={row.gender === 'Male' ? male : female} alt={row.gender} style={{ width: 15, height: 20 }} />
                                                                                <span>{row.gender}</span>
                                                                        </Box>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">{row.country}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.city}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.mobileNumber}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.note}</StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                        <IconButton color="primary" onClick={() => handleEditClick(row.action)}>
                                                                                <img src={editIcon} alt="Edit" style={{ width: 25, height: 25 }} />
                                                                        </IconButton>
                                                                        <IconButton color="secondary" onClick={() => handleDeleteClick(row.action)}>
                                                                                <img src={deleteIcon} alt="Delete" style={{ width: 25, height: 25 }} />
                                                                        </IconButton>
                                                                </StyledTableCell>
                                                        </StyledTableRow>
                                                ))}
                                        </TableBody>
                                </StyledTable>
                        </TableContainer>

                        <MDBox sx={{
                                mt: 2, display: {
                                        xs: 'block',
                                        sm: 'flex',
                                        xl: 'flex'
                                }, justifyContent: 'space-between', alignItems: 'center'
                        }}>
                                <MDBox sx={{
                                        display: 'flex', alignItems: 'center', px: 1, width: {
                                                xs: "100%",
                                                md: "20%"
                                        }
                                }}>
                                        <MDTypography typography={typography.caption} color={colors.secondary.focus}>
                                                {translations.pagination.rowsPerPage}
                                        </MDTypography>
                                        <MDDropDownField
                                                margin={1}
                                                backgroundColor={colors.white.main}
                                                isFulWidth={false}
                                                width={{
                                                        xs: "70%",
                                                        md: "40%",
                                                        xs: '30%'
                                                }}
                                                value={rowsPerPage}
                                                onChange={handleChangeRowsPerPage}
                                                options={[
                                                        { value: 5, label: '5' },
                                                        { value: 10, label: '10' },
                                                        { value: 15, label: '15' },
                                                        { value: 20, label: '20' },
                                                        { value: 25, label: '25' },
                                                ]}
                                        />
                                </MDBox>
                                <Pagination
                                        count={Math.ceil(rows.length / rowsPerPage)}
                                        page={page}
                                        onChange={handleChangePage}
                                        shape="rounded"
                                        color="primary"
                                        sx={{
                                                direction: isRtl ? 'rtl' : 'ltr',
                                                '& .MuiPaginationItem-previousNext': {
                                                        transform: isRtl ? 'rotate(180deg)' : 'none',
                                                }
                                        }}
                                />
                        </MDBox>

                        {
                                selectedStudent && (
                                        <StudentDialog
                                                open={dialogOpen}
                                                handleClose={handleCloseDialog}
                                                student={selectedStudent}
                                                title={translations.dialogs.editTitle}
                                        />
                                )
                        }

                        {
                                selectedStudent && (
                                        <MainDialog
                                                open={deleteDialogOpen}
                                                handleClose={handleCloseDeleteDialog}
                                                handleOperationService={handleDeleteConfirm}
                                                isLoading={deleteLoading}
                                                initialColor={colors.error.main}
                                                headerIcon={removeIcon}
                                                headerTitle={translations.dialogs.deleteTitle}
                                                subTitle={translations.dialogs.deleteSubtitle}
                                                noteTitle={translations.dialogs.deleteNoteTitle}
                                                titleButtonOperation={translations.dialogs.deleteButton}
                                                titleButtonCancel={translations.cancel}
                                        />
                                )
                        }
                </MDBox >
        );
}
