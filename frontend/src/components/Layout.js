import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Header from './Header';

const Layout = () => {
  const [headerTitle, setHeaderTitle] = useState('Products');
  const [headerAction, setHeaderAction] = useState(null);

  const outletContext = useMemo(
    () => ({ setHeaderTitle, setHeaderAction }),
    [setHeaderTitle, setHeaderAction]
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header title={headerTitle} action={headerAction} />
      <Box component="main" sx={{ py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Outlet context={outletContext} />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
