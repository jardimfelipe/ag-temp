import { Box } from "@mui/material";

type Props = {
  icon: any;
};

const EmptyStateIcon = ({ icon }: Props) => {
  return <Box component={icon} sx={{ width: "100px", height: "100px" }} />;
};

export default EmptyStateIcon;
