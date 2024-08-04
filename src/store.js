import { configureStore } from '@reduxjs/toolkit';
import authLoginReducer from './layouts/authentication/services/login_service';
import getStudentsServiceReducer from './layouts/student_management/services/get_student_service';
import addStudentServiceReducer from './layouts/student_management/services/add_student_service';
import getGradesServiceReducer from './layouts/student_management/services/get_grades_services';
import getGendersServiceReducer from './layouts/student_management/services/get_genders_service';
import modifyStudentServiceReducer from './layouts/student_management/services/modify_student_service';
import removeStudentServiceReducer from './layouts/student_management/services/remove_student_service';
import searchStudentServiceReducer from './layouts/student_management/services/search_student_service';

const store = configureStore({
        reducer: {
                authLogin: authLoginReducer,
                getStudentsService: getStudentsServiceReducer,
                addStudentService: addStudentServiceReducer,
                getGradesService: getGradesServiceReducer,
                getGendersService: getGendersServiceReducer,
                modifyStudentService: modifyStudentServiceReducer,
                removeStudentService: removeStudentServiceReducer,
                searchStudentService: searchStudentServiceReducer
        }
});

export default store;