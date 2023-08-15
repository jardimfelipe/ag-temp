import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import { Layout } from "./components/Layout";
import { Feeds } from "./pages/Feeds/Basic";
import { House } from "@phosphor-icons/react";
import Login from "./pages/Signin/Login";
import ErrorPage from "./pages/Error";

export const routes = [
	{
		icon: <House size={28} />,
		id: "Feeds",
		path: "/feed",
		Component: Feeds,
	},
	{
		icon: <House size={28} />,
		id: "Login",
		path: "/login",
		Component: Login,
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
