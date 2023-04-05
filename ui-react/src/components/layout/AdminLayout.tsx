import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  // const { t } = useTranslation();

  return (
    // <Box sx={{ display: 'flex' }}>
    <Box>
      {/*  <List>
          <LinkListItemButton to="" exact>
            <ListItemText primary={t('giftsforUserAdminTab')} />
          </LinkListItemButton>
          <LinkListItemButton to="gift-add" exact>
            <ListItemText primary={t('giftsAddAdminTab')} />
          </LinkListItemButton>
          <LinkListItemButton to="categories">
            <ListItemText primary={t('categoriesAdminTab')} />
          </LinkListItemButton>
        </List>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />
      <Box sx={{ width: '100%' }}> */}
      <Outlet />
    </Box>
    // </Box>
  );
};
