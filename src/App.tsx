import { ThemeProvider } from "@mui/material";
import { Layout } from "./components/Layout/index";
import { themeCustom } from "./materialStyling";

function App() {
	return (
		<div>
			<ThemeProvider theme={themeCustom}>
				<Layout></Layout>
			</ThemeProvider>
		</div>
	);
}

export default App;
