import { useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink, useOutletContext, useParams } from 'react-router-dom';
import { GET_CART, GET_CART_COUNT, GET_PRODUCT } from '../graphql/queries';
import { ADD_TO_CART } from '../graphql/mutations';
import { formatPrice } from '../utils/formatters';
import { useInView } from '../hooks/useInView';

const ProductDetails = () => {
  const { id } = useParams();
  const { setHeaderTitle, setHeaderAction } = useOutletContext();
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id }
  });
  const [addToCart, { loading: adding }] = useMutation(ADD_TO_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT]
  });

  const observerOptions = useMemo(
    () => ({ rootMargin: '-80px 0px 0px 0px', threshold: 0.1 }),
    []
  );
  const { ref: heroRef, isInView } = useInView(observerOptions);

  const product = data?.product;

  useEffect(() => {
    if (product?.name) {
      setHeaderTitle(product.name);
    }
  }, [product?.name, setHeaderTitle]);

  useEffect(() => {
    if (!product) {
      setHeaderAction(null);
      return;
    }

    const headerButton = !isInView ? (
      <Button
        variant="contained"
        onClick={() => addToCart({ variables: { productId: id, quantity: 1 } })}
        disabled={adding}
      >
        Add to cart
      </Button>
    ) : null;

    setHeaderAction(headerButton);

    return () => setHeaderAction(null);
  }, [adding, addToCart, id, isInView, product, setHeaderAction]);

  if (loading) {
    return (
      <Typography variant="h6" color="text.secondary">
        Loading product...
      </Typography>
    );
  }

  if (error || !product) {
    return (
      <Typography variant="h6" color="error">
        Product not found.
      </Typography>
    );
  }

  return (
    <Stack spacing={3}>
      <Button component={RouterLink} to="/" variant="text" sx={{ width: 'fit-content' }}>
        Back to products
      </Button>

      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} ref={heroRef}>
            <Stack spacing={2}>
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: { xs: 260, md: 340 },
                  objectFit: 'cover',
                  borderRadius: 3
                }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={() => addToCart({ variables: { productId: id, quantity: 1 } })}
                disabled={adding}
              >
                Add to cart
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h3">{product.name}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={formatPrice(product.price)}
                  sx={{ backgroundColor: '#fff3e6', fontWeight: 600 }}
                />
                <Rating value={product.rating} precision={0.5} readOnly />
              </Stack>
              <Typography color="text.secondary">{product.shortDescription}</Typography>
              <Typography>{product.longDescription}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default ProductDetails;
