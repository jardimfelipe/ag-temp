import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type IButton = HTMLAttributes<HTMLButtonElement> & {
	color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
	size?: "sm" | "md" | "lg" | "xl";
	children: ReactNode;
	style?: string;
};

export default function Button({ children, style, onClick }: IButton) {
	return (
		<button
			className={twMerge(
				style,
				`bg-graydark px-4 py-2 rounded-lg base-an hover:shadow-lg`
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
