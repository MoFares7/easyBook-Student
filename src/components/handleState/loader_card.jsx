import Lottie from 'lottie-react'
import React from 'react'
import loader from '../../assets/lotties/loader.json';
import MDBox from '../../items/MDBox/MDBox';

const LoaderCard = () => {

        return (
                <MDBox sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center', alignItems: 'center', justifyContent: 'cetner'
                }}>
                        <Lottie animationData={loader} autoplay loop style={{ alignItems: 'center', width: 200, height: 200 }} />
                </MDBox>
        )
}

export default LoaderCard
