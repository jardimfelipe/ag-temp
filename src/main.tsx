import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CssBaseline, ThemeProvider } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import "./global.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import AuthProvider from "./modules/auth/context/auth.tsx";
import router from "./router.tsx";
import { theme } from "./theme.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToastContainer theme="colored" />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <CssBaseline />
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
