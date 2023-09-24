import { CheckCircle } from '@mui/icons-material';
import { Grid, Button, Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import { TranslatedText } from 'components';

interface IReserveGiftSection {
  reserved: boolean;
  adminActions: boolean;
  onSubmit: ({ reserved }: { reserved: boolean }) => void;
}

export const ReserveGiftSection = ({
  onSubmit,
  reserved,
  adminActions,
}: IReserveGiftSection) => {
  return (
    <Grid item xs={12}>
      {!reserved && (
        <Formik<{ reserved: boolean }>
          initialValues={{ reserved: true }}
          onSubmit={onSubmit}
        >
          <Form>
            <Button variant="outlined" type="submit" fullWidth>
              <TranslatedText lKey="reserve" />
            </Button>
          </Form>
        </Formik>
      )}

      {!adminActions && reserved && (
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CheckCircle color="success" />
          <Typography
            component="p"
            variant="body1"
            align="center"
            paddingLeft="0.25rem"
          >
            <TranslatedText lKey="reserved" />
          </Typography>
        </Box>
      )}

      {adminActions && reserved && (
        <Grid item xs={12}>
          <Formik<{ reserved: boolean }>
            initialValues={{ reserved: false }}
            onSubmit={onSubmit}
          >
            <Form>
              <Button variant="outlined" type="submit" fullWidth>
                <CheckCircle color="success" />
                <TranslatedText lKey="reserved" />
              </Button>
            </Form>
          </Formik>
        </Grid>
      )}
    </Grid>
  );
};
