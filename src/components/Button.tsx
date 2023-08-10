import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type IButton = {
	color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
	size?: "sm" | "md" | "lg" | "xl";
	children: ReactNode;
	style?: string;
};

export default function Button({ children, style }: IButton) {
	return (
		<button
			className={twMerge(
				style,
				`bg-graydark px-4 py-2 rounded-lg base-an hover:shadow-lg`
			)}
		>
			{children}
		</button>
	);
}
