import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import { login } from "../../store/reducer/user.reducer";
import { useNavigate } from "react-router-dom";

// type Props = {}

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();

	function onSubmit() {
		dispatch(login({ email, password }));
	}

	useEffect(() => {
		if (user.id != "") {
			navigate("/feed");
		}
	}, [user]);

	return (
		<section className="flex justify-center items-center h-full">
			<div className="flex flex-col items-center p-5 rounded-lg border-2 border-graydark bg-darkness">
				<span className="mb-10 text-base md:text-lg dark:text-light">
					Login
				</span>
				<div>
					<Input
						title="Email"
						value={email}
						fnChange={(e) => setEmail(e.currentTarget.value)}
					></Input>
					<Input
						title="Senha"
						type="password"
						value={password}
						fnChange={(e) => setPassword(e.currentTarget.value)}
					></Input>
					<Button style="ml-2 mt-10 py-3 px-8" onClick={onSubmit}>
						Login
					</Button>
				</div>
			</div>
		</section>
	);
}
