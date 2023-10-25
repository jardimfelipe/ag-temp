import React, { useEffect, useMemo, useState } from "react";
import { ServiceBarbersService } from "../../service/servicesBarber/service-barber";
import { IBarberServices } from "../../service/schedule/types";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
	setService?: (date: IBarberServices) => void;
	barbershopId: string;
};

const serviceListService = new ServiceBarbersService();

export function ServiceList({ setService, barbershopId }: Props) {
	const [serviceList, setServiceList] = useState<IBarberServices[]>([]);
	const [serviceId, setServiceId] = useState("");
	const [loading, setLoading] = useState<Boolean>(true);
	async function getServices() {
		setServiceList(await serviceListService.getAllService(barbershopId));
		setLoading(false);
	}

	const serviceMemory = useMemo(() => serviceList, [serviceList]);
	useEffect(() => {
		getServices();
	}, []);

	function selectService(service: IBarberServices) {
		setService?.(service);
	}

	function handleService(data: any, id: string) {
		setServiceId(id);
		selectService({ ...data });
	}

	if (loading) {
		return (
			<div className="flex justify-center p-8 flex-1 bg-darkness-plus rounded-lg">
				<CircularProgress color="inherit"></CircularProgress>
			</div>
		);
	}

	return (
		<div className="flex-1 bg-darkness-plus rounded-lg">
			{serviceMemory.map((service, id) => {
				return (
					<button
						key={`service-${id}`}
						onClick={() => handleService(service, service.id)}
					>
						<li
							key={"key-" + service.id}
							className={`flex flex-col p-4 m-4 base-an rounded-lg bg-darkness hover:shadow-lg ${service.id === serviceId
								? "bg-graydark font-semibold"
								: undefined
								}`}
						>
							<div>Nome: {service.name}</div>
							<div>Duração: {service.duration} minutos</div>
							<div>Preço: R${service.price}</div>
						</li>
					</button>
				);
			})}
		</div>
	);
}
