import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import dayjs from "dayjs";
import { HourList } from "./HourList";
import Button from "../../components/Button";
import { IDate, MyCalendar } from "../../components/Calendar";
import { getBarbers } from "../../store/reducer/barber.reducer";
import { BarberList } from "./BarberList";
import { ServiceList } from "./ServiceList";
import { IBarberResponse } from "../../service/barber";
import { IBarberServices as IBarberServiceResponse } from "../../service/schedule/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	barbershopId: string;
};

interface IGetDataInComponents {
	barber?: IBarberResponse;
	service?: IBarberServiceResponse;
	date?: IDate;
}

export function ScheduleComponent({ barbershopId }: Props) {
	const user = useAppSelector((state) => state.user);
	const [isCorrect, setIsCorrect] = useState(false);
	const [schedule, setSchedule] = useState<IGetDataInComponents>(
		{} as IGetDataInComponents
	);
	const [calendar, setCalendar] = useState({
		day: 0,
		month: 0,
		year: dayjs().year(),
	});
	const [formSchedule, setFormSchedule] = useState({
		title: "",
		start: "",
		end: "",
		withServicesBarberId: "",
		withUserClientId: user.id,
		withBarberId: "",
		withBarbershopId: barbershopId,
	});

	function getDataInComponents({
		barber,
		service,
		date,
	}: IGetDataInComponents) {
		if (service == undefined) {
			setIsCorrect(false);
			return toast.error("O serviço não foi selecionado");
		}

		if (date === undefined || (date.day === 0 && date.hour === 0)) {
			setIsCorrect(false);
			return toast.error("A Data e hora não foram informados");
		}

		if (barber == undefined) {
			setIsCorrect(false);
			return toast.error("O Profissional não foi selecionado");
		}

		setIsCorrect(true);
		setFormSchedule({
			...formSchedule,
			start: dayjs(
				new Date(
					date.year,
					date.month,
					date.day,
					date.hour,
					date.minute
				)
			).toString(),
			end: dayjs(
				new Date(
					date.year,
					date.month,
					date.day,
					date.hour,
					date.minute + parseInt(service.duration)
				)
			).toString(),
			withBarberId: barber.id,
			withServicesBarberId: service.id,
		});
	}

	function setBarber(barber: IBarberResponse) {
		setSchedule({ ...schedule, barber });
	}

	function setService(service: IBarberServiceResponse) {
		setSchedule({ ...schedule, service });
	}

	function setDate(date: IDate) {
		// console.log({ ...schedule, date });
		setSchedule({ ...schedule, date });
	}

	return (
		<div className="ml-44 mr-16">
			{/* TODO torna-lo em um componente com cores e estilização do sistema */}
			<ToastContainer theme="colored"></ToastContainer>
			<header>
				<div>
					<ul className="flex mt-4">
						<ServiceList setService={setService} />
					</ul>
				</div>
				<aside>
					{/* Tempo e detalhes de cada serviço a mostra aqui */}
				</aside>
			</header>
			<main className="mt-4 flex justify-center items-center">
				<div className="flex justify-center gap-8 items-center">
					<MyCalendar onChange={setCalendar} />
					{/* TODO reslver a situação do dia, mês e ano que n está sendo filtrado */}
					<HourList dateSelected={calendar} setDate={setDate} />
				</div>
			</main>
			<footer>
				<BarberList barbershopId={barbershopId} setBarber={setBarber} />
				<Button
					disabled={isCorrect}
					className="hover:bg-primary hover:text-dark"
					onClick={() => getDataInComponents(schedule)}
				>
					Agendar
				</Button>
				<Button onClick={() => console.log(formSchedule)}>
					consultar
				</Button>
			</footer>
		</div>
	);
}
