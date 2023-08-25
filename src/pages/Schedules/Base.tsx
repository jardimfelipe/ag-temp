import React, { useEffect } from "react";
import { getAllServices } from "../../store/reducer/servicesList.reducer";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import Button from "../../components/Button";

type Props = {};

export function BaseSchedule({}: Props) {
	const serviceList = useAppSelector((state) => state.serviceList);
	const dispatch = useAppDispatch();

	const test = () => dispatch(getAllServices());

	return (
		<div className="ml-44">
			<header>
				<div>
					<ul></ul>
					{serviceList.map((value) => {
						return <li key={"key-" + value.id}>{value.name}</li>;
					})}
					{/* Lista de serviços de forma resumida, blocos pequenos */}
				</div>
				<aside>{/* Tempo de cada serviço a mostra aqui */}</aside>
			</header>
			<main>
				{/* Data e hora (ainda precisa ser planejado como será mostrado em layout) */}
			</main>
			<footer>
				{/* Barbeiro responsável ou barbeiro randomico */}
				<Button onClick={test}>Agendar</Button>
			</footer>
		</div>
	);
}
