import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import { Layout } from "./components/Layout";
import { Feeds } from "./pages/Feeds/Basic";
import { BarbershopProfile } from "./pages/BarbershopProfile/Base";
import { House, User } from "@phosphor-icons/react";
import Login from "./pages/Signin/Login";
import ErrorPage from "./pages/Error";
import { PerfilBase } from "./pages/Perfil/Base";
import { BaseSchedule } from "./pages/Schedules/Base";

export const routes = [
	{
		icon: <House size={28} />,
		id: "Feeds",
		path: "/feed",
		Component: Feeds,
	},
	{
		icon: <User size={28} />,
		id: "Perfil Barbearia",
		path: "/barber/:barbershopId",
		Component: BarbershopProfile,
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
