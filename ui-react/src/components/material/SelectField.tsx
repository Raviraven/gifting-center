import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { TranslatedText } from '../translated-text/TranslatedText';

export interface SelectFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  options: SelectFieldOption[];
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
}

export interface SelectFieldOption {
  key: string | number;
  value: string;
}

export const SelectField = (props: SelectFieldProps) => {
  const { label, name, placeholder, options, value, onChange } = props;

  return (
    <>
      <InputLabel id={`label-${name}`}>
        <TranslatedText lKey={label} />
      </InputLabel>
      <Select
        labelId={`label-${name}`}
        placeholder={placeholder}
        //error={meta.touched && !!meta.error}
        name={name}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value={value}
        onChange={onChange}
        //onBlur={field.onBlur}
        fullWidth
        variant="standard"
        margin="dense"
      >
        <MenuItem value="0"></MenuItem>

        {options.map((o) => (
          <MenuItem value={o.key} key={`select-option-${o.key}`}>
            {o.value}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
