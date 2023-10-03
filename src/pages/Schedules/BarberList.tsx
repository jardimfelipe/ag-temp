import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/main.store";
import { BarberService, IBarberResponse } from "../../service/barber";
import { UserService } from "../../service/user/count-profile";
import Button from "../../components/Button";
import { twMerge } from "tailwind-merge";
import { CircularProgress } from "@mui/material";

type Props = {
	barbershopId: string;
	setBarber: (data: IBarberResponse) => void;
};

interface IBarberList {
	id: string;
	name: string;
	cpf: string;
}

const barberService = new BarberService();
const userService = new UserService();

export function BarberList({ barbershopId, setBarber }: Props) {
	const [loading, setLoading] = useState<boolean>(true);
	const [barberList, setBarberList] = useState<IBarberResponse[]>([]);
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

	useEffect(() => {
		setInBarberList();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center mt-4 p-8 flex-1 bg-darkness-plus rounded-lg">
				<CircularProgress color="inherit"></CircularProgress>
			</div>
		);
	}

	function copyUserId(barber: any) {
		navigator.clipboard.writeText(barber.id);
	}

	function selectBarber(barber: IBarberResponse) {
		setBarber(barber);
	}

	function selectRandomBarber() {
		return ((Math.random() * 100) / barberListInMemory.length).toFixed(0);
	}

	return (
		<div className="flex flex-col p-4 pt-1 mt-4 rounded-lg bg-darkness-plus">
			<div className="flex justify-between items-center">
				<Button className="w-44 my-2" onClick={selectRandomBarber}>
					Selecionar Aleatoriamente
				</Button>
				<span>Selecionar um Profissional para te atender</span>
				<div></div>
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
