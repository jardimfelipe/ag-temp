import React from "react";

type Props = {};

export function BaseSchedule({}: Props) {
	return (
		<div className="ml-44">
			<header>
				<div>
					{/* Lista de serviços de forma resumida, blocos pequenos */}
				</div>
				<aside>{/* Tempo de cada serviço a mostra aqui */}</aside>
			</header>
			<main>
				{/* Data e hora (ainda precisa ser planejado como será mostrado em layout) */}
			</main>
			<footer>
				{/* Barbeiro responsável ou barbeiro randomico */}
				<button>{/* Agendar */}</button>
			</footer>
		</div>
	);
}
