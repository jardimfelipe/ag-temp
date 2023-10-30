/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren } from "react";

import { IconButton, styled } from "@mui/material";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "10px",
}));

const ContainedIconButton = (props: PropsWithChildren<any>) => {
  const { children, ...rest } = props;
  return <StyledIconButton {...rest}>{children}</StyledIconButton>;
};

export default ContainedIconButton;
