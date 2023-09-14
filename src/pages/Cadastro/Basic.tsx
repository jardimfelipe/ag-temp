import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAppSelector } from "../../store/main.store";
import { useAppDispatch } from "../../store/main.store";
import InputMask from "react-input-mask";
import { insertUser } from "../../store/reducer/user.reducer";
export default function Login() {
	const [email, setEmail] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [contato, setContato] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const theme = useAppSelector((state) => state.user.config.theme);
    const dispatch = useAppDispatch();
    const onSubmit = ()=>{
        dispatch(insertUser({email : email, name : nome, contact : contato, password : password}))
    }
	return (
		<section className={`flex justify-center items-center h-full ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
			<div className={`flex flex-col items-center p-5 rounded-lg border-2 border-graydark ${theme === 'dark' ? 'bg-darkness text-light' : 'bg-lightness'}`}>
				<span className="mb-10 text-base md:text-lg dark:text-light">
					Cadastro
				</span>
				<div>
                    <Input
						title="Nome"
						value={nome}
						onChange={(e) => setNome(e.currentTarget.value)}
					></Input>
					<Input
						title="Email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
					></Input>
                    <div>
                        <label className="ml-2 md:mb-1 md:text-lg dark:text-light">
                            Contato
                        </label>
                    </div>
                    <InputMask
                        type = "tel"
                        mask="(99) 99999-9999"
						title="Contato"
						value={contato}
                        className={`rounded-lg placeholder:text-placeholder p-2 m-2 text-white bg-darkness border-2 ring-2 ring-transparent border-graydark base-an focus:border-primary focus:ring-primary`}
                        placeholder="(00) 12345-6789"
                        onChange={(e : any) => setContato(e.currentTarget.value)}
					></InputMask>
					<Input
						title="Senha"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					></Input>
					<div className="flex w-11/13 justify-between">
						<Button className="flex ml-2 mt-10 ml-2 py-3 px-8" onClick={()=> onSubmit()}>
							Cadastrar
						</Button>
					</div>
					
				</div>
			</div>
		</section>
	);
}
