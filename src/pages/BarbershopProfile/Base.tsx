import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { X, User, ImageSquare } from "@phosphor-icons/react";
import { BarberService } from "../../service/barber";
import Button from "../../components/Button";
import Input from "../../components/Input";

type Props = {};

export function BarbershopProfile({}: Props) {
	const RouteParam = useParams();
	const [barber, setBarber] = useState(null);
	const fileInputProfileRef = useRef<HTMLInputElement | null>(null);
	const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Profile
  const handleImageChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  };
	const handleRemoveProfileImage = () => {
		setCurrentImage(null);
		setSelectedImage(null);
		if (fileInputProfileRef.current) {
      fileInputProfileRef.current.value = "";
    }
	};
	
	// Get profile info
	const barberService = new BarberService();
	useEffect(() => {
		barberService.getBarber(RouteParam.barbershopId || '')
			.then((barber) => {
				setBarber(barber)
			})
	}, []);

	// Posts
	const [modalCreatePost, setModalCreatePost] = useState(false);
	const fileInputPostRef = useRef<HTMLInputElement | null>(null);
	const [post, setPost] = useState({ image: '', description: '' });

	const handleImageChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
			reader.readAsDataURL(file);
      setPost(post => ({...post, image: URL.createObjectURL(file)}));
    }
  };
	const handleCancelPost = () => {
		setPost({ description: '', image: ''});
		if (fileInputPostRef.current) {
      fileInputPostRef.current.value = "";
    }
	};
	const onCloseModalPost = () => {
		handleCancelPost();
		setModalCreatePost(false);
	};
	const posts = [
		{ id: 1, image: 'https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg', description: 'Hello World' },
		{ id: 2, image: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=', description: 'Green' },
		{ id: 3, image: 'https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg', description: 'Hello World 2' },
	];

	return (
		<div className="max-w-5xl mx-auto px-5 py-10">
			{/* Profile */}
			<div className="flex justify-between items-center">
				<div className="flex gap-10">
					<div className="relative">
						{currentImage || selectedImage ? (
							<img
								src={currentImage || selectedImage}
								alt="Current image profile"
								className="w-32 h-32 rounded-full object-cover mx-auto"
							/>
						) : (
							<div className="w-32 h-32 flex items-center justify-center rounded-full mx-auto bg-gray-400">
								<User
									size={72}
									color="white"
								/>
							</div>
						)}
						<label
							htmlFor="profile-image-input"
							className="dark:bg-graydark px-4 py-2 rounded-lg cursor-pointer flex justify-center mt-3 w-44"
						>
							{currentImage ? 'Editar imagem' : 'Adicionar imagem'}
						</label>
						{currentImage || selectedImage ? (
							<button
								onClick={handleRemoveProfileImage} 
								className="absolute left-5 top-1 p-1 bg-red-400 rounded-full cursor-pointer"
							>
								<X size={20} color="white" />
							</button>
						) : null}
						<input
							id="profile-image-input"
							type="file"
							accept="image/*"
							className="hidden"
							ref={fileInputProfileRef}
							onChange={handleImageChangeProfile}
						/>
					</div>
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-5">
							<h1 className="text-xl">{barber?.name || "Anônimo"}</h1>
							<a
								className="dark:bg-graydark px-4 py-2 rounded-lg cursor-pointer flex justify-center"
								href="https://api.whatsapp.com/send?phone=16982420186&text=Olá%20from%20WhatsApp!" 
								target="_blank"
							>
								Enviar mensagem
							</a>
							<Button>
								Seguir
							</Button>
						</div>
						<div className="flex items-center gap-7">
							<p>12 publicações</p>
							<p>200 seguidores</p>
						</div>
					</div>
				</div>
			</div>
			{/* Posts list */}
			<div className="text-right m-3">
				<Button onClick={() => setModalCreatePost(true)}>
					Novo
				</Button>
			</div>
			<div className="flex flex-wrap gap-1">
				{posts.map((post) => (
					<img className="max-w-xs" key={post.id} src={post.image} />
				))}
			</div>
			{/* Modal create post */}
			{modalCreatePost && (
				<div className="w-full h-full fixed flex items-center justify-center top-0 left-0 bg-black bg-opacity-80 z-20">
					<div className="w-[480px] rounded-md bg-gray-800">
						<h6 className="text-lg text-center font-bold border-b border-gray-400 p-3">Criar publicação</h6>
						<div className="w-full h-64 flex items-center justify-center overflow-hidden my-3">
							<div>
								{post.image ? (
									<img
										src={post.image}
										alt="Current image profile"
										className="w-full h-full object-cover"
									/>
								) : (
									<>
										<ImageSquare
											size={72}
											color="white"
											className="mx-auto"
										/>
										<label
											htmlFor="post-image-input"
											className="bg-gray-700 px-4 py-2 rounded-lg cursor-pointer flex justify-center mt-3"
										>
											Selecione uma imagem
										</label>
										<input
											id="post-image-input"
											type="file"
											accept="image/*"
											className="hidden"
											ref={fileInputPostRef}
											onChange={handleImageChangePost}
										/>
									</>
								)}
							</div>
						</div>
						<div className="px-3">
							<Input
								title="Descrição"
								value={post.description}
								onChange={(e) => setPost({ ...post, description: e.currentTarget.value })}
							></Input>
						</div>
						<div className="flex gap-2 justify-end p-4">
							<Button onClick={onCloseModalPost}>
								Cancelar
							</Button>
							<Button>
								Criar postagem
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
