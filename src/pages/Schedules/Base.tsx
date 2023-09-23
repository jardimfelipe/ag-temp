import { useParams } from "react-router-dom";
import { ContextComponentSchedule } from "../../store/context/schedules.context";
import { ScheduleComponent } from "./ScheduleComponent";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { UserService } from "../../service/user/count-profile";
import { useAppDispatch } from "../../store/main.store";
import { logon } from "../../store/reducer/user.reducer";

type Props = {};
const userService = new UserService();

export function BaseSchedule({}: Props) {
	const RouteParam = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			if ((await userService.GetSession()) === false) {
				dispatch(logon());
			}
		})();
	}, []);

	return (
		<ContextComponentSchedule barbershopId={RouteParam.barbershopId!}>
			<ToastContainer></ToastContainer>
			<ScheduleComponent barbershopId={RouteParam.barbershopId!} />
		</ContextComponentSchedule>
	);
}
