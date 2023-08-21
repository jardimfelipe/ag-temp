import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../store/main.store";
import { alterUser } from "../../store/reducer/user.reducer";

interface IEdit {
	form: {
		id: string;
		name: string;
		email: string;
		age: number;
		cpf: string;
	};
}

export function Edit({ form }: IEdit) {
	const user = useAppSelector((state) => state.user);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState(0);
	const [cpf, setCpf] = useState("");
	const dispatch = useAppDispatch();
	const newForm = {
		id: user.id,
		name,
		email,
		age,
		cpf,
	};
	// função para retirar chave e valor não informados

	useEffect(() => {
		setName(form.name);
		setAge(form.age);
		setCpf(form.cpf);
		setEmail(form.email);
	}, [form]);

	function handlePathcNewForm() {
		//@ts-ignore
		dispatch(alterUser(newForm));
	}

	return (
		<div>
			<Input
				title="Nome"
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
			></Input>
			<Input
				title="Email"
				value={email}
				onChange={(e) => setEmail(e.currentTarget.value)}
			></Input>
			<Input
				title="Idade"
				value={age}
				onChange={(e) => setAge(parseInt(e.currentTarget.value))}
			></Input>
			<Input
				title="CPF"
				value={cpf}
				onChange={(e) => setCpf(e.currentTarget.value)}
			></Input>
			<Button onClick={handlePathcNewForm}>Editar Perfil</Button>
		</div>
	);
}
