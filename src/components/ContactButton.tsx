import { WhatsApp } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type Props = {
  phone: string;
};

const ContactButton = ({ phone }: Props) => {
  const handleClick = () => {
    window.open(`https://wa.me/${phone}`);
  };
  return (
    <IconButton onClick={handleClick} aria-label="agendar">
      <WhatsApp />
    </IconButton>
  );
};

export default ContactButton;
