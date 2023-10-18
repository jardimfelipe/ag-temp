import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { X, User, ImageSquare } from "@phosphor-icons/react";
// import { BarberService } from "../../service/barber";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { BarbershopService } from "../../service/barbershop";
import { CircularProgress, Fab, Grid } from "@mui/material";
import { ImageBarbershopService } from "../../service/imageService/barbershop";
import { Add } from "@mui/icons-material"
import { toast } from "react-toastify";

type Props = {};
const barbershopService = new BarbershopService();
const imageBarbershopService = new ImageBarbershopService();
export function BarbershopProfile({ }: Props) {
	const RouteParam = useParams();
	const [barber, setBarber] = useState({});
	const [loading, setLoading] = useState<boolean>(true);
	const fileInputProfileRef = useRef<HTMLInputElement | null>(null);
	const [currentImage, setCurrentImage] = useState<string>("");
	const [selectedImage, setSelectedImage] = useState<any>("");
	const [postImage, setPostImage] = useState<any>(null)
	const [posts, setPosts] = useState([]);

	// Profile
	const handleImageChangeProfile = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			setSelectedImage(file)
			reader.readAsDataURL(file);
			imageBarbershopService.changeAvatar((barber as any).id, file)
				.then((image) => setCurrentImage(image.data.avatar_url));
			// setCurrentImage(URL.createObjectURL(file));
		}
	};

	const handleRemoveProfileImage = () => {
		setCurrentImage("");
		setSelectedImage("");
		if (fileInputProfileRef.current) {
			fileInputProfileRef.current.value = "";
		}
	};

	const getBarbershop = () => {
		barbershopService
			.GetSpecificBarbershop(RouteParam.barbershopId ?? "")
			.then((barber) => {
				setBarber((barber as any).data);
				setPosts((barber as any).data.images);
				setCurrentImage((barber as any).data.avatar_url);

				// console.log(barber.data);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			});
	}

	// Get profile info

	useEffect(() => {
		getBarbershop()
	}, []);

	// Posts
	const [modalCreatePost, setModalCreatePost] = useState(false);
	const fileInputPostRef = useRef<HTMLInputElement | null>(null);
	const [post, setPost] = useState({ image: "", description: "" });

	const handleImageChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPostImage(file)
			const reader = new FileReader();
			reader.readAsDataURL(file);
			setPost((post) => ({
				...post,
				image: URL.createObjectURL(file),
			}));
		}
	};

	const handleCancelPost = () => {
		setPost({ description: "", image: "" });
		setPostImage(null)
		if (fileInputPostRef.current) {
			fileInputPostRef.current.value = "";
		}
	};
	const onCloseModalPost = () => {
		handleCancelPost();
		setModalCreatePost(false);
	};

	async function handleImageInPost() {
		await imageBarbershopService.postImage((barber as any).id, postImage);
		toast.success('Post criado com sucesso')
		getBarbershop()
		onCloseModalPost()
	}
	// const postsMock = [
	// 	{
	// 		id: 1,
	// 		url: "https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg",
	// 		description: "Hello World",
	// 	},
	// 	{
	// 		id: 2,
	// 		url: "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
	// 		description: "Green",
	// 	},
	// 	{
	// 		id: 3,
	// 		url: "https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg",
	// 		description: "Hello World 2",
	// 	},
	// ];

	if (loading) {
		return (
			<div className="flex justify-center mt-4 p-8 flex-1 bg-darkness-plus rounded-lg">
				<CircularProgress color="inherit"></CircularProgress>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto md:ml-32 mt-24 md:mt-4">
			<Fab color="primary" sx={{ position: 'absolute', bottom: '15px', right: '10px', backgroundColor: '#27267D' }} onClick={() => setModalCreatePost(true)}><Add /></Fab>

			{/* Profile */}
			<div className="flex justify-between items-center">

				<Grid container>
					<Grid justifyContent={{ xs: "center" }} container item xs={12} sm={4}>
						<div className="relative max-w-[180px]">
							{currentImage || selectedImage ? (
								<img
									src={
										(currentImage as string) ||
										(selectedImage as string)
									}
									alt="Current image profile"
									className="w-32 h-32 rounded-full object-cover mx-auto"
								/>
							) : (
								<div className="w-32 h-32 flex items-center justify-center rounded-full mx-auto bg-gray-400">
									<User size={72} color="white" />
								</div>
							)}
							<label
								htmlFor="profile-image-input"
								className="dark:bg-graydark px-4 py-2 rounded-lg cursor-pointer flex justify-center mt-3 w-44"
							>
								{currentImage
									? "Editar imagem"
									: "Adicionar imagem"}
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
					</Grid>
					<Grid item xs={12} sm={8}>
						<div className="flex flex-col gap-5 mt-12 sm:mt-0">
							<div className="flex items-center gap-5 justify-center sm:justify-normal">
								<h1 className="text-2xl font-bold">
									{(barber as any).name}
								</h1>
								<a
									className="dark:bg-graydark px-4 py-2 rounded-lg cursor-pointer flex justify-center"
									href="https://api.whatsapp.com/send?phone=16982420186&text=Olá%20"
									target="_blank"
								>
									Enviar mensagem
								</a>
								{/* <Button>Seguir</Button> */}
							</div>
							<div className="flex items-center justify-center sm:justify-normal gap-7 text-secondary">
								<p>{posts.length} publicações</p>
								<p>
									{(barber as any).clientFollowBarbershopsId ?? 0}{" "}
									seguidores
								</p>
							</div>
						</div>
					</Grid>
				</Grid>


			</div>
			{/* Posts list */}
			<div className="flex flex-wrap gap-2 justify-center mt-12">
				{posts.map((post) => (
					<img
						className="max-w-xss rounded-lg"
						key={(post as any).id}
						src={(post as any).url}
					/>
				))}
			</div>
			{/* Modal create post */}
			{
				modalCreatePost && (
					<div className="w-full h-full fixed flex items-center justify-center top-0 left-0 bg-black bg-opacity-80 z-20">
						<div className="w-[90%] sm:w-[480px] rounded-md bg-gray-800">
							<h6 className="text-lg text-center font-bold border-b border-gray-400 p-3">
								Criar publicação
							</h6>
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
									onChange={(e) =>
										setPost({
											...post,
											description: e.currentTarget.value,
										})
									}
								></Input>
							</div>
							<div className="flex gap-2 justify-end p-4">
								<Button onClick={onCloseModalPost}>Cancelar</Button>
								<Button
									onClick={() => handleImageInPost()}
								>
									Criar postagem
								</Button>
							</div>
						</div>
					</div>
				)
			}
		</div >
	);
}
