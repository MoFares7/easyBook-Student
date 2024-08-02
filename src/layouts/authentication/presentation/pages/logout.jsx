import React, { useEffect } from 'react';
import { removeValue } from '../../../../core/storage/storage';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { logoutService } from '../../services/apis/logout_service';

function Logout() {
        const dispatch = useDispatch();

        useEffect(() => {
                // dispatch(logoutService()).then(() => {
                //         console.log("Removing token and type");
                        removeValue('token');
                        removeValue('email');
                        removeValue('type');
                // });
        }, [dispatch]);

        return <Navigate to="/signin" />;
}

export default Logout;
