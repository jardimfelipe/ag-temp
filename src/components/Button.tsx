import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IButton extends HTMLAttributes<HTMLButtonElement> {
	color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
	size?: "sm" | "md" | "lg" | "xl";
	disabled?: boolean;
	children: ReactNode;
}

export default function Button({
	children,
	className,
	disabled = false,
	onClick,
	...props
}: IButton) {
	return (
		<button
			className={twMerge(
				className,
				`bg- dark:bg-graydark px-4 py-2 rounded-lg base-an hover:shadow-lg disabled:opacity-25`
			)}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}
