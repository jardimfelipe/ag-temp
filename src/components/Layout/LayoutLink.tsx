import React, { ReactElement } from "react";
import { Link, LinkProps } from "react-router-dom";

type Props = LinkProps & {
	title: string;
	icon: ReactElement;
};

export default function LayoutLink({ title, to, icon }: Props) {
	return (
		<div className="flex items-center my-2">
			<span className="mr-4">{icon}</span>
			<Link to={to}>{title}</Link>
		</div>
	);
}
