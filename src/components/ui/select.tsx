import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

export default function Select<T>({
  error,
  label,
  onChange,
  options,
  required,
  ...rest
}: Omit<SelectProps<T>, "error" | "onChange"> &
  Readonly<{
    error?: string[];
    onChange?: (value: string | T, name: string) => void;
    options: { label: string; value: string | number }[];
  }>) {
  const id = Math.random().toString(36).substring(2);

  const handleChange = ({ target: { name, value } }: SelectChangeEvent<T>) => {
    onChange?.(value, name);
  };

  return (
    <FormControl error={Boolean(error)} required={required}>
      {label && <InputLabel id={id}>{label}</InputLabel>}
      <SelectMUI {...rest} labelId={id} onChange={handleChange}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMUI>
      {error && <FormHelperText>{error.join(", ")}</FormHelperText>}
    </FormControl>
  );
}
