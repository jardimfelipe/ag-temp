import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import dayjs from "dayjs";
import { getAllServices } from "../../store/reducer/servicesList.reducer";
import { HourList } from "./HourList";
import Button from "../../components/Button";
import { MyCalendar } from "../../components/Calendar";
import { getBarbers } from "../../store/reducer/barber.reducer";
import { BarberList } from "./BarberList";
import { ServiceList } from "./ServiceList";

type Props = {
	barbershopId: string;
};

export function ScheduleComponent({ barbershopId }: Props) {
	const serviceList = useAppSelector((state) => state.serviceList);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [daySelected, setDaySelected] = useState(0);
	const [formSchedule, setFormSchedule] = useState({
		title: "",
		start: "",
		end: "",
		withServicesBarberId: "",
		withUserClientId: user.id,
		withBarberId: "",
		withBarbershopId: barbershopId,
	});

	function teste() {
		dispatch(getBarbers(barbershopId));
	}

	function setServiceInForm(service: any) {
		setFormSchedule({
			...formSchedule,
			withServicesBarberId: service.id,
		});
	}

	useEffect(() => {
		dispatch(getBarbers(barbershopId));
	}, []);

	return (
		<div className="ml-44">
			<header>
				<div>
					<ul className="flex mt-4">
						<ServiceList />
					</ul>
				</div>
				<aside>
					{/* Tempo e detalhes de cada serviço a mostra aqui */}
				</aside>
			</header>
			<main className="mt-4 flex justify-center items-center">
				<div className="flex justify-center gap-8 items-center">
					<MyCalendar onChange={setDaySelected} />
					{/* TODO reslver a situação do dia, mês e ano que n está sendo filtrado */}
					<HourList daySelected={daySelected} />
				</div>
			</main>
			<footer>
				<BarberList />
				<Button onClick={teste}>Agendar</Button>
			</footer>
		</div>
	);
}
