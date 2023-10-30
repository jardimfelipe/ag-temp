/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  useMediaQuery,
} from "@mui/material";

import { AuthContext } from "../modules/auth/context/auth";
import { UserContextType } from "../modules/auth/types";
import { routes } from "../router";
import { theme } from "../theme";
import { useCurrentPath } from "../utils/useCurrentPath";

export const DRAWER_WIDTH = "250px";

export const Navigation = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) as UserContextType;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const currentPath = useCurrentPath();
  const [currentRoute, setCurrentRoute] = useState(currentPath);

  const menuRoutes = routes.filter((route) => {
    if (!route.menu) return false;
    if (!route.privileges) return true;
    if (!user?.privilege) return false;
    return route.privileges.includes(user.privilege);
  });

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentRoute(newValue);
  };

  const handleNavigate = (route: any) => {
    if (route.label === "Serviços") {
      if (!user?.manager) {
        navigate("feed");
        return;
      }
      return navigate(`barbearia/serviços/${user.manager.barbershopId}`);
    }

    if (route.label === "Barbearia") {
      if (!user?.manager) {
        navigate("feed");
        return;
      }
      return navigate(`barbearia/${user.manager.barbershopId}`);
    }
    return navigate(route.path);
  };
  return (
    <>
      {isDesktop ? (
        <Drawer variant="permanent" sx={{ width: DRAWER_WIDTH }}>
          <List sx={{ width: DRAWER_WIDTH }}>
            {menuRoutes.map((route) => (
              <ListItemButton
                selected={currentPath === route.path}
                onClick={() => handleNavigate(route)}
                key={route.label}
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.label} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      ) : (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: (theme) => theme.palette.background.default,
          }}
          elevation={3}
        >
          <BottomNavigation
            value={currentRoute}
            onChange={handleChange}
            sx={{
              background: (theme) => theme.palette.background.default,
            }}
          >
            {menuRoutes.map((route) => (
              <BottomNavigationAction
                onClick={() => handleNavigate(route)}
                value={route.path}
                key={route.label}
                label={route.label}
                icon={route.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};
