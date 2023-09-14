import { useAppSelector } from "../../store/main.store";
import {ShareNetwork} from "@phosphor-icons/react"

type Props = {};

export function PerfilBase({}: Props) {
	const user = useAppSelector((state) => state.user);

	function copyDataInClipboard() {
		navigator.clipboard.writeText(user.id);
	}

	return (
		<div className="flex flex-col h-full items-center md:ml-32 md:mr-10">
			{/* <!-- TODO preciso fazer uma forma do menu no header desaparecer no modo mobile --> */}
			<figure className="flex items-center w-11/12 p-2 rounded-full mt-20 md:w-10/12 bg-darkness">
				{/* <!-- Imagem de usuário --> */}
				<div className="flex w-1/2 ">
					<div className="w-1/5 p-6 rounded-full bg-slate-50 md:w-1"></div>
					<div className=" hidden md:block md:flex md:items-center md:ms-2 ">nome de usuário</div>
				</div>
				<div className=" flex w-1/2 mr-4  justify-end ">
					<ShareNetwork onClick={()=> copyDataInClipboard()} className="text-4xl"/>
				</div>
			</figure>
			<section className="grid grid-cols-4 grid-rows-8 h-full gap-4  border-0 border-green-500 w-11/12 md:w-10/12 ">
				<div className="row-start-1 md:mt-24 col-span-4 row-span-4 px-0.5 mt-10 border-0 border-sky-700">
					<>
					 	<ul v-if="!handleEditPerfil">
							<li className="flex items-center rounded-lg bg-darkness-plus w-full">
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
				</div>
			</section>
		</div>
	);
}
