import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { UserService } from "../../service/user/count-profile";
import { logon } from "../../store/reducer/user.reducer";
=======
import { useLocation } from 'react-router-dom';
>>>>>>> caio

const service = new UserService();
export function Layout() {
	const location = useLocation();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.user);
<<<<<<< HEAD
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			const isLogged = await service.GetSession();

			if (!isLogged) {
				dispatch(logon());
			} else {
				if (location.pathname === "/") {
					navigate("/feed");
				}
			}
		})();
	}, []);

=======
	const localizacao = useLocation();
>>>>>>> caio
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
