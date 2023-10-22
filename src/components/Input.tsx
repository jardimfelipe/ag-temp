import { HTMLAttributes } from "react";
import {  useAppSelector } from "../store/main.store";
type IInput = HTMLAttributes<HTMLInputElement> & {
	title?: string;
	value: string | number;
	type?: "text" | "password";
};
export default function Input({ title, value, type, onChange }: IInput) {
	const config = useAppSelector((state) => state.user.config);
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
				onChange={onChange}
				className={`rounded-lg placeholder:text-placeholder p-2 m-2 text-white ${config.theme === 'dark' ? "bg-darkness": "darkness"} border-2 ring-2 ring-transparent border-graydark base-an focus:border-primary focus:ring-primary`}
			></input>
		</div>
	);
}
