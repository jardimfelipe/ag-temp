import { useParams } from "react-router-dom";
import { ContextComponentSchedule } from "../../store/context/schedules.context";
import { ScheduleComponent } from "./ScheduleComponent";
import { ToastContainer } from "react-toastify";

type Props = {};

export function BaseSchedule({}: Props) {
	const RouteParam = useParams();

	return (
		<ContextComponentSchedule barbershopId={RouteParam.barbershopId!}>
			<ToastContainer></ToastContainer>
			<ScheduleComponent barbershopId={RouteParam.barbershopId!} />
		</ContextComponentSchedule>
	);
}
