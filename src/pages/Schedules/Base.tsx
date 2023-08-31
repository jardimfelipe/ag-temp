import React, { useEffect, useState } from "react";
import { getAllServices } from "../../store/reducer/servicesList.reducer";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import Button from "../../components/Button";
import { MyCalendar } from "../../components/Calendar";
import { getSchedules } from "../../store/reducer/schedule.reducer";
import { ContextComponentSchedule } from "../../store/context/schedules.context";

type Props = {};

export function BaseSchedule({}: Props) {
	const serviceList = useAppSelector((state) => state.serviceList);
	const dispatch = useAppDispatch();
	const [formSchedule, setFormSchedule] = useState({
		title: "",
		start: "", //"Date Thu Jul 13 2023 15:52:47 GMT-0300"
		end: "", // "Date Thu Jul 13 2023 15:52:47 GMT-0300"
		withServicesBarberId: "",
		withUserClientId: "",
		withBarberId: "",
		withBarbershopId: "",
	});

	function HoursOptions() {}

	function teste() {
		console.log(formSchedule);
	}

	useEffect(() => {
		dispatch(getSchedules("40aade88-d0c4-49e3-a1f4-5e0cc6917c83"));
		dispatch(getAllServices());
	}, []);

	return (
		<div className="ml-44">
			<ContextComponentSchedule>
				<header>
					<div>
						<ul className="flex mt-4">
							{serviceList.map((service, id) => {
								return (
									<button
										key={`service-${id}`}
										className="text-left"
										onClick={() =>
											setFormSchedule({
												...formSchedule,
												withServicesBarberId:
													service.id,
											})
										}
									>
										<li
											key={"key-" + service.id}
											className="flex flex-col p-4 mx-4 rounded-lg bg-darkness hover:shadow-lg"
										>
											<div>Nome: {service.name}</div>
											<div>
												Duração: {service.duration}
											</div>
											<div>Preço: {service.price}</div>
										</li>
									</button>
								);
							})}
						</ul>
					</div>
					<aside>
						{/* Tempo e detalhes de cada serviço a mostra aqui */}
					</aside>
				</header>
				<main className="flex justify-center items-center gap-8">
					<div className="flex  flex-col justify-center items-center">
						<MyCalendar />
						<div>
							<input className="p-2 bg-darkness" type="time" />
						</div>
					</div>
				</main>
				<footer>
					{/* Barbeiro responsável ou barbeiro randomico */}
					<Button onClick={teste}>Agendar</Button>
				</footer>
			</ContextComponentSchedule>
		</div>
	);
}
