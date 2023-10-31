import { WhatsApp } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";

import { useCurrentPath } from "../utils/useCurrentPath";

const ON_TOP_ROUTES = ["/barbershop/:barbershopId", "/services"];

export const WhatsappButton = () => {
  const currentPath = useCurrentPath();

  const needsToBeOnTop = () => {
    return ON_TOP_ROUTES.includes(currentPath);
  };
  return (
    <Tooltip title="Dúvidas ou problemas? Entre em contato!">
      <Fab
        color="primary"
        target="_blank"
        rel="noreferrer"
        href="https://wa.me/5516991917589"
        sx={{
          position: "fixed",
          bottom: needsToBeOnTop() ? "80px" : "15px",
          right: "10px",
          backgroundColor: "#25D366",
        }}
      >
        <WhatsApp />
      </Fab>
    </Tooltip>
  );
};
