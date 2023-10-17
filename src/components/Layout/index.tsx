import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";
import { useEffect, useState } from "react";
import { UserService } from "../../service/user/count-profile";
import { logon } from "../../store/reducer/user.reducer";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

const service = new UserService();
export function Layout() {
	const location = useLocation();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.user);
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

	return (
		<div className="flex">
			<ToastContainer theme="colored" />
			{user.isLogged ? (
				<div className="fixed z-10">
					<Header></Header>
				</div>
			) : null}
			<Container>
				{user.isLogged ? <Outlet></Outlet> : <Login />}
			</Container>
		</div>
	);
}
