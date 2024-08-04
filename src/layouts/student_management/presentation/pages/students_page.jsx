import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DashboardLayout from './../../../../components/LayoutContainers/DashboardLayout/index';
import DashboardNavbar from './../../../../components/Navbars/DashboardNavbar/index';
import StudentDialog from '../components/student_dialog';
import { getStudentsService } from '../../services/get_student_service';
import debounce from 'lodash.debounce';
import StudentDataCard from '../components/student_data_card';
import { removeValue } from '../../../../core/storage/storage';

const StudentsPage = () => {
        const { t } = useTranslation();
        const dispatch = useDispatch();
        const [dateFilter, setDateFilter] = useState('');
        const [filterType, setFilterType] = useState('None');
        const [searchTerm, setSearchTerm] = useState('');
        const [open, setOpen] = useState(false);
        const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
        const [selectedStudent, setSelectedStudent] = useState(null);
        const [filteredStudents, setFilteredStudents] = useState([]);

        const studentsState = useSelector((state) => state.getStudentsService);
        const { data: students, loading, error } = studentsState;

        // removeValue('lang')
        useEffect(() => {
                dispatch(getStudentsService());
        }, [dispatch]);

        const handleSearch = useCallback(
                debounce((query) => {
                        if (students) {
                                const lowercasedQuery = query.toLowerCase();
                                const filtered = students.filter(student =>
                                        student.firstName.toLowerCase().includes(lowercasedQuery) ||
                                        student.lastName.toLowerCase().includes(lowercasedQuery)
                                );
                                setFilteredStudents(filtered);
                        }
                }, 2000),
                [students]
        );

        const handleSearchChange = (event) => {
                const { value } = event.target;
                setSearchTerm(value);
                handleSearch(value);
        };

        const handleDateChange = (event) => {
                setDateFilter(event.target.value);
        };

        const handleClickOpen = () => {
                setOpen(true);
        };

        const handleClose = () => {
                setOpen(false);
        };

        const handleOpenRemoveDialog = (student) => {
                setSelectedStudent(student);
                setRemoveDialogOpen(true);
        };

        const formatDate = (date) => {
                if (!date) return '';
                const d = new Date(date);
                if (isNaN(d.getTime())) return '';
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
        };

        useEffect(() => {
                if (students) {
                        let filtered = students;

                        if (searchTerm) {
                                const lowercasedQuery = searchTerm.toLowerCase();
                                filtered = filtered.filter(student =>
                                        student.firstName.toLowerCase().includes(lowercasedQuery) ||
                                        student.lastName.toLowerCase().includes(lowercasedQuery)
                                );
                        }

                        if (dateFilter && filterType !== 'None') {
                                const filterDate = new Date(dateFilter);
                                filtered = filtered.filter(student => {
                                        const studentDate = new Date(student.birthDate);

                                        switch (filterType) {
                                                case 'Equal to':
                                                        return studentDate.toDateString() === filterDate.toDateString();
                                                case 'Greater than':
                                                        return studentDate > filterDate;
                                                case 'Less than':
                                                        return studentDate < filterDate;
                                                default:
                                                        return true;
                                        }
                                });
                        }

                        setFilteredStudents(filtered);
                }
        }, [students, searchTerm, dateFilter, filterType]);

        return (
                <DashboardLayout>
                        <DashboardNavbar />

                        <StudentDataCard
                                t={t}
                                handleClickOpen={handleClickOpen}
                                handleSearchChange={handleSearchChange}
                                handleDateChange={handleDateChange}
                                formatDate={formatDate}
                                dateFilter={dateFilter}
                                filterType={filterType}
                                setFilterType={setFilterType}
                                filteredStudents={filteredStudents}
                                students={students}
                                loading={loading}
                                error={error}
                                handleOpenRemoveDialog={handleOpenRemoveDialog}
                        />

                        <StudentDialog
                                open={open}
                                handleClose={handleClose}
                        />
                </DashboardLayout>
        );
};

export default StudentsPage;
