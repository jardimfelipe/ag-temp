import React, { useEffect, useMemo, useState } from "react";
import { ServiceBarbersService } from "../../service/servicesBarber/service-barber";
import { IBarberServices } from "../../service/schedule/types";

type Props = {
	setService: (date: IBarberServices) => void;
};

const serviceListService = new ServiceBarbersService();

export function ServiceList({ setService }: Props) {
	const [serviceList, setServiceList] = useState<IBarberServices[]>([]);
	const [loading, setLoading] = useState<Boolean>(true);
	async function getServices() {
		setServiceList(await serviceListService.getAllService());
		setLoading(false);
	}

	const serviceMemory = useMemo(() => serviceList, [serviceList]);
	useEffect(() => {
		getServices();
	}, []);

	function selectService(service: IBarberServices) {
		setService(service);
	}

	if (loading) {
		return <>Carregando...</>;
	}

	return (
		<div>
			{serviceMemory.map((service, id) => {
				return (
					<button
						key={`service-${id}`}
						className="text-left"
						onClick={() => selectService({ ...service })}
					>
						<li
							key={"key-" + service.id}
							className="flex flex-col p-4 m-4 rounded-lg bg-darkness hover:shadow-lg"
						>
							<div>Nome: {service.name}</div>
							<div>Duração: {service.duration}</div>
							<div>Preço: {service.price}</div>
						</li>
					</button>
				);
			})}
		</div>
	);
}
