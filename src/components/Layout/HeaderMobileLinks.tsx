import React, { useState } from "react";
import { routes } from "../../router";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import { Link, useNavigate } from "react-router-dom";
import { List } from "@phosphor-icons/react";
import { logon } from "../../store/reducer/user.reducer";

function MobileLink({ icon, to, title }: any) {
	return (
		<div className="flex p-2 my-2">
			<span className="">{icon}</span>
			<Link to={to}>{title}</Link>
		</div>
	);
}

export default function HeaderMobileLinks() {
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const [handleMenu, setHandleMenu] = useState(false);
	const intialName = `${user.name.split(" ")[0]} ${user.name.split(" ")[1]}`;
	const dispatch = useAppDispatch();

	function handleNavigate(path: string) {
		navigate(path);
	}

	function transformDynamicPath(route: any) {
		// verificar se é rota dinamica
		return route.path.split(":")[1]
			? // verificar se a rota é de userId
			  route.path.split(":")[1] == "userId"
				? // adicionando uma rota do header que pega id do redux
				  route.path.split(":")[0] + user.id
				: route.path
			: route.path;
	}

	return (
		<div>
			<header className="flex justify-between items-center w-screen py-2 bg-darkness text-light">
				<button
					className="ml-4"
					onClick={() => setHandleMenu(!handleMenu)}
				>
					<List size={32} />
				</button>
				<span className="mr-4">AG Barbearia</span>
				<div className="absolute flex flex-col divide-y-2 divide-graydark justify-center items-center top-14 w-screen bg-darkness-plus">
					{handleMenu ? (
						<>
							{routes.map((route, id) => (
								<span key={`key-${id}`}>
									{!route.hidden ? (
										<button
											className="w-96 "
											key={`${route.id}-${id}`}
											onClick={() =>
												handleNavigate(
													transformDynamicPath(route)
												)
											}
										>
											<MobileLink
												title={route.id}
												to={
													// verificar se é rota dinamica
													route.path.split(":")[1]
														? // verificar se a rota é de userId
														  route.path.split(
																":"
														  )[1] == "userId"
															? // adicionando uma rota do header que pega id do redux
															  route.path.split(
																	":"
															  )[0] + user.id
															: route.path
														: route.path
												}
												icon={route.icon!}
											/>
										</button>
									) : null}
								</span>
							))}
							<button
								className="w-96 py-4"
								onClick={() => dispatch(logon())}
							>
								deslogar
							</button>
						</>
					) : null}
				</div>
			</header>
		</div>
	);
}
