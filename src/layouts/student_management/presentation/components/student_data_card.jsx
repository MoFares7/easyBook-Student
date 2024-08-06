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
import { getValue } from '../../../../core/storage/storage';
import arTranslations from '../../../../assets/translation/ar.json';
import enTranslations from '../../../../assets/translation/en.json';
import EmptyCard from '../../../../components/handleState/empty_card';
import LoaderCard from '../../../../components/handleState/loader_card';

const StudentDataCard = ({
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
        handleOpenRemoveDialog,
        noMatchesFound
}) => {

        const language = getValue("lang") || 'en';
        const translations = language === 'ar' ? arTranslations : enTranslations;

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
                                        <MDTypography typography={typography.body1} sx={{ color: colors.black.focus }}>{translations.studentData}</MDTypography>
                                        <PrimaryButton
                                                title={translations.addStudent}
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
                                                <MDTypography typography={typography.body2} sx={{ color: colors.primary.state }}>{translations.filterBy}</MDTypography>
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
                                                        hintText={translations.searchHint}
                                                        height={'3%'}
                                                        onChange={handleSearchChange}
                                                        icon={<Search />}
                                                />
                                                <MDDateField
                                                        isFulWidth
                                                        value={formatDate(dateFilter)}
                                                        onChange={handleDateChange}
                                                        hintText={translations.chooseHint}
                                                        menuOptions={[translations.none, translations.equalTo, translations.greaterThan, translations.lessThan]}
                                                        onMenuOptionClick={setFilterType}
                                                        filterType={filterType}
                                                        error={false}
                                                />
                                        </MDBox>
                                </MDBox>

                                <Divider sx={{ my: 2 }} />

                                <MDBox>
                                        {noMatchesFound ? (
                                                <EmptyCard message={translations.NotFoundanyResult} />
                                        ) : loading ? (
                                                <LoaderCard />
                                        ) : (
                                                <StudentsTable students={filteredStudents} handleOpenRemoveDialog={handleOpenRemoveDialog} />
                                        )}
                                </MDBox>

                        </MDBox>
                </AnimatedCard>
        );
};

export default StudentDataCard;
