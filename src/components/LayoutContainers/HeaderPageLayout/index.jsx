import React from 'react'
import MDBox from '../../../items/MDBox/MDBox'
import typography from '../../../assets/theme/base/typography'
import colors from '../../../assets/theme/base/colors'
import MDTypography from '../../../items/MDTypography'
import DropdownSelectOption from '../../../layouts/manager/feature/branchs/presentitons/components/drop_down_options'
import Lottie from 'lottie-react'
import aq from '../../../layouts/manager/assets/lottie/q&a.json';
import search from '../../../assets/lottie/search.json'

const HeaderLayout = ({ title, isFilter, subTitle, options, placeholder, value, onChange }) => {
        return (
                <MDBox sx={{
                        backgroundColor: colors.gradients.info.state,
                        width: '100%',
                        borderRadius: 2,
                        p: 2
                }}>
                        <MDBox sx={{
                                display: {
                                        xs: 'block',
                                        md: 'flex',
                                        xl: 'flex'
                                },
                                alignItems:'center',
                                justifyContent: 'space-between'
                        }}>
                                <MDBox >
                                        <MDTypography typography={typography.h5} sx={{ color: colors.white.main }}>
                                                {title}
                                        </MDTypography>
                                        <MDTypography typography={typography.body2} sx={{ color: colors.white.main }}>
                                                {subTitle}
                                        </MDTypography>
                                </MDBox>
                                {isFilter ? <MDBox sx={{
                                        backgroundColor: colors.white.main,
                                        borderRadius: 2,
                                        px: 1,
                                        justifyContent: 'center'

                                }}>
                                        <DropdownSelectOption
                                                value={value}
                                                options={options}
                                                placeholder={placeholder}
                                                label={placeholder}
                                                onChange={onChange}
                                        />
                                </MDBox>
                                        :
                                        <MDBox>
                                                {isFilter ?
                                                        <Lottie animationData={aq} autoplay loop style={{ alignItems: 'center', width: 90, height: 90 }} />
                                                        :
                                                        <Lottie animationData={search} autoplay loop style={{ alignItems: 'center', width: 90, height: 90 }} />
                                                }
                                        </MDBox>
                                }
                        </MDBox>

                </MDBox>
        )
}

export default HeaderLayout
