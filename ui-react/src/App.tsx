import { Route, Routes } from 'react-router-dom';

import './App.css';
import './i18n';

import { Layout } from './components/layout/Layout';
import { UserGifts } from './pages/user-gifts/UserGifts';
import { GiftAdd } from './components/gift/GiftAdd';
import { UserGiftsManagement } from './pages/user-gifts-management/UserGiftsManagement';
import { GiftedUserAdd } from './components/gifted-user-add/GiftedUserAdd';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UserGifts userId={1} />} />
      </Route>
      <Route path="/admin-panel" element={<Layout />}>
        <Route index element={<UserGiftsManagement />} />
        <Route path="gift-add" element={<GiftAdd />} />
        <Route path="gifted-user-add" element={<GiftedUserAdd />} />
      </Route>
    </Routes>
  );
};
