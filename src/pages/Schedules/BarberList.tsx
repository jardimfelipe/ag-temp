import React, { useEffect, useMemo, useState } from "react";
// import { useAppSelector } from "../../store/main.store";
import { BarberService, IBarberResponse } from "../../service/barber";
import { UserService } from "../../service/user/count-profile";
import Button from "../../components/Button";
// import { twMerge } from "tailwind-merge";
import { CircularProgress } from "@mui/material";
import { ScheduleService } from "../../service/schedule";
import dayjs from "dayjs";

type Props = {
	barbershopId: string;
	setBarber: (data: IBarberResponse) => void;
	dateScheduled: any;
};

const barberService = new BarberService();
const userService = new UserService();
const scheduleService = new ScheduleService();

export function BarberList({ barbershopId, setBarber, dateScheduled }: Props) {
	const [loading, setLoading] = useState<boolean>(true);
	const [barberList, setBarberList] = useState<IBarberResponse[]>([]);
	const [isScheduled, setIsScheduled] = useState([]);
	const barberListInMemory = useMemo(() => barberList, [barberList]);

	async function setInBarberList() {
		const userWithBarber = await barberService.getBarber(barbershopId);
		const barberListService = [];
		for (let barbers of userWithBarber) {
			barberListService.push(
				await userService.GetUserCurrent(barbers.userId)
			);
		}
		setBarberList(barberListService);
		setLoading(false);
	}

	// Para verificar se determinado Barber já está ocupado
	function filterBarberPerDateScheduled(date: any, thisSchedule: any) {
		// Organiza os dados para serem analizados
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
		let isTrue: any[] = [];
		let isAllTrue;

		console.log(simpleSchedule);
		simpleSchedule.filter((dateSchedule: any, i: number) => {
			const dateScheduleKeys = Object.keys(dateSchedule.start);
			console.log(dateScheduleKeys);

			for (let j: number = 0; j <= dateScheduleKeys.length; j++) {
				if (
					dateSchedule[dateScheduleKeys[j]] ===
					date[dateScheduleKeys[j]]
				) {
					return (isTrue[j] = true);
				}
			}
		});

		// console.log(test);
	}

	useEffect(() => {
		scheduleService.getSchedule(barbershopId).then((response) => {
			filterBarberPerDateScheduled(dateScheduled, response);
			setIsScheduled(response);
		});
		setInBarberList();
	}, []);

	useEffect(() => {
		filterBarberPerDateScheduled(dateScheduled, isScheduled);
	}, [dateScheduled]);

	if (loading) {
		return (
			<div className="flex justify-center mt-4 p-8 flex-1 bg-darkness-plus rounded-lg">
				<CircularProgress color="inherit"></CircularProgress>
			</div>
		);
	}

	function copyUserId(barber: any) {
		console.log(isScheduled, dateScheduled);
		navigator.clipboard.writeText(barber.id);
	}

	function selectBarber(barber: IBarberResponse) {
		setBarber(barber);
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
