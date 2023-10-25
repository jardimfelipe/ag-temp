import { useState } from "react";
import { useAppSelector } from "../../store/main.store";
import dayjs from "dayjs";
import { HourList } from "./HourList";
import { IDate, MyCalendar } from "../../components/Calendar";
import { BarberList } from "./BarberList";
import { ServiceList } from "./ServiceList";
import { IBarberResponse } from "../../service/barber";
import { IBarberServices as IBarberServiceResponse } from "../../service/schedule/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScheduleService } from "../../service/schedule";
import { IScheduleModel } from "../../store/types/schedule";
import "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import Button from "../../components/Button";

dayjs.locale("pt-br");

type Props = {
	barbershopId: string;
};

interface IGetDataInComponents {
	barber?: IBarberResponse & {
		isAllOccupied?: boolean;
	};
	service?: IBarberServiceResponse;
	date?: IDate;
}

const scheduleService = new ScheduleService();

export function ScheduleComponent({ barbershopId }: Props) {
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.user);
	const [schedule, setSchedule] = useState<IGetDataInComponents>(
		{} as IGetDataInComponents
	);
	const [calendar, setCalendar] = useState({
		day: 0,
		month: 0,
		year: dayjs().year(),
		hour: 0,
		minute: 0,
	});

	async function setDataInDatabase(form: IScheduleModel) {
		await scheduleService.createNewSchedule(form);
	}

	async function getDataInComponents({
		barber,
		service,
		date,
	}: IGetDataInComponents) {
		let isCorrectForm = false;
		if (service == undefined) {
			isCorrectForm = false;
			return toast.error("O serviço não foi selecionado");
		}

		if (date === undefined || (date.day === 0 && date.hour === 0)) {
			isCorrectForm = false;
			return toast.error(
				"A Data e hora não foram informados ou o horário informado já está ocupado"
			);
		}

		if (barber == undefined) {
			isCorrectForm = false;
			return toast.error("O Profissional não foi selecionado");
		}

		const dateStartFormated = new Date(
			date.year,
			date.month,
			date.day,
			date.hour,
			date.minute
		);

		const dateEndFormated = new Date(
			date.year,
			date.month,
			date.day,
			date.hour,
			date.minute + 20
		);

		const intialName = `${user.name.split(" ")[0]} ${user.name.split(" ")[1]
			}`;

		isCorrectForm = true;
		const form: IScheduleModel = {
			title: `${intialName} ${service.name}`,
			start: dayjs(dateStartFormated).toDate(),
			end: dayjs(dateEndFormated).toDate(),
			withBarberId: barber.id,
			withServicesBarberId: service.id,
			withUserClientId: user.id,
			withBarbershopId: barbershopId,
		};

		await setDataInDatabase(form)
		navigateHandle()
	}

	function setBarber(barber: IBarberResponse) {
		setSchedule({ ...schedule, barber });
	}

	function setService(service: IBarberServiceResponse) {
		setSchedule({ ...schedule, service });
	}

	function setDate(date: IDate) {
		setCalendar({ ...calendar, ...(date as any) });
		setSchedule({ ...schedule, date });
	}

	function navigateHandle() {
		navigate("/schedule");
	}

	return (
		<div className="sm:ml-44 sm:mr-16">

			{/* TODO torna-lo em um componente com cores e estilização do sistema */}
			<header>
				<div>
					<ul className="flex mt-24 md:mt-4">
						<ServiceList
							setService={setService}
							barbershopId={barbershopId}
						/>
					</ul>
				</div>
				<aside>
					{/* Tempo e detalhes de cada serviço a mostra aqui */}
				</aside>
			</header>
			<main className="mt-4 flex justify-center items-center">
				<Grid spacing={1} container>
					<Grid item xs={12} md={10}>
						{/* O Dia, mês e ano estão sendo resolvidos nesse componente MyCalendar*/}
						<MyCalendar setCalendar={setCalendar} />
					</Grid>

					<Grid item xs={12} md={2}>
						{/* Depois do dia, mês e ano tiver ok, a hora e o minuto estão sendo resolvidos nesse componente HourList */}
						<HourList setDate={setDate} calendarData={calendar} />
					</Grid>
				</Grid>
			</main>
			<footer className="mb-4">
				<BarberList
					barbershopId={barbershopId}
					setBarber={setBarber}
					dateScheduled={calendar}
				/>
				<Stack>
					<Button
						className="my-4 bg-success hover:bg-primary hover:text-dark"
						onClick={() => getDataInComponents(schedule)}
					>
						Agendar
					</Button>
				</Stack>
			</footer>
		</div>
	);
}
