import React, { useState } from "react";
import { ArrowLineLeft, ArrowLineRight } from "@phosphor-icons/react";
import LayoutLink from "./LayoutLink";
import { routes } from "../../router";
import Button from "../Button";
import { useAppSelector } from "../../store/main.store";
export function HeaderLinks() {
	const [handleMenu, setHandleMenu] = useState(false);
	const user = useAppSelector((state) => state.user);

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

	return (
		<div className="w-72 h-screen bg-darkness">
			<button
				className="p-4 ml-2 mt-2 base-an rounded-full hover:bg-darkness-plus"
				onClick={() => setHandleMenu(!handleMenu)}
			>
				<ArrowLineLeft size={32} />
			</button>
			<div className="flex p-2 flex-col mt-16 rounded-lg">
				{routes.map((route, id) => (
					<span key={`key-${id}`}>
						{!route.hidden ? (
							<Button
								style="flex w-full my-2 dark:bg-graydark hover:bg-primary hover:text-button"
								key={`${route.id}-${id}`}
							>
								<LayoutLink
									title={route.id}
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
