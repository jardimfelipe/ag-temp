import React, { useEffect, useMemo, useState } from "react";
// import { useAppSelector } from "../../store/main.store";
import { BarberService, IBarberResponse } from "../../service/barber";
import { UserService } from "../../service/user/count-profile";
import Button from "../../components/Button";
// import { twMerge } from "tailwind-merge";
import { CircularProgress } from "@mui/material";
import { ScheduleService } from "../../service/schedule";
import dayjs from "dayjs";
import { toast } from "react-toastify";

type Props = {
	barbershopId: string;
	setBarber: (data: IBarberResponse) => void;
	dateScheduled: any;
};

interface ScheduleParameters {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
}

interface ScheduleItem {
	start: ScheduleParameters;
	withBarberId: string; // Substitua 'string' pelo tipo real do ID do barbeiro
}

const barberService = new BarberService();
const userService = new UserService();
const scheduleService = new ScheduleService();

export function BarberList({ barbershopId, setBarber, dateScheduled }: Props) {
	const [loading, setLoading] = useState<boolean>(true);
	const [isFullScheduledTime, setIsFullScheduledTime] =
		useState<boolean>(false);
	const [barberList, setBarberList] = useState<IBarberResponse[]>([]);
	const [isScheduled, setIsScheduled] = useState([]);
	const [barberSelected, setBarberSelected] = useState({});

	const compareDates = (date: any) => {
		const { year, month, day, hour, minute } = dateScheduled
		const scheduledDate = dayjs(`${year}/${month + 1}/${day} ${hour}:${minute}`)
		return dayjs(date).isSame(dayjs(scheduledDate))
	}
	const barberListInMemory = useMemo(() => {
		const isNotAllSelected = Object.keys(dateScheduled).some(key => key !== 'minute' && dateScheduled[key] === 0)
		if (!isScheduled.length || isNotAllSelected) return barberList
		const filteredBarbesBySchedule = barberList.filter(barber => {
			const barderHasSchedule = !!isScheduled.find(({ withUserClientId }) => barber.id === withUserClientId)
			if (!barderHasSchedule) return true
			return !isScheduled.some(({ start }) => compareDates(start))
		})
		return filteredBarbesBySchedule
	}, [barberList, dateScheduled]);

	// Para verificar se determinado Barber já está ocupado
	function findBarberStatus(
		scheduleParams: ScheduleParameters,
		simpleSchedule: ScheduleItem[]
	): { withBarberId: string; isOccupied: boolean } | null {
		// Percorre o array simpleSchedule
		for (const schedule of simpleSchedule) {
			// Compara os parâmetros fornecidos com a data de início do agendamento
			if (
				schedule.start.year === scheduleParams.year &&
				schedule.start.month === scheduleParams.month &&
				schedule.start.day === scheduleParams.day &&
				schedule.start.hour === scheduleParams.hour &&
				schedule.start.minute === scheduleParams.minute
			) {
				// Retorna o objeto com o ID do barbeiro e se está ocupado
				return {
					withBarberId: schedule.withBarberId,
					isOccupied: true,
				};
			}
		}

		// Se nenhum agendamento correspondente for encontrado, retorna null
		return null;
	}

	function filterBarberPerDateScheduled(
		thisSchedule: any,
		scheduleParamsToCheck: ScheduleParameters
	) {
		// Organiza os dados para serem analisados
		const simpleSchedule = thisSchedule.map((schedule: any) => {
			return {
				start: {
					year: dayjs((schedule as any).start).year(),
					month: dayjs((schedule as any).start).month(),
					day: dayjs((schedule as any).start).date(),
					hour: dayjs((schedule as any).start).hour(),
					minute: dayjs((schedule as any).start).minute(),
				},
				withBarberId: (schedule as any).withBarberId,
			};
		});

		// Encontrar o status do barbeiro para a data fornecida
		const barberStatus = findBarberStatus(
			scheduleParamsToCheck,
			simpleSchedule
		);

		if (barberStatus) {
			return {
				barbershopId: barberStatus.withBarberId,
				isOccupied: barberStatus.isOccupied,
			};
		} else {
			return {
				barbershopId: simpleSchedule.withBarberId,
				isOccupied: false,
			};
		}
	}

	async function setInBarberList() {
		const userWithBarber = await barberService.getBarber(barbershopId);
		const barberListService = [];
		for (let barbers of userWithBarber) {
			barberListService.push(
				await userService.GetUserCurrent(barbers.userId)
			);
		}

		console.log(filterBarberPerDateScheduled(isScheduled, dateScheduled));
		setBarberList(barberListService);
		setLoading(false);
	}

	useEffect(() => {
		scheduleService.getSchedule(barbershopId).then((response) => {
			setIsScheduled(response);
		});
		setInBarberList();
	}, []);

	useEffect(() => {
		/* filterBarberPerDateScheduled(isScheduled); */
		if (dateScheduled.hour != null) {
			setIsFullScheduledTime(true);
		}
	}, [dateScheduled]);

	if (loading) {
		return (
			<div className="flex justify-center mt-4 p-8 flex-1 bg-darkness-plus rounded-lg">
				<CircularProgress color="inherit"></CircularProgress>
			</div>
		);
	}

	function copyUserId(barber: any) {
		console.log(isScheduled);
		navigator.clipboard.writeText(barber.id);
	}

	function selectBarber(barber: IBarberResponse) {
		/* verifyBarberId(barber.id);
		toast.info(
			`${barber.name} ${verifyBarberId(barber.id) ? "true" : "false"}`
		); */
		setBarberSelected(barber);
		setBarber(barber);
		filterBarberPerDateScheduled(isScheduled, dateScheduled);
	}

	// function selectRandomBarber() {
	// 	return ((Math.random() * 100) / barberListInMemory.length).toFixed(0);
	// }

	return (
		<div className="flex flex-col p-4 pt-1 mt-4 rounded-lg bg-darkness-plus">
			<div className="flex justify-center py-4 items-center text-lg font-bold text-secondary">
				{/* <Button className="w-44 my-2" onClick={selectRandomBarber}>
					Selecionar Aleatoriamente
				</Button> */}
				<span>Selecionar um Profissional para te atender</span>
				{/* <div></div> */}
			</div>
			<span className="first:mt-0">
				{barberListInMemory.map((barber) => {
					return (
						<span
							className="flex p-2 flex-1 rounded-lg justify-between bg-darkness mt-2"
							key={Math.random()}
						>
							<Button
								className="hover:bg-primary hover:text-dark"
								onClick={() => selectBarber(barber)}
							// disabled
							>
								<span>{barber.name}</span>
							</Button>
							<Button
								className="hover:bg-primary hover:text-dark"
								onClick={() => copyUserId(barber)}
							>
								Copiar Id
							</Button>
						</span>
					);
				})}
			</span>
		</div>
	);
}
6;
