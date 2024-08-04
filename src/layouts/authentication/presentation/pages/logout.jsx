import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getValue, removeValue } from '../../../../core/storage/storage';
import MainDialog from '../../../../components/Dialogs/main_dialog';
import logout from '../../../../assets/icons/signout.svg'
import colors from '../../../../assets/theme/base/colors';
import arTranslations from '../../../../assets/translation/ar.json'
import enTranslations from '../../../../assets/translation/en.json'

function Logout() {
        const language = getValue("lang") || 'en';
        const translations = language === 'ar' ? arTranslations : enTranslations;

        const navigate = useNavigate();
        const [dialogOpen, setDialogOpen] = useState(true);

        const handleCloseDialog = () => {
                setDialogOpen(false);
                navigate("/home")
        };

        const handleConfirmLogout = () => {
                console.log("Removing token and type");
                removeValue('token');
                navigate("/signin")
        };

        return (
                <>
                        <MainDialog
                                open={dialogOpen}
                                handleClose={handleCloseDialog}
                                handleOperationService={handleConfirmLogout}
                                titleButtonOperation={translations.Logout}
                                titleButtonCancel={translations.cancel}
                                colorTitle={colors.primary.state}
                                headerIcon={logout}
                                initialColor={colors.primary.state}
                                headerTitle={translations['Sign out']}
                                subTitle={translations['Are you sure you would like to sign out of your account?']}
                        />

                </>
        );
}

export default Logout;
