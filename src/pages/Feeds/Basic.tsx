import { MapPin, WhatsappLogo } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

// type Props = {}
// const barbershopService = new BarbershopService();
export function Feeds() {
	return (
		<div className={`${config.theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
			<main className="flex flex-col items-center">
				{/* <Search className="w-96 mt-4 mb-8" /> */}
				{barbershopsList.map((establishment) => (
					<section
						className="first:p-0 first:overflow-hidden dark:bg-darkness shadow-lg rounded-lg w-72 m-14 sm:m-10"
						key={
							establishment.barbershop.id +
							"-" +
							establishment.barbershop.images[0].id
						}
					>
						{/* <!-- Feed --> */}
						<div className="flex flex-col">
							<div className="flex justify-between">
								<div className="flex items-center">
									{/* <!-- Logo da barbearia --> */}
									{/* <font-awesome-icon icon="fa-solid fa-users-rectangle" className="ms-2 mt-1 w-12 h-12" /> */}

									{/* <!-- Nome da barbearia --> */}
									<span className="ms-2 text-secondary base-an hover:text-white">
										{establishment.barbershop.name}
									</span>
								</div>
								<Link
									to={`schedule/${establishment.barbershop.id}`}
								>
									<Button>
										{/* <!-- O Id do path é da barbearia --> */}
										Agendar
										{/* <router-link to="/schedule/a6d4da48-5b5e-4051-a395-70f314e9c74a">Agendar</router-link> */}
									</Button>
								</Link>
							</div>
							{/* Imagem do feed */}
							<figure>
								<img
									src={establishment.barbershop.images[0].url}
								/>
							</figure>
						</div>
						<div className="flex py-1 px-1">
							{/* <!-- actions in feed --> */}
							<div className="flex-1 p-1">
								<WhatsappLogo size={20} />
							</div>
							<div className="flex-1 items-center p-1 text-right">
								<MapPin
									className="inline"
									style={{ marginTop: "-4px" }}
									size={20}
								/>
								<span className="ml-1 mb-2">
									{
										establishment.distanceKm
											.toString()
											.split(".")[0]
									}{" "}
									Km
								</span>
							</div>
						</div>
					</section>
				))}
			</main>
		</div>
	);
}
