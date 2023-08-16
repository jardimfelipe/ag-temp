import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";

export function Layout() {
	const user = useAppSelector((state) => state.user);
	//TODO criar um hook para acessar tamanho atual com atualização em tempo de execução da tela em width

	return (
		<div className="flex">
			<div className="fixed">
				<Header></Header>
			</div>
			<span className="flex justify-center h-screen w-screen">
				{user.id != "" ? <Outlet></Outlet> : <Login />}
			</span>
		</div>
	);
}
