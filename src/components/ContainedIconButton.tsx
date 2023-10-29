/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, styled } from "@mui/material";
import { PropsWithChildren } from "react";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "10px",
}));

const ContainedIconButton = (props: PropsWithChildren<any>) => {
  const { children, ...rest } = props;
  return <StyledIconButton {...rest}>{children}</StyledIconButton>;
};

export default ContainedIconButton;
