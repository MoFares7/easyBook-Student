import Lottie from 'lottie-react'
import React from 'react'
import empty from '../../assets/lottie/empty.json';
import MDTypography from '../../items/MDTypography';
import typography from './../../assets/theme/base/typography';
import MDBox from '../../items/MDBox/MDBox';

const EmptyCard = ({message}) => {

        return (
                <MDBox sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center', alignItems: 'center', justifyContent: 'cetner'
                }}>
                        <Lottie animationData={empty} autoplay loop style={{ alignItems: 'center', width: 250, height: 250 }} />
                        <MDTypography typography={typography.body2} sx={{ textAlign: 'center' }}>{message}</MDTypography>
                </MDBox>
        )
}

export default EmptyCard
