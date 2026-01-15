import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link as RouterLink, useOutletContext } from 'react-router-dom';
import { GET_CART, GET_CART_COUNT } from '../graphql/queries';
import { CLEAR_CART, REMOVE_FROM_CART } from '../graphql/mutations';
import { formatPrice } from '../utils/formatters';

const Cart = () => {
  const { setHeaderTitle, setHeaderAction } = useOutletContext();
  const { data, loading, error } = useQuery(GET_CART);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT]
  });
  const [clearCart, { loading: clearing }] = useMutation(CLEAR_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT]
  });

  useEffect(() => {
    setHeaderTitle('Your Cart');
    setHeaderAction(null);
  }, [setHeaderTitle, setHeaderAction]);

  if (loading) {
    return (
      <Typography variant="h6" color="text.secondary">
        Loading cart...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Unable to load cart items.
      </Typography>
    );
  }

  const cart = data?.cart;

  if (!cart || cart.items.length === 0) {
    return (
      <Stack spacing={2}>
        <Typography variant="h4">Cart is empty</Typography>
        <Typography color="text.secondary">
          Add a product to start building your order.
        </Typography>
        <Button variant="contained" component={RouterLink} to="/">
          Browse products
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
        <Stack spacing={2} sx={{ flex: 1, width: '100%' }}>
          {cart.items.map((item) => (
            <Card key={item.id} sx={{ width: '100%' }}>
              <CardContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                  <Avatar
                    variant="rounded"
                    src={item.product?.imageUrl}
                    alt={item.product?.name}
                    sx={{ width: 96, height: 96, borderRadius: 2 }}
                  />
                  <Box sx={{ flex: 1, width: '100%' }}>
                    <Typography variant="h6">{item.product?.name}</Typography>
                    <Typography color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {formatPrice((item.product?.price || 0) * item.quantity)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatPrice(item.product?.price || 0)} each
                      </Typography>
                    </Box>
                    <IconButton
                      aria-label="Remove item"
                      onClick={() => removeFromCart({ variables: { itemId: item.id } })}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Card sx={{ minWidth: { xs: '100%', md: 280 } }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5">Order Summary</Typography>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Items</Typography>
                <Typography>{cart.count}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Total</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {formatPrice(cart.total)}
                </Typography>
              </Stack>
              <Button variant="contained" fullWidth>
                Checkout
              </Button>
              <Button
                variant="text"
                color="secondary"
                onClick={() => clearCart()}
                disabled={clearing}
              >
                Clear cart
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default Cart;
