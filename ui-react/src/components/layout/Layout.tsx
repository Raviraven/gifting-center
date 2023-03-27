import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  SwipeableDrawer,
  Theme,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';

import {
  Brightness4,
  Brightness7,
  CheckCircle,
  Menu,
} from '@mui/icons-material';

import { useTheme } from '@emotion/react';

import { AppLanguage, LanguageContext } from '../../context/LanguageContext';
import { ColorModeContext } from '../../context/ColorModeContext';
import { TranslatedText } from '../translated-text/TranslatedText';

export const Layout = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { pathname } = useLocation();

  const changeLang = useCallback(
    (lng: string) => {
      changeLanguage(lng as AppLanguage);
      window.location.reload();
    },
    [changeLanguage]
  );

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpened(open);
    },
    []
  );

  return (
    <Container
      maxWidth="sm"
      component="section"
      sx={{
        height: '100%',
        backgroundColor:
          (theme as Theme).palette.mode === 'dark' ? '#121212' : '#f3cf7d',
      }}
    >
      <Box
        paddingTop="1rem"
        height="10rem"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Link component={RouterLink} to="/" height="100%">
          <img src="logo.png" alt="Application logo" height="100%" />
        </Link>

        <Button onClick={toggleDrawer(true)}>
          <Menu />
        </Button>
      </Box>

      <Grid component="main">
        <Outlet />
      </Grid>

      <SwipeableDrawer
        anchor="left"
        open={drawerOpened}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box role="presentation" sx={{ width: 250 }}>
          <List>
            <Typography variant="body2" align="center">
              <TranslatedText lKey="chooseLanguage" />
            </Typography>
            <ListItem>
              <ListItemButton
                onClick={() => changeLang('en')}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {language === 'en' ? (
                  <CheckCircle color="success" sx={{ marginRight: '0.5rem' }} />
                ) : (
                  <></>
                )}{' '}
                ENG
              </ListItemButton>
              <ListItemButton
                onClick={() => changeLang('pl')}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {language === 'pl' ? (
                  <CheckCircle color="success" sx={{ marginRight: '0.5rem' }} />
                ) : (
                  <></>
                )}{' '}
                PL
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                onClick={colorMode.toggleColorMode}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ListItemIcon
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {(theme as Theme).palette.mode === 'dark' ? (
                    <Brightness7 />
                  ) : (
                    <Brightness4 />
                  )}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider />

            {pathname.includes('admin-panel') ? (
              <ListItem>Tu bedo admin actions</ListItem>
            ) : (
              <></>
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </Container>
  );
};
