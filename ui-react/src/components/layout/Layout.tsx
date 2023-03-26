import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  SwipeableDrawer,
  Theme,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Brightness4, Brightness7, Menu } from '@mui/icons-material';

import { useTheme } from '@emotion/react';

import { AppLanguage, LanguageContext } from '../../context/LanguageContext';
import { ColorModeContext } from '../../context/ColorModeContext';

export const Layout = () => {
  const { changeLanguage } = useContext(LanguageContext);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
    <Container maxWidth="sm" component="section">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" component="nav" fontWeight={800}>
          Hej Franek!
        </Typography>

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
            {/* <Typography variant="body2" align="center">
              Lang
                          <TranslatedText lKey="chooseLanguage" />

            </Typography> */}
            <ListItem>
              <ListItemButton
                onClick={() => changeLang('en')}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                ENG
              </ListItemButton>
              <ListItemButton
                onClick={() => changeLang('pl')}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
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
          </List>
        </Box>
      </SwipeableDrawer>
    </Container>
  );
};
