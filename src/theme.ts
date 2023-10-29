import { ThemeOptions, createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";
import { ptBR as pickersBgBG } from '@mui/x-date-pickers/locales';
import { ptBR as coreBgBG } from '@mui/x-data-grid';

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Poppins'
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#e19f3e',
    },
    secondary: {
      main: '#878075',
    },
    background: {
      default: '#1f1508',
      paper: '#2d200c',
    },
    info: {
      main: '#e19f3e',
    },
  },
};

// const themeOptions: ThemeOptions = {
// 	palette: {
// 		mode: "dark",
// 		primary: {
// 			main: "#27267D",
// 			light: "#402CBF",
// 			dark: "#181850",
// 		},
// 		secondary: {
// 			main: "#9aa5ce",
// 		},
// 		background: {
// 			default: "#101728",
// 			paper: "#181850",
// 		},
// 		text: {
// 			primary: "#f1f5f9",
// 			secondary: "#9aa5ce",
			
// 		},
// 		error: {
// 			main: "#be123c",
// 		},
// 		warning: {
// 			main: "#fbbf24",
// 		},
// 		info: {
// 			main: "#4338ca",
// 		},
// 	},
// };

export const theme = createTheme({
	...themeOptions,
	// components: {
	// 	MuiPaper: {
	// 		styleOverrides: {
	// 			root: {
	// 				backgroundImage: "none",
	// 				backgroundColor: "#181850",
	// 				borderRadius: "8px",
	// 			},
	// 		},
	// 	},
	// },
},
ptBR,
pickersBgBG, // x-date-pickers translations
coreBgBG, // core translations
);
