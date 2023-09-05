import React, { createContext, useEffect, useState } from "react";
import { ISchedule } from "../types/schedule";
import { ScheduleService } from "../../service/schedule";

type Props = {
	children: React.ReactNode;
	barbershopId: string;
};

export const scheduleContext = createContext<ISchedule[]>([] as ISchedule[]);
const service = new ScheduleService();

export function ContextComponentSchedule({ children, barbershopId }: Props) {
	const [scheduleList, setScheduleList] = useState<ISchedule[]>(
		[] as ISchedule[]
	);

	useEffect(() => {
		(async () => {
			setScheduleList(await service.getSchedule(barbershopId));
		})();
	}, []);

	return (
		<scheduleContext.Provider value={scheduleList}>
			{children}
		</scheduleContext.Provider>
	);
}
