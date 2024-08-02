import { DashboardRounded, LogoutRounded } from "@mui/icons-material";
import Logout from './layouts/authentication/presentation/pages/logout';
import LoginPage from "./layouts/authentication/presentation/pages/login_page";
import StudentsPage from "./layouts/student_management/presentation/pages/students_page";
import studentImage from './assets/icons/student.png'

export const companyManagerRoutes = [
  {
    type: "collapse",
    name: "Students' Data",
    key: "home",
    icon: <img src={studentImage} alt="Student" style={{ width: 24, height: 24 }} />,
    route: "/home",
    component: <StudentsPage />
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <LogoutRounded />,
    route: "/logout",
    component: <Logout />,
  },
  {
    route: "/signin",
    component: <LoginPage />,
  },
];
