import React from 'react';
import DashboardLayout from './../../../../components/LayoutContainers/DashboardLayout/index';
import DashboardNavbar from './../../../../components/Navbars/DashboardNavbar/index';
import { Box, Divider, Icon } from '@mui/material';
import borders from '../../../../assets/theme/base/borders';
import colors from '../../../../assets/theme/base/colors';
import MDTypography from '../../../../items/MDTypography';
import typography from './../../../../assets/theme/base/typography';
import { AddOutlined } from '@mui/icons-material';
import PrimaryButton from '../../../../items/MDButton';
import StudentsTable from '../../../../components/Tables/StudentsTable';
import MDTextField from '../../../../items/MDTextField';
import filter from '../../../../assets/icons/Filter.svg'
import { getValue } from '../../../../core/storage/storage';

const StudentsPage = () => {
        const [dateFilter, setDateFilter] = React.useState('');

        const handleDateChange = (event) => {
                setDateFilter(event.target.value);
        };

        console.log(getValue('token'))
        return (
                <DashboardLayout>
                        <DashboardNavbar />
                        <Box sx={{
                                p: 1,
                                m: 3,
                                borderRadius: borders.borderRadius.lg,
                                backgroundColor: colors.white.main
                        }}>
                                {/* //! row add and title */}
                                <Box sx={{
                                        display: 'flex',
                                        p: 1,
                                        justifyContent: 'space-between'
                                }}>
                                        <MDTypography typography={typography.body1}>Student's Data</MDTypography>
                                        <PrimaryButton
                                                title={" Add Student"}
                                                backgroundColor={colors.primary.state}
                                                colorTitle={colors.white.main}
                                                hPadding={0.5}
                                                wPadding={1}
                                                icon={<AddOutlined />}
                                        />
                                </Box>
                                {/* //! row filter */}
                                <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mx: 1
                                }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Icon>
                                                        <img src={filter} alt="Filter" style={{ width: 25, height: 25 }} />
                                                </Icon>
                                                <MDTypography typography={typography.body2} sx={{ color: colors.primary.state }}>Filter by:</MDTypography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                {/* Search Text Field */}
                                                <MDTextField
                                                        isFulWidth={false}
                                                        hintText={"Search by first name, last name"}
                                                        height={'3%'}
                                                />
                                                {/* Date Filter */}
                                                <MDTextField
                                                        isFulWidth={false}
                                                        value={dateFilter}
                                                        onChange={handleDateChange}
                                                        type="date"
                                                />
                                        </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box>
                                        <StudentsTable />
                                </Box>
                        </Box>
                </DashboardLayout>
        );
}

export default StudentsPage;
