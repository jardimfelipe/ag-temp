import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import { login } from "../../store/reducer/user.reducer";
import { useNavigate } from "react-router-dom";

// type Props = {}

export default function Login() {
	const [contactFormat, setContactFormat] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	function onSubmit() {
		dispatch(login({ contactFormat, password }));
	}

	useEffect(() => {
		if (user.id !== "") {
			navigate("/feed");
			console.log("aqui")
		}
	}, [user]);

	return (
		<section className={`flex justify-center items-center h-full ${user.config.theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
			<div className={`flex flex-col items-center p-5 rounded-lg border-2 border-graydark ${user.config.theme === 'dark' ? 'bg-darkness' : 'bg-lightness'}`}>
				<span className="mb-10 text-base md:text-lg dark:text-light">
					Login
				</span>
				<div>
					<Input
						title="Telefone"
						value={contactFormat}
						onChange={(e) => setContactFormat(e.currentTarget.value)}
					></Input>
					<Input
						title="Senha"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					></Input>
					<div className="flex w-11/13 justify-between">
						<Button className="flex ml-2 mt-10 ml-2 py-3 px-8" onClick={onSubmit}>
							Login
						</Button>
						<Button className="flex  ml-2 mt-10 mr-2 py-3 px-8" onClick={() => navigate('/cadastro')}>
							Cadastrar
						</Button>
					</div>

				</div>
			</div>
		</section>
	);
}
