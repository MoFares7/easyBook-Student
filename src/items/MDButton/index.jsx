import { Box, Button, Icon } from '@mui/material'
import React from 'react'
import borders from '../../assets/theme/base/borders'
import typography from '../../assets/theme/base/typography'
import colors from '../../assets/theme/base/colors'
import MDTypography from '../MDTypography'

const PrimaryButton = ({ hPadding, wPadding, title, borderColor, backgroundColor,colorTitle, icon, onClick }) => {
        return (
                <Button
                        onClick={onClick}
                >
                        <Box
                                sx={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        py: hPadding,
                                        px: wPadding,
                                        backgroundColor: backgroundColor,
                                        borderRadius: borders.borderRadius.lg
                                }}
                        >
                                <MDTypography p={0.5} typography={typography.button} sx={{ color:  colorTitle}}>
                                        {title}
                                </MDTypography>
                                <Icon sx={{ color: colors.white.main }}>
                                        {icon}
                                </Icon>
                        </Box>
                      
                </Button>
        )
}

export default PrimaryButton
