import React from 'react';
import { Box, Divider } from '@mui/material';
import { CardTravelOutlined, ReduceCapacityOutlined, TypeSpecimenOutlined, NumbersOutlined, LocationOnOutlined, SourceOutlined, ContrastOutlined, MoveToInboxOutlined } from '@mui/icons-material';
import MDBox from '../../../items/MDBox/MDBox';
import colors from '../../../assets/theme/base/colors';
import MDTypography from '../../../items/MDTypography';
import MainButton from '../../Items/MainButton/main_button';
import borders from '../../../assets/theme/base/borders';


const ShipmentCard = ({
        isSearch,
        shipmentId,
        isLoading,
        shipmentCapacity,
        shipmenthName,
        shipmentStatus,
        shipmentIdentifier,
        shipmentCategoryType,
        shipmentSenderBranchName,
        shipmentReceiverBranchName,
        movedCapacity,
        colorShipmentState,
        titleButtonAction,
        backgroundColorButtonAction,
        hoverBackgroundColorButtonAction,
        onClickButtonAction
}) => {
        return (
                <MDBox
                        sx={{
                                transition: 'transform 0.4s ease',
                                '&:hover': {
                                        transform: 'scale(0.98)',
                                },
                                borderRadius: 2,
                                border: `1px solid ${colors.grey[300]}`,
                                width: '100%',
                        }}
                >
                        <MDBox display="block" alignItems="center" color="black" borderRadius={borders.borderRadius.lg} bgColor={colors.white.main}>
                                <MDBox p={1} display="flex" pb={0.1} justifyContent='space-between'>
                                        <MDBox display="flex">
                                                <CardTravelOutlined sx={{ color: colors.gradients.dark.main }} />
                                                <MDTypography fontWeight="light" color="red" fontSize={'15px'} px={1}>Shipment Name</MDTypography>
                                        </MDBox>
                                        <MDBox sx={{
                                                p: 0.4,
                                                border: `1px solid ${colorShipmentState}`,
                                                borderRadius: borders.borderRadius.md
                                        }}>
                                                <MDTypography fontWeight="light" fontSize={'15px'} px={1} sx={{ color: colorShipmentState }}>{shipmentStatus}</MDTypography>
                                        </MDBox>
                                </MDBox>
                                <MDBox px={1} display="flex" pb={0.1} justifyContent='space-between'>
                                        <MDTypography fontWeight="light" color="black" fontSize={'15px'} px={1}>{shipmenthName}</MDTypography>
                                </MDBox>
                                <Divider sx={{ backgroundColor: colors.grey[500] }} />

                                <MDBox px={1} display="flex" justifyContent='space-between'>
                                        <MDBox display="flex">
                                                <ContrastOutlined sx={{ color: colors.gradients.dark.main }} />
                                                <MDTypography fontWeight="light" color="red" fontSize={'15px'} px={1}>Shipment Capacity</MDTypography>
                                        </MDBox>
                                        <MDTypography fontWeight="light" color="black" fontSize={'15px'} px={1}>{shipmentCapacity}</MDTypography>
                                </MDBox>
                                {movedCapacity === '' || movedCapacity === null ?
                                        <MDBox />
                                        :
                                        <MDBox p={1} display="flex" justifyContent='space-between'>
                                                <MDBox display="flex">
                                                        <MoveToInboxOutlined sx={{ color: colors.gradients.dark.main }} />
                                                        <MDTypography fontWeight="light" color="red" fontSize={'15px'} px={1}>Shipment Moved Capacity</MDTypography>
                                                </MDBox>
                                                <MDTypography fontWeight="light" color="black" fontSize={'15px'} px={1}>{movedCapacity}</MDTypography>
                                        </MDBox>
                                }

                                <MDBox p={1} display="flex" pb={0.1} justifyContent='space-between'>
                                        <MDBox display="flex">
                                                <TypeSpecimenOutlined sx={{ color: colors.gradients.dark.main }} />
                                                <MDTypography fontWeight="light" color="red" fontSize={'15px'} px={1}>Shipment Category Type</MDTypography>
                                        </MDBox>
                                        <MDTypography fontWeight="light" color="black" fontSize={'15px'} px={1}>{shipmentCategoryType}</MDTypography>
                                </MDBox>
                                <MDBox p={1} display="flex" pb={0.1} justifyContent='space-between'>
                                        <MDBox display="flex">
                                                <NumbersOutlined sx={{ color: colors.gradients.dark.main }} />
                                                <MDTypography fontWeight="light" color="red" fontSize={'15px'} px={1}>Shipment Identifier</MDTypography>
                                        </MDBox>
                                        <MDTypography fontWeight="light" color="black" fontSize={'15px'} px={1}>{shipmentIdentifier}</MDTypography>
                                </MDBox>
                                <MDBox p={1} display="flex" pb={0} justifyContent='space-between'>
                                        <MDBox display="flex">
                                                <SourceOutlined sx={{ color: colors.gradients.dark.main }} />
                                                <MDTypography fontWeight="light" color="red" fontSize={'15px'} px={1}>Shipment Sender Branch Name</MDTypography>
                                        </MDBox>
                                        <MDTypography fontWeight="light" color="black" fontSize={'15px'} px={1}>{shipmentSenderBranchName}</MDTypography>
                                </MDBox>
                                <MDBox p={1} display="flex" pb={0} justifyContent='space-between'>
                                        <MDBox display="flex">
                                                <LocationOnOutlined sx={{ color: colors.gradients.dark.main }} />
                                                <MDTypography fontWeight="light" color="red" fontSize={'15px'} px={1}>Shipment Receiver Branch Name</MDTypography>
                                        </MDBox>
                                        <MDTypography fontWeight="light" color="black" fontSize={'15px'} px={1}>{shipmentReceiverBranchName}</MDTypography>
                                </MDBox>

                                {isSearch ?
                                        <MDBox />
                                        :
                                        <>
                                                <Divider sx={{ backgroundColor: colors.grey[500], m: 1 }} />

                                                <MDBox px={1} display="flex" pb={1} alignItems="center" >
                                                        <MainButton
                                                                isLoading={isLoading}
                                                                title={titleButtonAction}
                                                                colorTitle={colors.white.main}
                                                                backgroundColor={backgroundColorButtonAction}
                                                                hoverBackgroundColor={hoverBackgroundColorButtonAction}
                                                                onClick={onClickButtonAction}
                                                        />
                                                </MDBox>
                                        </>

                                }


                        </MDBox>
                </MDBox>
        );
}

export default ShipmentCard;
