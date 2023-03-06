import { Route, Routes } from 'react-router-dom';

import './App.css';

import { Layout } from './components/layout/Layout';
import { UserGifts } from './pages/user-gifts/UserGifts';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UserGifts userId={1} />} />
      </Route>
    </Routes>
  );
};
