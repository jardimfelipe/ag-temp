import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router.tsx";
import { Provider } from "react-redux";
import { store } from "./store/main.store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@mui/material";
import { themeCustom } from "./materialStyling";


const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={themeCustom}>
			<CssBaseline />
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RouterProvider router={router} />
				</PersistGate>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
