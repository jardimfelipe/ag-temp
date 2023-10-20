import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'
import Button from './Button'
import { Geolocation } from './Icons/GeolocationIcon'

export type Coordinates = {
	latitude: number,
	longitude: number
}

type Props = {
	onAgree: (coords: Coordinates) => void
}

const GeolocationModal = ({ onAgree }: Props) => {
	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	const handleAgree = () => {
		handleClose()
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					console.log("Latitude: " + position.coords.latitude);
					console.log("Longitude: " + position.coords.longitude);
					onAgree({ latitude: position.coords.latitude, longitude: position.coords.longitude })
				},
				function (error) {
					console.error("Error obtaining location:", error.message);
				}
			);
		} else {
			console.error("Geolocation is not supported in this browser.");
		}
	}

	useEffect(() => {
		navigator.permissions
			.query({ name: "geolocation" })
			.then((result) => {
				if (result.state === "granted") {
					handleAgree()
					console.log("Location permission has already been granted.");
				} else {
					setOpen(true);
				}
			});
	}, []);

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle textAlign="center" justifyContent="center">
				Precisamos da sua localização!
			</DialogTitle>
			<DialogContent className='flex justify-center flex-col items-center'>
				<Geolocation sx={{ width: '200px', height: '200px', fill: '#9aa5ce' }} />
				<DialogContentText justifyContent="center" sx={{ mt: 2 }}>
					Para ver as barbearias mais próximas, precisamos saber a sua localização
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleAgree} autoFocus>
					Aceitar
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default GeolocationModal