import { MapPin } from "@phosphor-icons/react";
import React from "react";
import Button from "../../components/Button";

// type Props = {}

export function Feeds() {
	return (
		<div>
			<main className="flex flex-col items-center">
				{/* <Search className="w-96 mt-4 mb-8" /> */}
				<section className="first:p-0 first:overflow-hidden bg-darkness rounded-lg shadow-lg w-96">
					{/* <!-- Image of feed --> */}
					<div className="flex flex-col">
						<div className="flex justify-between">
							<div className="flex items-center">
								{/* <!-- Logo da barbearia --> */}
								{/* <font-awesome-icon icon="fa-solid fa-users-rectangle" className="ms-2 mt-1 w-12 h-12" /> */}

								{/* <!-- Nome da barbearia --> */}
								<span className="ms-2 text-secondary base-an hover:text-white">
									Barbearia Exemplar
								</span>
							</div>
							<Button>
								{/* <!-- O Id do path é da barbearia --> */}
								Agendar
								{/* <router-link to="/schedule/a6d4da48-5b5e-4051-a395-70f314e9c74a">Agendar</router-link> */}
							</Button>
						</div>
						<figure>
							<img src="https://i.pinimg.com/564x/b1/bc/cc/b1bccc53502e6b53f38e29f9dac13afd.jpg" />
						</figure>
					</div>
					<div className="flex justify-between items-center py-2 px-3">
						{/* <!-- actions in feed --> */}
						<div className="flex items-center gap-4">
							icone do whats
							<span className="flex items-center">
								<MapPin size={20} className="ml-4 mr-2" />
								2km
							</span>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
