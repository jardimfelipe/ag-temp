import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAppSelector } from "../../store/main.store";
import { useAppDispatch } from "../../store/main.store";
import InputMask from "react-input-mask";
import { insertUser } from "../../store/reducer/user.reducer";
import { useNavigate } from "react-router-dom";
export default function Login() {
	const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [contact, setContact] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [warning , setWarning] = useState<string>("");
	const [colorWarning , setColorWarning] = useState<string>("");
	const theme = useAppSelector((state) => state.user.config.theme);
    const navigate = useNavigate();
	const dispatch = useAppDispatch();
    const onSubmit = ()=>{
		if (!validarcontact(contact)) {
			setColorWarning("text-red-500");
			setWarning("Contato é obrigatório")
			return;
		}

		if (password === "") {
			setColorWarning("text-red-500");
			setWarning("Senha é obrigatório")
			return;
		}
		dispatch(insertUser({email : email, name : name, contact : contact, password : password}));
		setColorWarning("");
		setWarning("Usuário Criado");
	}

	const backToLogin = ()=>{
		navigate("/login");
		setWarning("");
	}
	const validarcontact = (valor: any) => {
		const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
		return regex.test(valor);
	  };
	return (
		<section className={`flex justify-center items-center h-full ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
			<div className={`flex flex-col items-center p-5 rounded-lg border-2 border-graydark ${theme === 'dark' ? 'bg-darkness text-light' : 'bg-lightness'}`}>
				<span className="mb-10 text-base md:text-lg dark:text-light">
					Cadastro
				</span>
				<div>
				<div>
                    <label className="ml-2 md:mb-1 md:text-lg dark:text-light">
                            Contato*
                        </label>
                    </div>
                    <InputMask
                        type = "tel"
                        mask="(99) 99999-9999"
						title="contact"
						value={contact}
                        className={`rounded-lg placeholder:text-placeholder p-2 m-2 text-white bg-darkness border-2 ring-2 ring-transparent border-graydark base-an focus:border-primary focus:ring-primary`}
                        placeholder="(99) 99999-9999"
                        onChange={(e : any) => setContact(e.currentTarget.value)}
					></InputMask>
					<Input
						title="Senha*"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					></Input>
                    <Input
						title="name"
						value={name}
						onChange={(e) => setName(e.currentTarget.value)}
					></Input>
					<Input
						title="Email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
					></Input>
					<div className={`w-48 ml-2 text-left break-all text-md ${colorWarning}`}>
						{warning}
					</div>
					<div className="flex w-11/13 justify-between">
						<Button className="flex ml-2 mt-10 ml-2 py-3 px-8" onClick={()=> onSubmit()}>
							Cadastrar
						</Button>
						<Button className="flex mr-2 mt-10 ml-2 py-3 px-8" onClick={()=> backToLogin()}>
							Voltar
						</Button>
					</div>
					
				</div>
			</div>
		</section>
	);
}
