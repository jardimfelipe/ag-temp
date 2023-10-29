import { Autocomplete, ListItem, ListItemText, TextField } from "@mui/material";
import useUsersQuery from "../services/useUsersQuery";
import { IUser } from "../types";

type Props = {
  value: IUser | null;
  onChange: (option: IUser | null) => void;
};

const UsersSelect = ({ value, onChange }: Props) => {
  const { data: users = [] } = useUsersQuery();

  const filterOptions = (
    options: IUser[],
    { inputValue }: { inputValue: string }
  ) => {
    return options.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.contact.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const getOptionLabel = (user: IUser) => {
    return `${user.name} - ${user.contact}`;
  };

  return (
    <Autocomplete
      options={users}
      value={value}
      onChange={(_, value) => onChange(value)}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      renderOption={(props, option) => (
        <ListItem {...props}>
          <ListItemText primary={option.name} secondary={option.contact} />
        </ListItem>
      )}
      renderInput={(params) => <TextField {...params} label="Opções" />}
    />
  );
};

export default UsersSelect;
