// import dayjs from "dayjs";
// import "dayjs/locale/pt-br";

// interface IDayInWeek {
// 	type: "present" | "before";
// 	day: number;
// }

// interface IMonth {
// 	name: string;
// 	dayForWeek: {
// 		monday: IDayInWeek[];
// 		tuesday: IDayInWeek[];
// 		wednesday: IDayInWeek[];
// 		thursday: IDayInWeek[];
// 		friday: IDayInWeek[];
// 		saturday: IDayInWeek[];
// 		sunday: IDayInWeek[];
// 	};
// }

// interface IWeek {
// 	monday: IDayInWeek[];
// 	tuesday: IDayInWeek[];
// 	wednesday: IDayInWeek[];
// 	thursday: IDayInWeek[];
// 	friday: IDayInWeek[];
// 	saturday: IDayInWeek[];
// 	sunday: IDayInWeek[];
// }

// export function getCalendar(year: number): IMonth[] {
// 	dayjs.locale("pt-br");
// 	const calendar: IMonth[] = [];

// 	for (let month = 0; month < 11; month++) {
// 		const monthName = dayjs().year(year).month(month).format("MMMM");
// 		const daysInMonth = dayjs().year(year).month(month).daysInMonth();
// 		const dayForWeek: IWeek = {
// 			monday: [],
// 			tuesday: [],
// 			wednesday: [],
// 			thursday: [],
// 			friday: [],
// 			saturday: [],
// 			sunday: [],
// 		};

// 		for (let day = 0; day <= daysInMonth; day++) {
// 			const dayWeek = dayjs().year(year).month(month).date(day).day();

// 			switch (dayWeek) {
// 				case 1:
// 					dayForWeek.monday.push({ type: "present", day });
// 					break;
// 				case 2:
// 					dayForWeek.tuesday.push({ type: "present", day });
// 					break;
// 				case 3:
// 					dayForWeek.wednesday.push({ type: "present", day });
// 					break;
// 				case 4:
// 					dayForWeek.thursday.push({ type: "present", day });
// 					break;
// 				case 5:
// 					dayForWeek.friday.push({ type: "present", day });
// 					break;
// 				case 6:
// 					dayForWeek.saturday.push({ type: "present", day });
// 					break;
// 				case 0:
// 					dayForWeek.sunday.push({ type: "present", day });
// 					break;
// 				default:
// 					break;
// 			}
// 		}

// 		function addDayInWeeks() {
// 			console.log(dayForWeek);
// 			const weeks = Object.keys(dayForWeek);
// 			weeks.map((weekDay: string) => {
// 				//@ts-ignore
// 				const isWeekMinor = dayForWeek[weekDay].length == 4;
// 				if (isWeekMinor) {
// 					const month = calendar.length;
// 					const dayBeforeWeek = // @ts-ignore
// 						calendar[month - 1].dayForWeek[weekDay][-1];

// 					// @ts-ignore
// 					dayForWeek[weekDay].unshift({
// 						type: "before",
// 						day: dayBeforeWeek,
// 					});
// 				}
// 			});
// 		}

// 		addDayInWeeks();

// 		const objectMonth: IMonth = {
// 			name: monthName,
// 			dayForWeek,
// 		};
// 		calendar.push(objectMonth);
// 	}

// 	return calendar;
// }

// getCalendar(dayjs().year());
// // export function getCalendar(year: number): IMonth[] {
// // 	dayjs.locale("pt-br");
// // 	const calendar: IMonth[] = [];
// // 	let lastMonthDay = 0; // Armazena o último dia do mês anterior

// // 	for (let month = 0; month < 12; month++) {
// // 		const monthName = dayjs().year(year).month(month).format("MMMM");
// // 		const daysInMonth = dayjs().year(year).month(month).daysInMonth();
// // 		const dayForWeek = {
// // 			monday: [],
// // 			tuesday: [],
// // 			wednesday: [],
// // 			thursday: [],
// // 			friday: [],
// // 			saturday: [],
// // 			sunday: [],
// // 		};

// // 		// Preenche os dias restantes do mês anterior
// // 		const firstDayOfWeek = dayjs()
// // 			.year(year)
// // 			.month(month)
// // 			.date(1)
// // 			.day() as any;
// // 		if (firstDayOfWeek !== 1) {
// // 			// Se o primeiro dia do mês não for segunda-feira
// // 			const previousMonth = month === 0 ? 11 : month - 1; // Mês anterior
// // 			const previousMonthDays = dayjs()
// // 				.year(year)
// // 				.month(previousMonth)
// // 				.daysInMonth();
// // 			const daysToAdd = 5 - firstDayOfWeek; // Dias que faltam para completar a semana

// // 			for (
// // 				let i = previousMonthDays - daysToAdd + 1;
// // 				i <= previousMonthDays;
// // 				i++
// // 			) {
// // 				// @ts-ignore
// // 				dayForWeek.monday.unshift(i);
// // 			}
// // 		}

// // 		for (let day = 1; day <= daysInMonth; day++) {
// // 			const date = dayjs().year(year).month(month).date(day);
// // 			const dayOfWeek = date.day() as any;
// // 			switch (dayOfWeek) {
// // 				case 1:
// // 					dayForWeek.monday.push(day);
// // 					break;
// // 				case 2:
// // 					//@ts-ignore
// // 					dayForWeek.tuesday.push(day);
// // 					break;
// // 				case 3:
// // 					//@ts-ignore
// // 					dayForWeek.wednesday.push(day);
// // 					break;
// // 				case 4:
// // 					//@ts-ignore
// // 					dayForWeek.thursday.push(day);
// // 					break;
// // 				case 5:
// // 					//@ts-ignore
// // 					dayForWeek.friday.push(day);
// // 					break;
// // 				case 6:
// // 					//@ts-ignore
// // 					dayForWeek.saturday.push(day);
// // 					break;
// // 				case 0:
// // 					//@ts-ignore
// // 					dayForWeek.sunday.push(day);
// // 					break;
// // 				default:
// // 					break;
// // 			}
// // 		}
// // 		const monthObj: IMonth = {
// // 			name: monthName,
// // 			DayMax: daysInMonth,
// // 			dayForWeek,
// // 		};
// // 		calendar.push(monthObj);
// // 	}
// // 	return calendar;
// // }
