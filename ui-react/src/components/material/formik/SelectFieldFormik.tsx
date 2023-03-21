import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';

import { TranslatedText } from '../../translated-text/TranslatedText';

export interface SelectFieldFormikProps {
  label: string;
  name: string;
  placeholder?: string;
  options: SelectFieldOption[];
  onSelect?: () => void;
}

export interface SelectFieldOption {
  key: string | number;
  value: string;
}

export const SelectFieldFormik = (props: SelectFieldFormikProps) => {
  const { label, name, placeholder, options, onSelect } = props;

  const [field, meta] = useField(name);

  const handleOnChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: SelectChangeEvent<any>) => {
      field.onChange(event);

      if (onSelect) {
        onSelect();
      }
    },
    [field, onSelect]
  );

  //   const error: boolean = meta.touched && !!meta.error;
  //   const errorMessage: string | undefined = error ? meta.error : undefined;

  return (
    <>
      <InputLabel id={`label-${name}`}>
        <TranslatedText lKey={label} />
      </InputLabel>
      <Select
        labelId={`label-${name}`}
        placeholder={placeholder}
        error={meta.touched && !!meta.error}
        name={field.name}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value={field.value}
        onChange={handleOnChange}
        onBlur={field.onBlur}
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
