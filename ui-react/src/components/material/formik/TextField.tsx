import { useField } from 'formik';
import { HTMLInputTypeAttribute } from 'react';
import MuiTextField from '@mui/material/TextField';

import { useTranslation } from 'react-i18next';

import { TranslatedText } from '../../translated-text/TranslatedText';

interface MuiTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}

export const TextFieldFormik = (props: MuiTextFieldProps) => {
  const [field, meta] = useField(props.name);
  const { t } = useTranslation();

  const error: boolean = meta.touched && !!meta.error;
  const errorMessage: string | undefined = error ? meta.error : undefined;

  return (
    <MuiTextField
      placeholder={props.placeholder}
      error={meta.touched && !!meta.error}
      name={field.name}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      fullWidth
      label={<TranslatedText lKey={props.label} />}
      helperText={errorMessage ? t(errorMessage) : errorMessage}
      variant="standard"
      margin="dense"
      type={props.type}
      required={props.required}
      disabled={props.disabled}
    />
  );
};
