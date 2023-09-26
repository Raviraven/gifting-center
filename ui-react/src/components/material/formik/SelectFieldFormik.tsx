import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { TranslatedText } from 'components';

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
  const { t } = useTranslation();

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

  const error: boolean = meta.touched && !!meta.error;
  const errorMessage: string | undefined = error ? meta.error : undefined;
  const translatedError = errorMessage ? t(errorMessage) : '';

  return (
    <>
      <InputLabel id={`label-${name}`} sx={error ? { color: '#d32f2f' } : {}}>
        <TranslatedText lKey={label} />
      </InputLabel>
      <Select
        labelId={`label-${name}`}
        placeholder={placeholder}
        error={error}
        name={field.name}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value={field.value}
        onChange={handleOnChange}
        onBlur={field.onBlur}
        fullWidth
        variant="standard"
        margin="dense"
        defaultValue={''}
        sx={{ marginBottom: '4px' }}
      >
        <MenuItem value="0"></MenuItem>

        {options.map((o) => (
          <MenuItem value={o.key} key={`select-option-${o.key}`}>
            {o.value}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ color: '#d32f2f', fontSize: '0.75rem' }}>
        {translatedError}
      </Box>
    </>
  );
};
