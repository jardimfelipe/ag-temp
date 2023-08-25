import dayjs from "dayjs";
import "dayjs/locale/pt-br";

interface IMonth {
	name: string;
	DayMax: number;
	dayForWeek: {
		monday: number[];
		tuesday: number[];
		wednesday: number[];
		thursday: number[];
		friday: number[];
		saturday: number[];
		sunday: number[];
	};
}

export function getCalendar(year: number): IMonth[] {
	dayjs.locale("pt-br");
	const calendar: IMonth[] = [];

	for (let month = 0; month < 12; month++) {
		const monthName = dayjs().year(year).month(month).format("MMMM");
		const daysInMonth = dayjs().year(year).month(month).daysInMonth();
		const dayForWeek = {
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: [],
		};

		for (let day = 1; day <= daysInMonth; day++) {
			const date = dayjs().year(year).month(month).date(day);
			const dayOfWeek = date.day() as any;

			switch (dayOfWeek) {
				case 1:
					//@ts-ignore
					dayForWeek.monday.push(day);
					break;
				case 2:
					//@ts-ignore
					dayForWeek.tuesday.push(day);
					break;
				case 3:
					//@ts-ignore
					dayForWeek.wednesday.push(day);
					break;
				case 4:
					//@ts-ignore
					dayForWeek.thursday.push(day);
					break;
				case 5:
					//@ts-ignore
					dayForWeek.friday.push(day);
					break;
				case 6:
					//@ts-ignore
					dayForWeek.saturday.push(day);
					break;
				case 0:
					//@ts-ignore
					dayForWeek.sunday.push(day);
					break;
				default:
					break;
			}
		}

		const monthObj: IMonth = {
			name: monthName,
			DayMax: daysInMonth,
			dayForWeek,
		};

		calendar.push(monthObj);
	}

	return calendar;
}
