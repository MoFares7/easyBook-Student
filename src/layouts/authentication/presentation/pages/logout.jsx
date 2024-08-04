import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeValue } from '../../../../core/storage/storage';
import MainDialog from '../../../../components/Dialogs/main_dialog';
import logout from '../../../../assets/icons/signout.svg'
import colors from '../../../../assets/theme/base/colors';
import { t } from 'i18next';

function Logout() {
        const dispatch = useDispatch();
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
                                titleButtonOperation={t("Logout")}
                                headerIcon={logout}
                                initialColor={colors.primary.state}
                                headerTitle={t("Sign out")}
                                subTitle={t("Are you sure you would like to sign out of your account?")}
                        />
                        
                </>
        );
}

export default Logout;
