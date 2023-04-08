import { useTranslation } from 'react-i18next';

import { Box, Divider, List, ListItemText } from '@mui/material';

import { Outlet } from 'react-router-dom';

import { TranslatedText } from '../../../components/translated-text/TranslatedText';

import { LinkListItemButton } from '../../../components/material/LinkListItemButton';

export const CategoriesManagement = () => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <header>
          <h2>
            <TranslatedText lKey="categoriesManagementHeader" />
          </h2>
        </header>
        <main>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <List>
                <LinkListItemButton to="" exact>
                  <ListItemText primary={t('categoriesForUserAdminTab')} />
                </LinkListItemButton>
                <LinkListItemButton to="category-add" exact>
                  <ListItemText primary={t('categoriesAddAdminTab')} />
                </LinkListItemButton>
                <LinkListItemButton to="category-edit">
                  <ListItemText primary={t('categoriesEditAdminTab')} />
                </LinkListItemButton>
              </List>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />
            <Box sx={{ width: '100%' }}>
              <Outlet />
            </Box>
          </Box>
        </main>
      </section>
    </>
  );
};
