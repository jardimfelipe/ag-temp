import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";

const EmptyStateContainer = (props: PropsWithChildren) => {
  return (
    <Stack
      spacing={2}
      height="80vh"
      alignItems="center"
      justifyContent="center"
    >
      {props.children}
    </Stack>
  );
};

export default EmptyStateContainer;
