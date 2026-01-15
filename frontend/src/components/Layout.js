import { Box, Container } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Header from './Header';

const Layout = () => {
  const location = useLocation();
  const [headerTitle, setHeaderTitle] = useState('JAGGAER Store');
  const [headerAction, setHeaderAction] = useState(null);

  useEffect(() => {
    if (location.pathname === '/') {
      setHeaderTitle('All Products');
    }
  }, [location.pathname]);

  const outletContext = useMemo(
    () => ({ setHeaderTitle, setHeaderAction }),
    [setHeaderTitle, setHeaderAction]
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header title={headerTitle} action={headerAction} />
      <Box component="main" sx={{ py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Outlet context={outletContext} />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
