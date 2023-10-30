/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Box, Container, useMediaQuery } from "@mui/material";

import { DRAWER_WIDTH, Navigation } from "./components/Navigation";
import { AuthContext } from "./modules/auth/context/auth";
import { UserContextType } from "./modules/auth/types";
import { theme } from "./theme";
import { getSavedState } from "./utils/localStorage";



function App() {
  const { insertUser } = useContext(AuthContext) as UserContextType;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const containerStyles = isDesktop
    ? { pt: 2, ml: DRAWER_WIDTH, width: `calc(100% - ${DRAWER_WIDTH}`, px: 0 }
    : { pt: 2, pb: 9, px: 0 };

  useEffect(() => {
    const user = getSavedState("user");
    const token = getSavedState("token");

    if (user && token) {
      insertUser(user);
      return;
    }
    navigate("/login");
  }, []);
  return (
    <>
      <Box sx={containerStyles}>
        <Container sx={{ px: isDesktop ? "inherit" : 0 }} maxWidth="sm">
          <Outlet></Outlet>
        </Container>
      </Box>
      <Navigation />
    </>
  );
}

export default App;
