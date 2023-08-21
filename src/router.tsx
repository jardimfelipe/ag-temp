import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import { Layout } from "./components/Layout";
import { Feeds } from "./pages/Feeds/Basic";
import { House, User } from "@phosphor-icons/react";
import Login from "./pages/Signin/Login";
import ErrorPage from "./pages/Error";
import { PerfilBase } from "./pages/Perfil/Base";

export const routes = [
	{
		icon: <House size={28} />,
		id: "Feeds",
		path: "/feed",
		Component: Feeds,
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
