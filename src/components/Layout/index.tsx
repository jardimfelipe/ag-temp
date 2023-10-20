import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";

export function Layout() {
	const location = useLocation();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.user);
	const localizacao = useLocation();
	return (
		<div className="flex">
			{user.isLogged ? (
				<div className="fixed z-10">
					<Header></Header>
				</div>
			) : null}
			<span className={`justify-center h-screen w-screen ${user.config.theme === 'dark' ? 'bg-dark text-light' : 'bg-light'} `}>
				{user.isLogged || localizacao.pathname === '/cadastro' ? <Outlet></Outlet> : <Login />}
			</span>
		</div>
	);
}
