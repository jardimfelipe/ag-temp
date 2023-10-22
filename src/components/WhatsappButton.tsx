import { WhatsApp } from '@mui/icons-material'
import { Fab, Tooltip } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useCurrentPath } from '../hooks/useCurrentPath'

const BARBERSHOP_PROFILE_PATH = '/barbershop/:barbershopId'

export const WhatsappButton = () => {
	const currentPath = useCurrentPath()
	console.log('currentPath', currentPath)
	return (
		<Tooltip title="Dúvidas ou problemas? Entre em contato!">
			<Fab
				color="primary"
				target='_blank'
				rel="noreferrer"
				href='https://wa.me/5516991917589'
				sx={{ position: 'absolute', bottom: currentPath === BARBERSHOP_PROFILE_PATH ? '80px' : '15px', right: '10px', backgroundColor: '#25D366' }}
			>
				<WhatsApp />
			</Fab>
		</Tooltip>
	)
}
