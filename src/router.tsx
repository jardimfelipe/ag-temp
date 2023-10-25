import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import { Layout } from "./components/Layout";
import { Feeds } from "./pages/Feeds/Basic";
import { BarbershopProfile } from "./pages/BarbershopProfile/Base";
import { House, Storefront, User, CalendarCheck, Scissors } from "@phosphor-icons/react";
import Login from "./pages/Signin/Login";
import ErrorPage from "./pages/Error";
import { PerfilBase } from "./pages/Perfil/Base";
import { BaseSchedule } from "./pages/Schedules/Base";
import Cadastro from './pages/Cadastro/cadastroUsuario/Basic';
import CadastroADm from './pages/Cadastro/cadastroAdm/Basic';
import { BaseScheduleList } from "./pages/ScheduleList/Base";
import CreateService from "./pages/Services/Base"
import { UserPrivileges } from "./store/reducer/user.reducer";

export const routes = [
	{
		icon: <House size={28} />,
		id: "Feeds",
		path: "/feed",
		Component: Feeds,
	},
	{
		icon: <Storefront size={28} />,
		id: "Perfil Barbearia",
		path: "/barbershop/:barbershopId",
		Component: BarbershopProfile,
		privileges: [UserPrivileges.MANAGER, UserPrivileges.ADMIN],
		hidden: false,
	},
	{
		id: "Login",
		path: "/login",
		Component: Login,
		hidden: true,
	},
	{
		icon: <User size={28} />,
		id: "Perfil",
		path: "/user/:userId",
		Component: PerfilBase,
		hidden: false,
	},
	{
		id: "Schedule",
		path: "/feed/schedule/:barbershopId",
		Component: BaseSchedule,
		hidden: true,
	},
	{
		icon: <CalendarCheck size={28} />,
		id: "Agendamento",
		path: "/schedule/",
		Component: BaseScheduleList,
		hidden: false,
	},
	{
		id: "Cadastro",
		path: "/cadastro",
		Component: Cadastro,
		hidden: true
	},
	{
		id: "Cadastro Administrador",
		path: "/cadastro_adm",
		Component: CadastroADm,
		hidden: true
	},
	{
		icon: <Scissors size={28} />,
		id: "Serviços",
		path: "/services",
		Component: CreateService,
		privileges: [UserPrivileges.MANAGER, UserPrivileges.ADMIN]
	}
];
export const router = createBrowserRouter([
	{
		id: "Home",
		path: "/",
		element: <Layout />,
		children: routes,
		errorElement: <ErrorPage />,
	},
]);
