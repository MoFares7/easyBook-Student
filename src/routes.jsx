import { DashboardRounded, LogoutRounded} from "@mui/icons-material";
import Logout from './layouts/authentication/presentation/pages/logout';
import LoginPage from "./layouts/authentication/presentation/pages/login_page";

export const companyManagerRoutes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <DashboardRounded />,
    route: "/home",
    component: <LoginPage />
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

  // {
  //   route: "/branch-Manage-Archive",
  //   component: <BranchManagerArchive />
  // },
];
