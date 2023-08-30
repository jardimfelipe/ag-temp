import dayjs from "dayjs";
import "dayjs/locale/pt-br";

interface IDayForCalendar {
	type: "present" | "before";
	day: number;
}

interface IMonth {
	name: string;
	DayMax: number;
	dayForWeek: {
		monday: IDayForCalendar[];
		tuesday: IDayForCalendar[];
		wednesday: IDayForCalendar[];
		thursday: IDayForCalendar[];
		friday: IDayForCalendar[];
		saturday: IDayForCalendar[];
		sunday: IDayForCalendar[];
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
		let previousMonthDays: number[] = [];
		for (let day = 1; day <= daysInMonth; day++) {
			const date = dayjs().year(year).month(month).date(day);
			const dayOfWeek = date.day() as any;
			let dayType: "present" | "before" = "present";

			if (dayOfWeek === 1 && dayForWeek.monday.length === 4) {
				dayType = "before";
				//@ts-ignore
				dayForWeek.monday.map((day, id) => {
					if (id > 1) {
						// @ts-ignore
						dayForWeek.monday.unshift({ type: dayType, day }); // Remove the first Monday from the array
					}
				});
			}

			switch (dayOfWeek) {
				case 1:
					// if (dayType == "before") {
					// 	//@ts-ignore
					// 	dayForWeek.monday.push({ type: "before", day });
					// }
					//@ts-ignore
					dayForWeek.monday.push({ type: dayType, day });
					break;
				case 2:
					//@ts-ignore
					dayForWeek.tuesday.push({ type: dayType, day });
					break;
				case 3:
					//@ts-ignore
					dayForWeek.wednesday.push({ type: dayType, day });
					break;
				case 4:
					//@ts-ignore
					dayForWeek.thursday.push({ type: dayType, day });
					break;
				case 5:
					//@ts-ignore
					dayForWeek.friday.push({ type: dayType, day });
					break;
				case 6:
					//@ts-ignore
					dayForWeek.saturday.push({ type: dayType, day });
					break;
				case 0:
					//@ts-ignore
					dayForWeek.sunday.push({ type: dayType, day });
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
