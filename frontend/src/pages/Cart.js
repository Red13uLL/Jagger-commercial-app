import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link as RouterLink, useNavigate, useOutletContext } from 'react-router-dom';
import { GET_CART, GET_CART_COUNT } from '../graphql/queries';
import { CLEAR_CART, REMOVE_FROM_CART } from '../graphql/mutations';
import { formatPrice } from '../utils/formatters';

const Cart = () => {
  const { setHeaderTitle, setHeaderAction } = useOutletContext();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_CART, {
    fetchPolicy: 'cache-and-network'
  });
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT]
  });
  const [clearCart, { loading: clearing }] = useMutation(CLEAR_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT]
  });

  const cart = data?.cart;
  const itemCount = cart?.items?.length ?? 0;

  useEffect(() => {
    setHeaderTitle('Cart');
    setHeaderAction(null);
  }, [setHeaderTitle, setHeaderAction]);

  useEffect(() => {
    if (purchaseOpen && itemCount === 0) {
      setPurchaseOpen(false);
    }
  }, [itemCount, purchaseOpen]);

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

  if (!cart || cart.items.length === 0) {
    return (
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Cart is empty</Typography>
        <Typography color="text.secondary">
          Add a product to start building your order.
        </Typography>
        <Button variant="contained" component={RouterLink} to="/" sx={{ width: 'fit-content' }}>
          Browse products
        </Button>
      </Stack>
    );
  }

  const formattedTotal = formatPrice(cart.total, {
    locale: 'de-DE',
    currency: 'EUR',
    currencyDisplay: 'code'
  });

  const handlePurchase = () => {
    setPurchaseOpen(true);
  };

  const handlePurchaseClose = () => {
    setPurchaseOpen(false);
  };

  const handleConfirmPurchase = async () => {
    setPurchasing(true);
    setPurchaseOpen(false);
    try {
      await clearCart();
      setSuccessOpen(true);
    } finally {
      setPurchasing(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const handleGoHome = () => {
    setSuccessOpen(false);
    navigate('/');
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ maxWidth: 560, mx: 'auto', width: '100%', textAlign: 'right' }}>
        <Button
          variant="text"
          onClick={() => clearCart()}
          disabled={clearing}
          sx={{ textTransform: 'none' }}
        >
          Clear the cart
        </Button>
      </Box>

      <Stack spacing={2} sx={{ maxWidth: 560, mx: 'auto', width: '100%' }}>
        {cart.items.map((item) => (
          <Card key={item.id} sx={{ width: '100%' }}>
            <Stack direction="row" alignItems="stretch">
              <CardActionArea
                onClick={() => navigate(`/products/${item.productId}`)}
                sx={{ flex: 1 }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={item.product?.imageUrl}
                      alt={item.product?.name}
                      sx={{ width: 72, height: 72, borderRadius: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.product?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.product?.shortDescription}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Quantity: {item.quantity}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
              <Box sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
                <IconButton
                  aria-label="Remove item"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeFromCart({ variables: { itemId: item.id } });
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Stack>
          </Card>
        ))}
      </Stack>

      <Stack spacing={1.5} alignItems="center" sx={{ mt: 1 }}>
        <Typography variant="h6">Total: {formattedTotal}</Typography>
        <Button variant="contained" onClick={handlePurchase} sx={{ minWidth: 160 }}>
          Purchase
        </Button>
      </Stack>

      <Dialog open={purchaseOpen} onClose={handlePurchaseClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>Cart Summary</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            {cart.items.map((item) => (
              <Card key={`summary-${item.id}`} variant="outlined">
                <CardContent sx={{ py: 1.5 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={item.product?.imageUrl}
                      alt={item.product?.name}
                      sx={{ width: 56, height: 56, borderRadius: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.product?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2">
                      {formatPrice((item.product?.price || 0) * item.quantity, {
                        locale: 'de-DE',
                        currency: 'EUR',
                        currencyDisplay: 'code'
                      })}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Typography sx={{ flex: 1, fontWeight: 600 }}>{formattedTotal}</Typography>
          <Button onClick={handlePurchaseClose}>Close</Button>
          <Button variant="contained" onClick={handleConfirmPurchase} disabled={purchasing}>
            Confirm Purchase
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successOpen} onClose={handleSuccessClose} maxWidth="xs" fullWidth>
        <DialogTitle>Purchase Complete</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary">
            Thank you for your purchase! Your order has been successfully placed.
            A confirmation email has been sent to your inbox with the details of your order.
            We hope to serve you again soon!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleGoHome}>Go back home</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Cart;
