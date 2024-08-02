import React, { useState, useEffect } from 'react';
import MDBox from '../../items/MDBox/MDBox.jsx';
import { Dialog, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import MDTypography from '../../items/MDTypography/index.jsx';
import TextFeildForm from '../Items/Form_TextFeild/text_feild_form.jsx';
import colors from '../../assets/theme/base/colors.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPricingOperation } from '../../layouts/manager/feature/Pricing/service/create_pricing_service.jsx';
import { getPricingManagement } from '../../layouts/manager/feature/Pricing/service/get_pricing_service.jsx';
import { updatePricingService } from '../../layouts/manager/feature/Pricing/service/update_pricing_service.jsx';
import Lottie from 'lottie-react';
import pricing from '../../layouts/manager/assets/lottie/pricing.json';
import MainButton from '../Items/MainButton/main_button.jsx';

const PricingDialog = ({ goodsID, isDialogOpen, onCloseDialog, isUpdateEnable, initialName, initialPrice, initialPriceFastOrder, initialPercentProfit, initialPercentProfitFastOrder }) => {
        const dispatch = useDispatch();
        const [nameGoods, setNameGoods] = useState(initialName || '');
        const [price, setPrice] = useState(initialPrice ? String(initialPrice) : '');
        const [percentProfit, setPercentProfit] = useState(initialPercentProfit ? String(initialPercentProfit) : '');
        const [priceFastOrder, setPriceFastOrder] = useState(initialPriceFastOrder ? String(initialPriceFastOrder) : '');
        const [percentProfitFastOrder, setPercentProfitFastOrder] = useState(initialPercentProfitFastOrder ? String(initialPercentProfitFastOrder) : '');

        const [validationErrors, setValidationErrors] = useState({
                nameGoods: '',
                price: '',
                percentProfit: '',
                priceFastOrder: '',
                percentProfitFastOrder: ''
        });
        const loading = useSelector(state => state.createNewPricingOperation.loading);
        const updateLoading = useSelector(state => state.updatePricingService.loading);

        useEffect(() => {
                setNameGoods(initialName || '');
                setPrice(initialPrice || '');
                setPercentProfit(initialPercentProfit || '');
                setPriceFastOrder(initialPriceFastOrder || '');
                setPercentProfitFastOrder(initialPercentProfitFastOrder || '');
        }, [initialName, initialPrice, initialPercentProfit, initialPriceFastOrder, initialPercentProfitFastOrder, isUpdateEnable]);

        const handleDialogClose = () => {
                onCloseDialog()
                setValidationErrors({
                        nameGoods: '',
                        price: '',
                        percentProfit: '',
                        priceFastOrder: '',
                        percentProfitFastOrder: ''
                });
        };

        const handleAddGoodsType = async () => {
                const errors = {};

                if (nameGoods.trim() === '') {
                        errors.nameGoods = 'Name is required';
                }

                if (price === '') {
                        errors.price = 'Price Normal is required';
                }

                if (percentProfit === '' || percentProfit > 100) {
                        errors.percentProfit = 'Percent Profit Normal is required and must to be between 0 and 100';
                }

                if (priceFastOrder === '') {
                        errors.priceFastOrder = 'Price Fast is required';
                }

                if (percentProfitFastOrder === '' || percentProfitFastOrder > 100) {
                        errors.percentProfitFastOrder = 'Percent Profit Fast is required and must to be between 0 and 100';
                }

                setValidationErrors(errors);

                if (Object.keys(errors).length === 0) {
                        let response;
                        isUpdateEnable ?
                                response = await dispatch(updatePricingService({
                                        categoryID: goodsID,
                                        payload: {
                                                name: nameGoods,
                                                price: price,
                                                percentProfit: percentProfit,
                                                price_fast_order: priceFastOrder,
                                                percentProfit_fast_order: percentProfitFastOrder
                                        }
                                }))
                                :
                                response = await dispatch(createNewPricingOperation({
                                        payload: {
                                                name: nameGoods,
                                                price: price,
                                                percentProfit: percentProfit,
                                                price_fast_order: priceFastOrder,
                                                percentProfit_fast_order: percentProfitFastOrder
                                        }
                                }))

                        console.log(response.payload.status);
                        if (response.payload.status === 'fail') {
                                if (response.payload.name && response.payload.nameGoods.length > 0) {
                                        setNameGoods('')
                                        errors.nameGoods = response.payload.nameGoods[0];
                                }
                                if (response.payload.price && response.payload.price.length > 0) {
                                        setPrice('')
                                        errors.price = response.payload.price[0];
                                }
                                if (response.payload.percentProfit && response.payload.percentProfit.length > 0) {
                                        setPercentProfit('')
                                        errors.percentProfit = response.payload.percentProfit[0];
                                }
                        }
                        if (response.payload.status === 'success') {
                                dispatch(getPricingManagement())
                                handleDialogClose();
                                setNameGoods('');
                                setPrice('');
                                setPercentProfit('');
                                setPriceFastOrder('');
                                setPercentProfitFastOrder('');
                        }
                }
        };

        return (
                <div>
                        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                                <DialogContent sx={{ justifyContent: "center" }}>
                                        <MDTypography fontWeight="bold" color="black" fontSize={'16px'} p={1}
                                                textAlign='center' >{isUpdateEnable ? "Update a Typefrom Goods in Company" : "Add new Typefrom Goods in Company"}</MDTypography>


                                        <Divider sx={{
                                                mt: -0.5,
                                                mb: 1,
                                                color: "#252525",
                                                backgroundColor: "#252525;"
                                        }} />

                                        <MDBox
                                                sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                }}
                                        >
                                                <Lottie animationData={pricing} autoPlay style={{ width: 160, height: 160 }} />
                                        </MDBox>

                                        <TextFeildForm
                                                isFulWidth={true}
                                                value={nameGoods}
                                                placeholder={validationErrors.nameGoods ? validationErrors.nameGoods : "Name Goods"}
                                                label={"Goods Name"}
                                                validationColor={validationErrors.nameGoods ? colors.gradients.error.main : colors.white}
                                                validationErrors={validationErrors.nameGoods}
                                                onChange={(e) => {
                                                        setNameGoods(e.target.value);
                                                        setValidationErrors({ ...validationErrors, nameGoods: '' });
                                                }}
                                        />

                                        <MDBox display="flex" justifyContent="space-between">
                                                <TextFeildForm
                                                        isNumaric={true}
                                                        isFulWidth={true}
                                                        value={price}
                                                        placeholder={validationErrors.price ? validationErrors.price : "Price Normal Order"}
                                                        label={"Price Normal Order"}
                                                        validationColor={validationErrors.price ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.price}
                                                        onChange={(e) => {
                                                                setPrice(e.target.value);
                                                                setValidationErrors({ ...validationErrors, price: '' });
                                                        }}
                                                />

                                                <TextFeildForm
                                                        isNumaric={true}
                                                        isFulWidth={true}
                                                        value={percentProfit}
                                                        placeholder={validationErrors.percentProfit ? validationErrors.percentProfit : "Percent Profit Normal Order"}
                                                        label={"Percent Profit Normal Order"}
                                                        validationColor={validationErrors.percentProfit ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.percentProfit}
                                                        onChange={(e) => {
                                                                setPercentProfit(e.target.value);
                                                                setValidationErrors({ ...validationErrors, percentProfit: '' });
                                                        }}
                                                />
                                        </MDBox>

                                        <MDBox display="flex" justifyContent="space-between">
                                                <TextFeildForm
                                                        isNumaric={true}
                                                        isFulWidth={true}
                                                        value={priceFastOrder}
                                                        placeholder={validationErrors.priceFastOrder ? validationErrors.priceFastOrder : "Price Fast Order"}
                                                        label={"Price Fast Order"}
                                                        validationColor={validationErrors.priceFastOrder ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.priceFastOrder}
                                                        onChange={(e) => {
                                                                setPriceFastOrder(e.target.value);
                                                                setValidationErrors({ ...validationErrors, priceFastOrder: '' });
                                                        }}
                                                />

                                                <TextFeildForm
                                                        isNumaric={true}
                                                        isFulWidth={true}
                                                        value={percentProfitFastOrder}
                                                        placeholder={validationErrors.percentProfitFastOrder ? validationErrors.percentProfitFastOrder : "Percent Profit Fast Order"}
                                                        label={"Percent Profit Fast Order"}
                                                        validationColor={validationErrors.percentProfitFastOrder ? colors.gradients.error.main : colors.white}
                                                        validationErrors={validationErrors.percentProfitFastOrder}
                                                        onChange={(e) => {
                                                                setPercentProfitFastOrder(e.target.value);
                                                                setValidationErrors({ ...validationErrors, percentProfitFastOrder: '' });
                                                        }}
                                                />
                                        </MDBox>

                                </DialogContent>
                                <DialogActions>
                                        <MDBox display="flex" justifyContent="space-between">
                                                <MainButton
                                                        title={isUpdateEnable ? "Update" : "Add"}
                                                        isLoading={loading || updateLoading}
                                                        colorTitle={colors.white.main}
                                                        backgroundColor={colors.gradients.info.state}
                                                        hoverBackgroundColor={colors.gradients.info.main}
                                                        onClick={handleAddGoodsType}
                                                />

                                                <Button onClick={handleDialogClose}>Close</Button>
                                        </MDBox>
                                </DialogActions>
                        </Dialog>
                </div>
        );
};

export default PricingDialog;
