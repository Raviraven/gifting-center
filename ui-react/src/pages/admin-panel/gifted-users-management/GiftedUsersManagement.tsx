import { useTranslation } from 'react-i18next';

import { Box, Divider, List, ListItemText } from '@mui/material';

import { Outlet } from 'react-router-dom';

import { TranslatedText } from 'components/translated-text/TranslatedText';

import { LinkListItemButton } from 'components/material/LinkListItemButton';

export const GiftedUsersManagement = () => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <header>
          <h2>
            <TranslatedText lKey="giftedUsersAdminTab" />
          </h2>
        </header>
        <main>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <List>
                <LinkListItemButton to="" exact>
                  <ListItemText primary={t('giftedUsersAdminTab')} />
                </LinkListItemButton>
                <LinkListItemButton to="gifted-user-add" exact>
                  <ListItemText primary={t('giftedUsersAddAdminTab')} />
                </LinkListItemButton>
                <LinkListItemButton to="gifted-user-edit">
                  <ListItemText primary={t('giftedUsersEditAdminTab')} />
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
