import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import { EditOutlined } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import { TranslatedText } from 'components';

import { useCategories } from 'api/hooks';

export const CategoriesList = () => {
  const { data, isLoading } = useCategories();
  const navigate = useNavigate();

  return isLoading ? (
    <Typography variant="body2">
      <TranslatedText lKey="loading" />
    </Typography>
  ) : data && data.length > 0 ? (
    <Grid container spacing={1}>
      {data.map((category) => (
        <Grid
          item
          xs={12}
          md={12}
          key={`category-${category.id}-${category.name}`}
        >
          <Card component={'section'}>
            <CardContent>
              <Typography
                variant="subtitle1"
                component={'header'}
                textAlign={'center'}
              >
                {category.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container component={'main'} spacing={1}>
                <Grid item md={12} xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`category-edit/${category.id}`)}
                  >
                    <EditOutlined sx={{ marginRight: '0.25rem' }} />
                    <TranslatedText lKey="edit" />
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="body1">
      <TranslatedText lKey="noCategories" />
    </Typography>
  );
};
