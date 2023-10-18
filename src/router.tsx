import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import { Layout } from "./components/Layout";
import { Feeds } from "./pages/Feeds/Basic";
import { BarbershopProfile } from "./pages/BarbershopProfile/Base";
import { House, Storefront, User } from "@phosphor-icons/react";
import Login from "./pages/Signin/Login";
import ErrorPage from "./pages/Error";
import { PerfilBase } from "./pages/Perfil/Base";
import { BaseSchedule } from "./pages/Schedules/Base";
<<<<<<< HEAD
import { useAppSelector } from "./store/main.store";

export interface IRoutes {
	icon?: any;
	id: string;
	path: string;
	Component: any;
	hidden?: boolean;
}

// const user = useAppSelector((store) => store.user);
export const routes: IRoutes[] = [
=======
import Cadastro from './pages/Cadastro/Basic';
import {BaseScheduleList} from "./pages/ScheduleList/Base";
export const routes = [
>>>>>>> caio
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
		id: "Agendamento",
		path: "/schedule/",
		Component: BaseScheduleList,
		hidden: false,
	},
	{
		id : "Cadastro",
		path : "/cadastro",
		Component : Cadastro,
		hidden : true
	},
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
