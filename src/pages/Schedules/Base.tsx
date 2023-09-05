import { useParams } from "react-router-dom";
import { ContextComponentSchedule } from "../../store/context/schedules.context";
import { ScheduleComponent } from "./ScheduleComponent";

type Props = {};

export function BaseSchedule({}: Props) {
	const RouteParam = useParams();

	return (
		<ContextComponentSchedule barbershopId={RouteParam.barbershopId!}>
			<ScheduleComponent />
		</ContextComponentSchedule>
	);
}
