import { Route, Routes } from 'react-router-dom';

import './App.css';
import './i18n';
import { AdminLayout } from './components/layout/AdminLayout';

import { Layout } from './components/layout/Layout';
import { UserGifts } from './pages/user-gifts/UserGifts';
import { GiftAdd } from './components/gift-add/GiftAdd';
import { UserGiftsManagement } from './pages/user-gifts-management/UserGiftsManagement';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UserGifts userId={1} />} />
      </Route>
      <Route path="/admin-panel" element={<AdminLayout />}>
        <Route index element={<UserGiftsManagement />} />
        <Route path="gift-add" element={<GiftAdd />} />
      </Route>
    </Routes>
  );
};
