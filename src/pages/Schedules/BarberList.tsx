import React from "react";
import { useAppSelector } from "../../store/main.store";

type Props = {};

export function BarberList({}: Props) {
	const barbersList = useAppSelector((state) => state.barber);
	console.log(barbersList.length);

	return (
		<div>
			{barbersList.map((value) => {
				return <div key={Math.random()}>{value.name}</div>;
			})}
		</div>
	);
}
6;
