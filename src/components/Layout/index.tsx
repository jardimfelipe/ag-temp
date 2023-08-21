import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAppSelector } from "../../store/main.store";
import Login from "../../pages/Signin/Login";

export function Layout() {
	const user = useAppSelector((state) => state.user);
	//TODO criar um hook para acessar tamanho atual com atualização em tempo de execução da tela em width

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
