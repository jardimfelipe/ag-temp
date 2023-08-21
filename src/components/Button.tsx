import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type IButton = HTMLAttributes<HTMLButtonElement> & {
	color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
	size?: "sm" | "md" | "lg" | "xl";
	children: ReactNode;
};

export default function Button({ children, className, onClick }: IButton) {
	return (
		<button
			className={twMerge(
				className,
				`bg-graydark px-4 py-2 rounded-lg base-an hover:shadow-lg`
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
