import { HTMLAttributes } from "react";

type IInput = HTMLAttributes<HTMLInputElement> & {
	title?: string;
	value: string;
	type?: "text" | "password";
	fnChange: (e: any) => any;
};

export default function Input({ title, value, type, fnChange }: IInput) {
	return (
		<div className="flex flex-col">
			{title ? (
				<label className="ml-2 md:mb-1 md:text-lg dark:text-light">
					{title}
				</label>
			) : null}
			<input
				value={value}
				type={type ?? "text"}
				onChange={fnChange}
				className="rounded-lg placeholder:text-placeholder p-2 m-2 text-white dark:bg-darkness-plus border-2 ring-2 ring-transparent border-graydark base-an focus:border-primary focus:ring-primary"
			></input>
		</div>
	);
}
