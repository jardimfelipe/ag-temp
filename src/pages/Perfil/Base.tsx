import React, { useState } from "react";
import { useAppSelector } from "../../store/main.store";
import { Edit } from "./Edit";
import { ShareNetwork } from "@phosphor-icons/react";

type Props = {};

export function PerfilBase({ }: Props) {
	const [handleEditPerfil, setHandleEditPerfil] = useState(false);
	const user = useAppSelector((state) => state.user);

	function copyDataInClipboard() {
		navigator.clipboard.writeText(user.id);
	}

	return (
		<div className="flex flex-col h-full md:ml-32 mt-24 md:mt-4">
			{/* <!-- TODO preciso fazer uma forma do menu no header desaparecer no modo mobile --> */}
			<figure className="flex items-center md:p-3 p-2 md:mx-20 md:bg-darkness md:rounded-full">
				{/* <!-- Imagem de usuário --> */}
				<div className="p-6 rounded-full bg-slate-50"></div>
				<div className="ms-2">nome de usuário</div>
			</figure>
			<section className="grid md:grid-cols-3 grid-rows-8 h-full gap-4 mt-2 p-6 border-0 border-green-500">
				<div className="md:row-start-2 md:col-span-2 row-span-5 p-6 border-0 border-sky-700">
					<div className="flex items-center justify-between mb-12 p-2 bg-darkness-plus rounded-lg">
						{/* <!-- TODO Adicionar ícones nestes buttons --> */}
						<button
							className="p-2 px-4 base-an hover:bg-primary rounded-lg"
							onClick={() =>
								setHandleEditPerfil(!handleEditPerfil)
							}
						>
							{handleEditPerfil ? "Voltar" : "Editar"}
						</button>
						<button
							className="flex justify-center p-2 px-4 base-an hover:bg-primary rounded-lg"
							onClick={copyDataInClipboard}
						>
							Compartilhar
							<div className="ml-2 mt-[2px]">
								<ShareNetwork size={20} />
							</div>
						</button>
					</div>
					{handleEditPerfil ? (
						<>
							<Edit form={user}></Edit>
						</>
					) : (
						<>
							<ul v-if="!handleEditPerfil">
								<li className="flex items-center rounded-lg bg-darkness-plus">
									<div className="p-2 me-2 overflow-hidden">
										Nome:
									</div>{" "}
									{user.name}
								</li>
								<li className="flex items-center rounded-lg bg-darkness-plus mt-6">
									<div className="p-2 me-2 overflow-hidden">
										Idade:
									</div>{" "}
									{user.age}
								</li>
								<li className="flex items-center rounded-lg bg-darkness-plus mt-6">
									<div className="p-2 me-2 overflow-hidden">
										E-mail:
									</div>{" "}
									{user.email}
								</li>
								<li className="flex items-center rounded-lg bg-darkness-plus mt-6">
									<div className="p-2 me-2 overflow-hidden">
										CPF:
									</div>{" "}
									{user.cpf ?? "Não informado"}
								</li>
							</ul>
						</>
					)}
				</div>
				<div className="p-6 md:row-start-1 md:col-start-3 md:row-span-6 bg-darkness rounded-xl">
					<button className="p-2 px-4 base-an hover:bg-primary rounded-lg">
						Testa toast
					</button>
				</div>
			</section>
		</div>
	);
}
