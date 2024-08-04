import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from './../../../../components/LayoutContainers/DashboardLayout/index';
import DashboardNavbar from './../../../../components/Navbars/DashboardNavbar/index';
import StudentDialog from '../components/student_dialog';
import { getStudentsService } from '../../services/get_student_service';
import debounce from 'lodash.debounce';
import StudentDataCard from '../components/student_data_card';

const StudentsPage = () => {
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
                console.log('Date filter set to:', event.target.value);
        };

        const handleFilterTypeChange = (newFilterType) => {
                setFilterType(newFilterType);
                console.log('Filter type set to:', newFilterType);
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
                                filterDate.setHours(0, 0, 0, 0);

                                if (isNaN(filterDate.getTime())) {
                                        console.error("Invalid filter date:", dateFilter);
                                        return;
                                }

                                filtered = filtered.filter(student => {
                                        const studentDate = new Date(student.birthDate);
                                        studentDate.setHours(0, 0, 0, 0);

                                        if (isNaN(studentDate.getTime())) {
                                                console.error("Invalid student birth date:", student.birthDate);
                                                return false;
                                        }

                                        console.log('Filtering student:', student.firstName, student.birthDate);
                                        console.log('Filter date:', filterDate);
                                        console.log('Student date:', studentDate);

                                        switch (filterType) {
                                                case 'Equal to':
                                                        return studentDate.getTime() === filterDate.getTime();
                                                case 'Greater than':
                                                        return studentDate < filterDate;
                                                case 'Less than':
                                                        return studentDate > filterDate;
                                                default:
                                                        return true;
                                        }
                                });
                        }

                        console.log('Filtered students:', filtered);

                        setFilteredStudents(filtered);
                }
        }, [students, searchTerm, dateFilter, filterType]);

        const noMatchesFound = filteredStudents.length === 0;

        return (
                <DashboardLayout>
                        <DashboardNavbar />

                        <StudentDataCard
                                handleClickOpen={handleClickOpen}
                                handleSearchChange={handleSearchChange}
                                handleDateChange={handleDateChange}
                                formatDate={formatDate}
                                dateFilter={dateFilter}
                                filterType={filterType}
                                setFilterType={handleFilterTypeChange}
                                filteredStudents={filteredStudents}
                                students={students}
                                loading={loading}
                                error={error}
                                handleOpenRemoveDialog={handleOpenRemoveDialog}
                                noMatchesFound={noMatchesFound}
                        />

                        <StudentDialog
                                open={open}
                                handleClose={handleClose}
                        />
                </DashboardLayout>
        );
};

export default StudentsPage;
