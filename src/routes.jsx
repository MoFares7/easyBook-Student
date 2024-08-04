import Logout from './layouts/authentication/presentation/pages/logout';
import LoginPage from "./layouts/authentication/presentation/pages/login_page";
import StudentsPage from "./layouts/student_management/presentation/pages/students_page";
import studentImage from './assets/icons/student.png'
import logout from './assets/icons/logout.svg'
import { getValue } from "./core/storage/storage";
import arTranslations from './assets/translation/ar.json';
import enTranslations from './assets/translation/en.json';

const translations = getValue("lang") === 'ar' ? arTranslations : enTranslations;

export const routes = [
  {
    type: "collapse",
    name: translations.studentData,
    key: "home",
    isNavigate: true,
    icon: <img src={studentImage} alt="Student" style={{ width: 24, height: 24 }} />,
    route: "/home",
    component: <StudentsPage />
  },
  {
    type: "collapse",
  }, {
    type: "collapse",
  }, {
    type: "collapse",
  }, {
    type: "collapse",
  },
  {
    type: "collapse",
  }, {
    type: "collapse",
  }, {
    type: "collapse",
  }, {
    type: "collapse",
  }, {
    type: "collapse",
  }, {
    type: "collapse",
  },
  {
    type: "collapse",
    name: translations.Logout,
    key: "logout",
    icon: <img src={logout} alt="Student" style={{ width: 24, height: 24 }} />,
    route: "/logout",
    component: <Logout />,
  },
  {
    route: "/signin",
    component: <LoginPage />,
  },
];
