import { configureStore } from '@reduxjs/toolkit';
import authLoginReducer from './layouts/authentication/services/login_service';
import getStudentsServiceReducer from './layouts/student_management/services/get_student_service';

const store = configureStore({
        reducer: {
                authLogin: authLoginReducer,
                getStudentsService: getStudentsServiceReducer
        }
});

export default store;