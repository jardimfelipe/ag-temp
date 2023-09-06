import { HTMLAttributes } from "react";

interface IInput extends HTMLAttributes<HTMLInputElement> {
	title?: string;
}

export default function Input({ title, ...props }: IInput) {
	return (
		<div className="flex flex-col">
			{title ? (
				<label className="ml-2 md:mb-1 md:text-lg dark:text-light">
					{title}
				</label>
			) : null}
			<input
				className="rounded-lg placeholder:text-placeholder p-2 m-2 text-white dark:bg-darkness-plus border-2 ring-2 ring-transparent border-graydark base-an focus:border-primary focus:ring-primary"
				{...props}
			></input>
		</div>
	);
}
