/** @type {import('tailwindcss').Config} */
export default {
	content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
	  	opacity: ['disabled'],
		cursor: ['disabled'],
	 	rotate: {
			'270': '270deg'
		},
	  	textColor : "#0c0a09", // stone-950
	  	colors: {
		black: "#0c0a09", // stone-950
		white: "#fafafa", // zinc-50
		light: "#D8B9FF", // gray-100
		dark: "#101728 ", // slate-900
		"darkness-plus": "#181850",
		darkness: "#27267D", // gray-800
		graydark: "#402CBF ",
		button: "#101728", //#233559
		placeholder: "#7162CC",
		primary: "#38B6FF ", // #F2AE30
		secondary: "#9aa5ce", // zinc-500
		success: "#059669", // emerald-600
		warning: "#fbbf24", // amber-400
		orange: "#ea580c", // orange-600
		error: "#be123c", // rose-600
		info: "#4338ca", // indigo-700
	  },
	},
  },
  plugins: [],
}

