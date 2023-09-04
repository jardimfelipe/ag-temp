import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";
import { useEffect } from "react";
import { UserService } from "../../service/user/count-profile";
import { logon } from "../../store/reducer/user.reducer";

const service = new UserService();
export function Layout() {
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			const isLogged = await service.GetSession();

			if (!isLogged) {
				dispatch(logon());
			}
		})();
	}, []);

	return (
		<div className="flex">
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
