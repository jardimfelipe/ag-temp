import { ThemeOptions, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Theme {
		status: {
			danger: string;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}

const themeOptions: ThemeOptions = {
	palette: {
		mode: "dark",
		primary: {
			main: "#27267D",
			light: "#402CBF",
			dark: "#181850",
		},
		secondary: {
			main: "#9aa5ce",
		},
		background: {
			default: "#101728",
			paper: "#181850",
		},
		text: {
			primary: "#f1f5f9",
			secondary: "#9aa5ce",
		},
		error: {
			main: "#be123c",
		},
		warning: {
			main: "#fbbf24",
		},
		info: {
			main: "#4338ca",
		},
	},
};

export const themeCustom = createTheme({
	...themeOptions,
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
					backgroundColor: "#181850",
					borderRadius: "8px",
				},
			},
		},
	},
});
