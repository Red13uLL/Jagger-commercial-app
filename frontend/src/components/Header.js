import { Badge, Box, IconButton, Stack, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CART_COUNT } from '../graphql/queries';
import { usePulse } from '../hooks/usePulse';

const Header = ({ title, action }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 8 });
  const { data } = useQuery(GET_CART_COUNT, {
    fetchPolicy: 'cache-and-network'
  });
  const cartCount = data?.cartCount ?? 0;
  const pulse = usePulse(cartCount);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        boxShadow: trigger ? '0 14px 28px rgba(31, 41, 51, 0.12)' : 'none'
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 72 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Stack direction="row" spacing={2} alignItems="baseline">
          <Typography
            component={RouterLink}
            to="/"
            variant="h4"
            sx={{ fontWeight: 600, letterSpacing: 1 }}
          >
            JAGGAER
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {title}
          </Typography>
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {action}
          <IconButton
            component={RouterLink}
            to="/cart"
            aria-label="Open cart"
            sx={{
              border: '1px solid #e3d7c8',
              backgroundColor: '#fffdf9'
            }}
          >
            <Badge
              color="primary"
              badgeContent={cartCount}
              className={pulse ? 'cart-pulse' : ''}
            >
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
