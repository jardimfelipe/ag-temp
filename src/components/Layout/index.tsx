import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";
import { useLocation } from 'react-router-dom';

export function Layout() {
	const user = useAppSelector((state) => state.user);
	const localizacao = useLocation();
	return (
		<div className="flex">
			{user.isLogged ? (
				<div className="fixed">
					<Header></Header>
				</div>
			) : null}
			<span className=" justify-center h-screen w-screen">
				{user.isLogged || localizacao.pathname === '/cadastro' ? <Outlet></Outlet> : <Login />}
			</span>
		</div>
	);
}
