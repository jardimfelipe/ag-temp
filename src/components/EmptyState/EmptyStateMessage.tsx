import { Typography } from "@mui/material";

type Props = {
  message: string;
};

const EmptyStateMessage = ({ message }: Props) => {
  return (
    <Typography color="text.secondary" textAlign="center">
      {message}
    </Typography>
  );
};

export default EmptyStateMessage;
