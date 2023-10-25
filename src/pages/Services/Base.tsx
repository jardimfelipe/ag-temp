import { useState } from 'react'
import { Fab, Stack, Typography } from '@mui/material'

import { ServiceList } from '../Schedules/ServiceList'
import { useAppSelector } from '../../store/main.store';
import { Add } from '@mui/icons-material';
import CreateServiceModal from './CreateServiceModal';

const Base = () => {
	const user = useAppSelector((state) => state.user);
	const [modalCreateService, setModalCreateService] = useState(false)
	const [listKey, setListKey] = useState(0)

	const handleSuccess = () => {
		setModalCreateService(false)
		const key = listKey + 1
		setListKey(key)
	}
	return (
		<Stack spacing={2} sx={{ mt: 8, p: 2 }}>
			<Typography variant="subtitle1" textAlign="center">Seus serviços</Typography>
			<Fab color="primary" sx={{ position: 'fixed', bottom: '15px', right: '10px', backgroundColor: '#27267D' }} onClick={() => setModalCreateService(true)}><Add /></Fab>
			<ServiceList key={listKey} barbershopId={(user.manager as any).barbershopId} />
			<CreateServiceModal onSuccess={handleSuccess} open={modalCreateService} onClose={() => setModalCreateService(false)} />
		</Stack>
	)
}

export default Base