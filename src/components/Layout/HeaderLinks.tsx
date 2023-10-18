import React, { useState } from "react";
import { ArrowLineLeft, ArrowLineRight } from "@phosphor-icons/react";
import LayoutLink from "./LayoutLink";
import { routes } from "../../router";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import { logon } from "../../store/reducer/user.reducer";
import { useNavigate } from "react-router-dom";
export function HeaderLinks() {
	const [handleMenu, setHandleMenu] = useState(false);
	const user = useAppSelector((state) => state.user);
	// const intialName = `${user.name.split(" ")[0]} ${user.name.split(" ")[1]}`;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	if (!handleMenu) {
		return (
			<div className="h-screen pr-2 bg-darkness">
				<button
					className="p-4 ml-2 mt-2 base-an rounded-full hover:bg-darkness-plus"
					onClick={() => setHandleMenu(!handleMenu)}
				>
					<ArrowLineRight size={32} />
				</button>
			</div>
		);
	}

	function handleNavigate(path: string) {
		navigate(path);
	}

	function hiddenLinkByBarbershop(route: any) {
		const isManager = user.manager;
		const isBarbershoLink =
			route.path.split(":")[1] == "barbershopId" &&
			route.path.split(":")[0] == "/barbershop/";
		if (isBarbershoLink && isManager === false) {
			return true;
		}

		return route.hidden;
	}

	function transformDynamicPath(route: any) {
		const newRoute = route;
		if (newRoute.path.split(":")[1]) {
			if (newRoute.path.split(":")[1] == "userId") {
				return newRoute.path.split(":")[0] + user.id;
			} else {
				if (newRoute.path.split(":")[1] == "barbershopId") {
					if (user.manager !== false) {
						return (
							newRoute.path.split(":")[0] +
							(user.manager as any).barbershopId
						);
					} else {
					}
				}
				return newRoute.path;
			}
		}
		// verificar se é rota dinamica

		// return newRoute;

		return route.path.split(":")[1]
			? // verificar se a rota é de userId
			  route.path.split(":")[1] == "userId"
				? // adicionando uma rota do header que pega id do redux
				  route.path.split(":")[0] + user.id
				: route.path
			: route.path;
	}

	return (
		<div className="w-72 h-screen bg-darkness text-light">
			<div className="flex justify-between">
				<button
					className="p-4 ml-2 mt-2 base-an rounded-full hover:bg-darkness-plus"
					onClick={() => setHandleMenu(!handleMenu)}
				>
					<ArrowLineLeft size={32} />
				</button>
				<Button
					className="mr-2 mt-2 w-20 h-14 rounded-xl"
					onClick={() => dispatch(logon())}
				>
					Logon
				</Button>
			</div>
			<div className="flex p-2 flex-col mt-16 rounded-lg">
				{routes.map((route, id) => (
					<span key={`key-${id}`}>
						{!hiddenLinkByBarbershop(route) ? (
							<Button
								className="flex w-full my-2 dark:bg-graydark hover:bg-primary hover:text-button"
								onClick={() =>
									handleNavigate(transformDynamicPath(route))
								}
								key={`${route.id}-${id}`}
							>
								<LayoutLink
									title={route.id}
<<<<<<< HEAD
									to={transformDynamicPath(route)}
=======
									to={
										// verificar se é rota dinamica
										route.path.split(":")[1]
											? // verificar se a rota é de userId
											  route.path.split(":")[1] ==
											  "userId"
												? // adicionando uma rota do header que pega id do redux
												  route.path.split(":")[0] +
												  user.id
												: route.path
											: route.path
									}
>>>>>>> caio
									icon={route.icon!}
								/>
							</Button>
						) : null}
					</span>
				))}
			</div>
		</div>
	);
}
