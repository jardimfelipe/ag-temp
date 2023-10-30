import { ptBR } from "@mui/material/locale";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { ptBR as coreBgBG } from '@mui/x-data-grid';
import { ptBR as pickersBgBG } from '@mui/x-date-pickers/locales';

// TEMA MARROM
// export const themeOptions: ThemeOptions = {
//   typography: {
//     fontFamily: 'Poppins'
//   },
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#e19f3e',
//     },
//     secondary: {
//       main: '#878075',
//     },
//     background: {
//       default: '#1f1508',
//       paper: '#2d200c',
//     },
//     info: {
//       main: '#e19f3e',
//     },
//   },
// };

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Poppins'
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#3587f2',
    },
    secondary: {
      main: '#3587f2',
    },
    background: {
      default: '#201b2c',
      paper: '#323859',
    },
    info: {
      main: '#323859',
    },
  },
};

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
