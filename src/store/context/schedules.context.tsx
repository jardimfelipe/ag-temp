import React, { createContext, useEffect } from "react";
import { useAppDispatch } from "../main.store";
import { getSchedules } from "../reducer/schedule.reducer";
import { IStateSchedule } from "../types/schedule";

type Props = {
	children: React.ReactNode;
};

const scheduleContext = createContext<IStateSchedule>({} as IStateSchedule);

export function ContextComponentSchedule({ children }: Props) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getSchedules("40aade88-d0c4-49e3-a1f4-5e0cc6917c83"));
	}, []);
	return (
		<scheduleContext.Provider value={{} as IStateSchedule}>
			{children}
		</scheduleContext.Provider>
	);
}
