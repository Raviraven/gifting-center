import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, useMemo, useState } from 'react';

import { useGiftedUsers } from '../../api/hooks';

import { UserGifts } from './UserGifts';

export const UserGiftsContainer = () => {
  const [value, setValue] = useState(0);

  const { isLoading, data } = useGiftedUsers();

  const visibleGiftedUsers = useMemo(
    () => (isLoading ? [] : data?.filter((n) => n.visibleOnIndexPage)),
    [data, isLoading]
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="" centered>
          {visibleGiftedUsers &&
            visibleGiftedUsers.map((user) => (
              <Tab key={`tab-user-${user.id}`} label={user.name} />
            ))}
        </Tabs>
      </Box>
      {visibleGiftedUsers &&
        visibleGiftedUsers.map((user, index) => (
          <CustomTabPanel
            key={`custom-tab-panel-user-${user.id}`}
            value={value}
            index={index}
          >
            <UserGifts userId={user.id} />
          </CustomTabPanel>
        ))}
    </Box>
  );
};

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
