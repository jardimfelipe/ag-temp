import { useNavigate, useRouteError } from "react-router-dom";
import Header from "../components/Layout/Header";
import Button from "../components/Button";

export default function ErrorPage() {
	const error: any = useRouteError();
	const navigate = useNavigate();
	console.error(error);

	return (
		<div
			className="flex justify-center items-center w-screen h-screen"
			id="error-page"
		>
			<span className="mr-2">
				Parou longe viajante, aqui o caminho de volta para o caminho
			</span>
			<button
				className="p-4 border-2 rounded-lg base-an shadow bg-darkness-plus border-darkness hover:bg-darkness hover:shadow-lg"
				onClick={() => navigate("/feed")}
			>
				Voltar para o início
			</button>
		</div>
	);
}
