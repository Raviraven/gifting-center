import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import './i18n';

import { Suspense } from 'react';

import { Layout } from './components/layout/Layout';
import { UserGifts } from './pages/user-gifts/UserGifts';
import { GiftAdd } from './components/gift/GiftAdd';
import { UserGiftsManagement } from './pages/admin-panel/user-gifts-management/UserGiftsManagement';
import { GiftedUserAdd } from './components/gifted-user/GiftedUserAdd';
import { CategoryAdd } from './components/category/CategoryAdd';
import { GiftsPerSelectedUser } from './pages/admin-panel/user-gifts-management/GiftsPerSelectedUser';
import { GiftedUsersManagement } from './pages/admin-panel/gifted-users-management/GiftedUsersManagement';
import { CategoriesManagement } from './pages/admin-panel/categories-management/CategoriesManagement';
import { CategoriesList } from './components/categories-list/CategoriesList';
import { CategoryEditPage } from './pages/admin-panel/categories-management/CategoryEditPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { GiftedUserList } from './components/gifted-user-list/GiftedUserList';
import { GiftedUserEditPage } from './pages/admin-panel/gifted-users-management/GiftedUserEditPage';
import { GiftEditPage } from './pages/admin-panel/user-gifts-management/GiftEditPage';

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
              <Route path="gift-edit/:id?" element={<GiftEditPage />} />
            </Route>

            <Route path="gifted-users" element={<GiftedUsersManagement />}>
              <Route index element={<GiftedUserList />} />
              <Route path="gifted-user-add" element={<GiftedUserAdd />} />
              <Route
                path="gifted-user-edit/:id?"
                element={<GiftedUserEditPage />}
              />
            </Route>

            <Route path="categories" element={<CategoriesManagement />}>
              <Route index element={<CategoriesList />} />
              <Route path="category-add" element={<CategoryAdd />} />
              <Route path="category-edit/:id?" element={<CategoryEditPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
