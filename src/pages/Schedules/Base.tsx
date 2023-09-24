import { useParams } from "react-router-dom";
import { ContextComponentSchedule } from "../../store/context/schedules.context";
import { ScheduleComponent } from "./ScheduleComponent";
import { Suspense, useEffect } from "react";
import { UserService } from "../../service/user/count-profile";
import { useAppDispatch } from "../../store/main.store";
import { logon } from "../../store/reducer/user.reducer";
import Loading from "../../components/Loading";

type Props = {};
const userService = new UserService();

export function BaseSchedule({}: Props) {
	const RouteParam = useParams();
	const dispatch = useAppDispatch();
	async function getSession() {
		if ((await userService.GetSession()) === false) {
			dispatch(logon());
		}
	}

	useEffect(() => {
		// (async () => await getSession())();
		getSession();
	}, []);

	return (
		<ContextComponentSchedule barbershopId={RouteParam.barbershopId!}>
			<Suspense fallback={<Loading />}>
				<ScheduleComponent barbershopId={RouteParam.barbershopId!} />
			</Suspense>
		</ContextComponentSchedule>
	);
}
