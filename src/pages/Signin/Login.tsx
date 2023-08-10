import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { userStore } from "../../store/store";

// type Props = {}

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [pass, setPass] = useState<string>("");
	const { user, login } = userStore();

	useEffect(() => {
		user.email = email;
	}, [email]);

	return (
		<section className="flex justify-center items-center h-full">
			<div className="flex flex-col items-center p-5 rounded-lg border-2 border-graydark bg-darkness">
				<span className="mb-10 text-base md:text-lg dark:text-light">
					Login
				</span>
				<span>
					<Input
						title="Email"
						value={email}
						fnChange={(e) => setEmail(e.currentTarget.value)}
					></Input>
					<Input
						title="Senha"
						type="password"
						value={pass}
						fnChange={(e) => setPass(e.currentTarget.value)}
					></Input>
				</span>
				{/* <div className="flex flex-col gap-2">
				<Input :data-input="form.email" title="Email" placeholder="Exemplo@Email.com"
					@update="(email) => form.email = email"></Input>
				<div className="flex">
					<div className="flex flex-col">
						<label>Senha</label>
						<Input :type-input="handleVisibility ? 'text' : 'password'" :data-input="form.password"
							placeholder="Sua Senha" @update="(password) => form.password = password"></Input>
					</div>
					<button className="p-2 ml-2 bg-darkness-plus rounded-lg"
						onClick="() => handleVisibility = !handleVisibility">
						<font-awesome-icon icon="fa-solid fa-eye" />
					</button>
				</div>
			</div> */}
				<div className="mt-10">
					<Button style="py-3 px-8">Login</Button>
				</div>
			</div>
		</section>
	);
}
