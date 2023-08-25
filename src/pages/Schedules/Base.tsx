import React, { useEffect, useState } from "react";
import { getAllServices } from "../../store/reducer/servicesList.reducer";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import Button from "../../components/Button";
import { Calendar } from "../../components/Calendar";

type Props = {};

export function BaseSchedule({}: Props) {
	const serviceList = useAppSelector((state) => state.serviceList);
	const [formSchedule, setFormSchedule] = useState({
		title: "",
		start: "", //"Date Thu Jul 13 2023 15:52:47 GMT-0300"
		end: "", // "Date Thu Jul 13 2023 15:52:47 GMT-0300"
		withServicesBarberId: "",
		withUserClientId: "",
		withBarberId: "",
		withBarbershopId: "",
	});
	const dispatch = useAppDispatch();

	function teste() {
		console.log(formSchedule);
	}

	useEffect(() => {
		dispatch(getAllServices());
	}, []);

	return (
		<div className="ml-44">
			<header>
				<div>
					<ul className="flex">
						{serviceList.map((service) => {
							return (
								<button
									className="text-left"
									onClick={() =>
										setFormSchedule({
											...formSchedule,
											withServicesBarberId: service.id,
										})
									}
								>
									<li
										key={"key-" + service.id}
										className="flex flex-col p-4 mx-4 rounded-lg bg-darkness hover:shadow-lg"
									>
										<div>Nome: {service.name}</div>
										<div>Duração: {service.duration}</div>
										<div>Preço: {service.price}</div>
									</li>
								</button>
							);
						})}
					</ul>
				</div>
				<aside>{/* Tempo de cada serviço a mostra aqui */}</aside>
			</header>
			<main>
				<Calendar />
			</main>
			<footer>
				{/* Barbeiro responsável ou barbeiro randomico */}
				<Button onClick={teste}>Agendar</Button>
			</footer>
		</div>
	);
}
