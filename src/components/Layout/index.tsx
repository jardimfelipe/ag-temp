import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";
import { useEffect, useState } from "react";
import { UserService } from "../../service/user/count-profile";
import { logon } from "../../store/reducer/user.reducer";

const service = new UserService();
export function Layout() {
	const [error, setError] = useState("");
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.onerror = (message, source, lineno, colno, err) => {
			console.log(`erro global ${err}`);
		};

		(async () => {
			const isLogged = await service.GetSession();

			if (!isLogged) {
				dispatch(logon());
			}
		})();
	}, []);

	return (
		<div className="flex">
			{error}
			{user.isLogged ? (
				<div className="fixed">
					<Header></Header>
				</div>
			) : null}
			<span className=" justify-center h-screen w-screen">
				{user.isLogged ? <Outlet></Outlet> : <Login />}
			</span>
		</div>
	);
}
