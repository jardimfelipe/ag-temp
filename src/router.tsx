import { createBrowserRouter } from "react-router-dom";

import {
  AccessTime,
  Business,
  ContentCut,
  Home,
  PersonOutline,
  Storefront,
} from "@mui/icons-material";

import App from "./App";
import { UserPrivileges } from "./modules/auth/types";
import AdminBarbershops from "./pages/AdminBarbershops";
import Barbers from "./pages/BarbershopBarbers";
import BarbershopProfile from "./pages/BarbershopProfile";
import BarbershopServices from "./pages/BarbershopServices";
import CreateSchedule from "./pages/CreateSchedule";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Schedules from "./pages/Schedules";
import SingUp from "./pages/SingUp";

export const routes = [
  {
    path: "/feed",
    element: <Feed />,
    icon: <Home />,
    menu: true,
    label: "Feed",
    privileges: [UserPrivileges.CLIENT, UserPrivileges.ADMIN],
  },
  {
    path: "/agendamento/:barbershopId",
    element: <CreateSchedule />,
  },
  {
    path: "/meu-perfil",
    element: <Profile />,
    icon: <PersonOutline />,
    menu: true,
    label: "Perfil",
  },
  {
    path: "/agendamentos",
    element: <Schedules />,
    icon: <AccessTime />,
    menu: true,
    label: "Agenda",
    privileges: [
      UserPrivileges.BARBER,
      UserPrivileges.MANAGER,
      UserPrivileges.CLIENT,
    ],
  },
  {
    path: "/admin",
    element: <AdminBarbershops />,
    privileges: [UserPrivileges.ADMIN],
    icon: <Business />,
    label: "Admin",
    menu: true,
  },
  {
    path: "/barbearia/:barbershopId",
    element: <BarbershopProfile />,
    icon: <Storefront />,
    menu: true,
    label: "Barbearia",
    privileges: [UserPrivileges.BARBER, UserPrivileges.MANAGER],
  },
  {
    path: "/barbearia/serviços/:barbershopId",
    element: <BarbershopServices />,
    icon: <ContentCut />,
    label: "Serviços",
    privileges: [UserPrivileges.BARBER, UserPrivileges.MANAGER],
  },
  {
    path: "/barbearia/barbeiros/:barbershopId",
    element: <Barbers />,
    privileges: [UserPrivileges.MANAGER],
  },
];

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SingUp />,
  },
  {
    path: "/",
    element: <App />,
    children: routes,
  },
]);

export default router;
