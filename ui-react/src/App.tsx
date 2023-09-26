import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import './i18n';

import { Suspense } from 'react';

import {
  Layout,
  GiftAdd,
  GiftedUserAdd,
  CategoryAdd,
  CategoriesList,
  AdminLayout,
  GiftedUserList,
} from 'components';

import {
  CategoryEditPage,
  CategoriesManagement,
  UserGiftsManagement,
  UserGifts,
  GiftEditPage,
  GiftedUserEditPage,
  GiftedUsersManagement,
  GiftsPerSelectedUser,
} from 'pages';

export const App = () => {
  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserGifts userId={1} />} />

          <Route path="/admin-panel" element={<AdminLayout />}>
            <Route index element={<Navigate to="gifts" />} />

            <Route path="gifts/:userId?" element={<UserGiftsManagement />}>
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
