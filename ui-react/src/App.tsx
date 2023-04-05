import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import './i18n';

import { Suspense } from 'react';

import { Layout } from './components/layout/Layout';
import { UserGifts } from './pages/user-gifts/UserGifts';
import { GiftAdd } from './components/gift/GiftAdd';
import { UserGiftsManagement } from './pages/admin-panel/user-gifts-management/UserGiftsManagement';
import { GiftedUserAdd } from './components/gifted-user-add/GiftedUserAdd';
import { CategoryAdd } from './components/category-add/CategoryAdd';
import { AdminLayout } from './components/layout/AdminLayout';
import { GiftsPerSelectedUser } from './pages/admin-panel/user-gifts-management/GiftsPerSelectedUser';
import { GiftedUsersManagement } from './pages/admin-panel/gifted-users-management/GiftedUsersManagement';
import { CategoriesManagement } from './pages/admin-panel/categories-management/CategoriesManagement';

export const App = () => {
  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserGifts userId={1} />} />
          <Route path="/admin-panel" element={<AdminLayout />}>
            <Route index element={<Navigate to="gifts" />} />
            <Route path="gifts" element={<UserGiftsManagement />}>
              <Route index element={<GiftsPerSelectedUser />} />
              <Route path="gift-add" element={<GiftAdd />} />
              <Route path="gift-edit/:id?" element={<p> gift edit</p>} />
            </Route>

            <Route path="gifted-users" element={<GiftedUsersManagement />}>
              <Route index element={<p> gifted users list</p>} />
              <Route path="gifted-user-add" element={<GiftedUserAdd />} />
            </Route>
            <Route path="categories" element={<CategoriesManagement />}>
              <Route path="category-add" element={<CategoryAdd />} />
              <Route path="category-edit" element={<p> category edit</p>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
