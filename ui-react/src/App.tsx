import { Route, Routes } from 'react-router-dom';

import './App.css';

import { GiftsList } from './components/gifts-list/GiftsList';
import { Layout } from './components/layout/Layout';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GiftsList userId={1} />} />
      </Route>
    </Routes>
  );
};
