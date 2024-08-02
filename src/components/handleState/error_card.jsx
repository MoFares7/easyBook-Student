import Lottie from 'lottie-react'
import React from 'react'
import error from '../../assets/lottie/error.json';
import MDTypography from '../../items/MDTypography';
import typography from './../../assets/theme/base/typography';
import MDBox from '../../items/MDBox/MDBox';

const ErrorCard = () => {
        return (
                <MDBox sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center', alignItems: 'center', justifyContent: 'cetner'
                }}>
                        <Lottie animationData={error} autoplay loop style={{ alignItems: 'center', width: 200, height: 200 }} />
                        <MDTypography typography={typography.body2} sx={{ textAlign: 'center' }}>Error occurred, Please retry again</MDTypography>
                </MDBox>
                
        )
}

export default ErrorCard
