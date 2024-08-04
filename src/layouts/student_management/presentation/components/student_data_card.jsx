import React from 'react';
import { Divider, Icon } from '@mui/material';
import MDBox from '../../../../items/MDBox/MDBox';
import MDTypography from '../../../../items/MDTypography';
import typography from './../../../../assets/theme/base/typography';
import PrimaryButton from '../../../../items/MDButton';
import MDTextField from '../../../../items/MDTextField';
import MDDateField from '../../../../items/MDTextField/date_field';
import { AddOutlined, Search } from '@mui/icons-material';
import colors from '../../../../assets/theme/base/colors';
import filter from '../../../../assets/icons/Filter.svg';
import StudentsTable from './../../../../components/Tables/StudentsTable';
import borders from '../../../../assets/theme/base/borders';
import AnimatedCard from './../../../../utils/animation';

const StudentDataCard = ({
        t,
        handleClickOpen,
        handleSearchChange,
        handleDateChange,
        formatDate,
        dateFilter,
        filterType,
        setFilterType,
        filteredStudents,
        students,
        loading,
        error,
        handleOpenRemoveDialog
}) => {
        return (
                <AnimatedCard animationType='slideInLeft'>
                        <MDBox sx={{
                                p: 3,
                                m: 3,
                                borderRadius: borders.borderRadius.lg,
                                backgroundColor: colors.white.main
                        }}>
                                <MDBox sx={{
                                        display: 'flex',
                                        p: 1,
                                        justifyContent: 'space-between'
                                }}>
                                        <MDTypography typography={typography.body1} sx={{ color: colors.black.focus }}>{t('studentData')}</MDTypography>
                                        <PrimaryButton
                                                title={t("addStudent")}
                                                backgroundColor={colors.primary.state}
                                                colorTitle={colors.white.main}
                                                hPadding={0}
                                                wPadding={2}
                                                onClick={handleClickOpen}
                                                icon={<AddOutlined />}
                                        />
                                </MDBox>

                                <MDBox sx={{
                                        display: {
                                                xs: 'block',
                                                md: 'flex',
                                                xl: 'flex',
                                        },
                                        alignItems: 'center',
                                        mx: 1
                                }}>
                                        <MDBox sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Icon>
                                                        <img src={filter} alt="Filter" style={{ width: 25, height: 25 }} />
                                                </Icon>
                                                <MDTypography typography={typography.body2} sx={{ color: colors.primary.state }}>{t('filterBy')}</MDTypography>
                                        </MDBox>
                                        <MDBox sx={{
                                                display: {
                                                        xs: 'block',
                                                        md: 'flex',
                                                        xl: 'flex',
                                                }, alignItems: 'center', gap: 2
                                        }}>
                                                <MDTextField
                                                        isFulWidth={true}
                                                        hintText={t("searchHint")}
                                                        height={'3%'}
                                                        onChange={handleSearchChange}
                                                        icon={<Search />}
                                                />
                                                <MDDateField
                                                        isFulWidth
                                                        value={formatDate(dateFilter)}
                                                        onChange={handleDateChange}
                                                        hintText={t("chooseHint")}
                                                        menuOptions={[t('none'), t('equalTo'), t('greaterThan'), t('lessThan')]}
                                                        onMenuOptionClick={setFilterType}
                                                        filterType={filterType}
                                                        error={false}
                                                />
                                        </MDBox>
                                </MDBox>

                                <Divider sx={{ my: 2 }} />

                                <MDBox>
                                                <StudentsTable
                                                        students={filteredStudents.length ? filteredStudents : students}
                                                        loading={loading}
                                                        error={error}
                                                        onDelete={handleOpenRemoveDialog}
                                                />
                                </MDBox>
                        </MDBox>
                </AnimatedCard>
        );
};

export default StudentDataCard;
