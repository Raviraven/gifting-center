import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <Container maxWidth="md" component="section">
      <Outlet />
    </Container>
  );
};
