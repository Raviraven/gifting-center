import { useField } from 'formik';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import { TranslatedText } from 'components';

interface CheckboxFieldFormikProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

export const CheckboxFieldFormik = (props: CheckboxFieldFormikProps) => {
  const [field, meta] = useField({
    name: props.name,
    //type: 'checkbox',
  });
  const { t } = useTranslation();

  const error: boolean = meta.touched && !!meta.error;
  const errorMessage: string | undefined = error ? meta.error : undefined;

  return (
    <FormControl
      error={error}
      required={props.required}
      disabled={props.disabled}
      component="fieldset"
      variant="standard"
      sx={{ width: '100%' }}
    >
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={!!field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            disabled={props.disabled}
          />
        }
        label={<TranslatedText lKey={props.label} />}
      />
      {errorMessage && <FormHelperText>{t(errorMessage)}</FormHelperText>}
    </FormControl>
  );
};
