import { ArrowLineLeft, ArrowLineRight } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import LayoutLink from "./LayoutLink";
import { routes } from "../../router";
import Button from "../Button";

// type IHeader = {};

export default function Header() {
	const [handleMenu, setHandleMenu] = useState(false);
	if (!handleMenu) {
		return (
			<div className="h-screen px-4 bg-darkness">
				<button
					className="p-4 mt-2 base-an rounded-full hover:bg-darkness-plus"
					onClick={() => setHandleMenu(!handleMenu)}
				>
					<ArrowLineRight size={32} />
				</button>
			</div>
		);
	}

	return (
		<div className="w-72 h-screen p-2 bg-darkness">
			<button
				className="p-4 ml-2 base-an rounded-full hover:bg-darkness-plus"
				onClick={() => setHandleMenu(!handleMenu)}
			>
				<ArrowLineLeft size={32} />
			</button>
			<div className="flex flex-col mt-16 rounded-lg">
				{routes.map((route, id) => (
					<span key={`key-${id}`}>
						{!route.hidden ? (
							<Button
								style="flex my-2 dark:bg-graydark hover:bg-primary hover:text-button"
								key={`${route.id}-${id}`}
							>
								<LayoutLink
									title={route.id}
									to={route.path}
									icon={route.icon}
								/>
							</Button>
						) : null}
					</span>
				))}
			</div>
		</div>
	);
}
