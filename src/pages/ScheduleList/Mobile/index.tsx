
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../../store/main.store';
import { ScheduleService } from '../../../service/schedule';
import { useState, useEffect } from 'react'
import { ISchedule } from '../../../store/types/schedule';
import dayjs from 'dayjs';
type Props = {};

export function BaseMobile({ }: Props) {
	const use = useAppSelector((state) => state.user);
	const [schedules, setSchedules] = useState<ISchedule[]>([])

	// const CustomAccordion = makeStyles((theme : any) => ({
	//     root :{
	//         backgroundColor : 'black'
	//     }
	// }))
	useEffect(() => {
		getList();
		console.log(schedules)
	}, [])
	useEffect(() => {
		console.log(schedules)
	}, [schedules])
	const getList = async () => {
		const scheduleService = new ScheduleService();

		const scheduleList = await scheduleService.getScheduleByIdUser(use.id)
		setSchedules(scheduleList)
	}

	const calculateDateDiff = (date1: any, date2: any) => {
		const startDate = dayjs(date1)
		const endDate = dayjs(date2)

		return endDate.diff(startDate, 'm', true)
	}
	return (
		<div className={`${use.config.theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
			<section className="flex w-full justify-center aligne-center ">
				<main className="flex flex-col items-center w-11/12 ">
					<section className="first:p-0 first:overflow-hidden shadow-lg w-full m-14">
						{schedules.map(schedule => (
							<div key={schedule.id} className={`${use.config.theme === 'dark' ? 'bg-dark' : 'bg-light'} mb-2`}>

								<Accordion className='bg-darkness mb-2'>
									<AccordionSummary
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<div className='flex w-full justify-between'>
											<Typography>{schedule.title}</Typography>
											<Typography>{dayjs(schedule.start).format("DD/MM/YYYY")}</Typography>
										</div>
									</AccordionSummary>
									<AccordionDetails className=' w-full '>
										<div className='flex w-full justify-between  border-t-2 pt-4 '>
											<Typography>Contato</Typography>
											<Typography>{schedule.withUserClient.contact}</Typography>
										</div>
										<div className='flex w-full justify-between mt-4 border-t-2 pt-4'>
											<Typography>Descrição corte</Typography>
											<Typography>{schedule.description}</Typography>
										</div>
										<div className='flex w-full justify-between mt-4 border-t-2 pt-4'>
											<Typography>Inicio</Typography>
											<Typography>{dayjs(schedule.start).format("HH:mm")}</Typography>
										</div>
										<div className='flex w-full justify-between mt-4 border-t-2 pt-4'>
											<Typography>Fim</Typography>
											<Typography>{dayjs(schedule.end).format("HH:mm")}</Typography>
										</div>
										<div className='flex w-full justify-between mt-4 border-t-2 pt-4'>
											<Typography>Duração corte</Typography>
											<Typography>{calculateDateDiff(schedule.start, schedule.end)}mins</Typography>
										</div>
									</AccordionDetails>
								</Accordion>
							</div>
						))}
					</section>
				</main>

			</section>
		</div>
	)
}