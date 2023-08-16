import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";

export function Layout() {
	const user = useAppSelector((state) => state.user);
	return (
		<div className="flex">
			<div className="fixed">
				<Header></Header>
			</div>
			<span className="flex justify-center mt-16 h-screen w-screen">
				{user.id != "" ? <Outlet></Outlet> : <Login />}
			</span>
		</div>
	);
}
