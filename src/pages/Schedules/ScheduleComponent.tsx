import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import dayjs from "dayjs";
import { getAllServices } from "../../store/reducer/servicesList.reducer";
import { HourList } from "./HourList";
import Button from "../../components/Button";
import { MyCalendar } from "../../components/Calendar";
import { scheduleContext } from "../../store/context/schedules.context";

type Props = {};

export function ScheduleComponent({}: Props) {
	const serviceList = useAppSelector((state) => state.serviceList);
	const dispatch = useAppDispatch();
	const [daySelected, setDaySelected] = useState(0);
	const [formSchedule, setFormSchedule] = useState({
		title: "",
		start: "", //"Date Thu Jul 13 2023 15:52:47 GMT-0300"
		end: "", // "Date Thu Jul 13 2023 15:52:47 GMT-0300"
		withServicesBarberId: "",
		withUserClientId: "",
		withBarberId: "",
		withBarbershopId: "",
	});

	function teste() {
		console.log(dayjs(new Date(2022, 9, 16, 14, 40)).date());
	}

	function setServiceInForm(service: any) {
		setFormSchedule({
			...formSchedule,
			withServicesBarberId: service.id,
		});
	}

	useEffect(() => {
		dispatch(getAllServices());
	}, []);
	return (
		<div className="ml-44">
			<header>
				<div>
					<ul className="flex mt-4">
						{serviceList.map((service, id) => {
							return (
								<button
									key={`service-${id}`}
									className="text-left"
									onClick={() => setServiceInForm(service)}
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
				<aside>
					{/* Tempo e detalhes de cada serviço a mostra aqui */}
				</aside>
			</header>
			<main className="flex justify-center items-center gap-8">
				<div className="flex  flex-col justify-center items-center">
					<MyCalendar onChange={setDaySelected} />
					<HourList />
				</div>
			</main>
			<footer>
				{/* Barbeiro responsável ou barbeiro randomico */}
				<Button onClick={teste}>Agendar</Button>
			</footer>
		</div>
	);
}
