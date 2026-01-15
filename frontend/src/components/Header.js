import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_CART_COUNT } from '../graphql/queries';
import { usePulse } from '../hooks/usePulse';

const Header = ({ title, action }) => {
  const { data } = useQuery(GET_CART_COUNT, {
    fetchPolicy: 'cache-and-network'
  });
  const cartCount = data?.cartCount ?? 0;
  const pulse = usePulse(cartCount);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 0;
      setScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      sx={{
        borderBottom: '1px solid var(--color-border)',
        boxShadow: scrolled ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component={RouterLink} to="/" variant="h6" sx={{ color: 'inherit' }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {action}
          <IconButton component={RouterLink} to="/cart" aria-label="Open cart" color="inherit">
            <Badge
              color="error"
              badgeContent={cartCount}
              className={pulse ? 'cart-pulse' : ''}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
