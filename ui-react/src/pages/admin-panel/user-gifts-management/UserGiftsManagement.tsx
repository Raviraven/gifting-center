import { useTranslation } from 'react-i18next';

import { Box, Divider, List, ListItemText } from '@mui/material';

import { Outlet } from 'react-router-dom';

// import { GiftAdd } from '../../components/gift/GiftAdd';
// import { GiftEdit } from '../../components/gift/GiftEdit';
import { TranslatedText } from '../../../components/translated-text/TranslatedText';

import { LinkListItemButton } from '../../../components/material/LinkListItemButton';

export const UserGiftsManagement = () => {
  const { t } = useTranslation();

  // const handleChangeTab = (event: SyntheticEvent, newTab: number) => {
  //   setActiveTab(newTab);
  // };

  // const handleSubmit = useCallback(
  //   ({ giftedUserId }: { giftedUserId: number }) => {
  //     setGiftedUserIdString(giftedUserId.toString());
  //   },
  //   []
  // );

  // const handleSelect = useCallback(
  //   (props: FormikProps<{ giftedUserId: number }>) => {
  //     void props.submitForm();
  //   },
  //   []
  // );

  return (
    <>
      <section>
        <header>
          <h2>
            <TranslatedText lKey="giftsForSelectedUser" />
          </h2>
        </header>
        <main>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <List>
                <LinkListItemButton to="" exact>
                  <ListItemText primary={t('giftsforUserAdminTab')} />
                </LinkListItemButton>
                <LinkListItemButton to="gift-add" exact>
                  <ListItemText primary={t('giftsAddAdminTab')} />
                </LinkListItemButton>
                <LinkListItemButton to="gift-edit">
                  <ListItemText primary={t('giftsEditAdminTab')} />
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
