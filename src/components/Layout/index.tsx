import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";
import { ToastContainer } from "react-toastify";
import { WhatsappButton } from "../WhatsappButton";

export function Layout() {
	const user = useAppSelector((state) => state.user);
	const localizacao = useLocation();

	console.log('user', user)
	return (
		<div className="flex">
			<ToastContainer theme="colored" />
			{user.isLogged ? (
				<div className="fixed z-10">
					<Header></Header>
				</div>
			) : null}
			<span className={`justify-center h-screen w-screen ${user.config.theme === 'dark' ? 'bg-dark text-light' : 'bg-light'} `}>
				<WhatsappButton />
				{user.isLogged || localizacao.pathname === '/cadastro' ? <Outlet></Outlet> : <Login />}
			</span>
		</div>
	);
}
