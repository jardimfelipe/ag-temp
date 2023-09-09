import React, { useEffect, useMemo, useState } from "react";
import { ServiceBarbersService } from "../../service/servicesBarber/service-barber";

type Props = {};

interface IServiceList {
	id: string;
	name: string;
	description: string;
	duration: number;
	price: number;
	barbershopId: string;
}

const serviceListService = new ServiceBarbersService();

export function ServiceList({}: Props) {
	const [serviceList, setServiceList] = useState<IServiceList[]>([]);
	const [loading, setLoading] = useState<Boolean>(true);
	const [serviceSelected, setServiceSelected] = useState({});
	async function getServices() {
		console.log("passou aqui");
		setServiceList(await serviceListService.getAllService());
		setLoading(false);
	}

	const serviceMemory = useMemo(() => serviceList, [serviceList]);
	useEffect(() => {
		getServices();
	}, []);

	function selectService(service: any) {
		setServiceSelected(service);
		console.log(serviceSelected);
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
