import { matchRoutes, useLocation } from "react-router-dom";

import { routes } from "../router";

export const useCurrentPath = () => {
  const location = useLocation();
  const [route] = matchRoutes(routes, location) ?? [];
  if (route?.route) {
    return route.route.path;
  }
  return "/";
};
