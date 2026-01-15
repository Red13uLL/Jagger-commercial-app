import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography
} from '@mui/material';
import { Link as RouterLink, useOutletContext } from 'react-router-dom';
import { GET_CART, GET_CART_COUNT, GET_PRODUCTS } from '../graphql/queries';
import { ADD_TO_CART } from '../graphql/mutations';

const ProductsList = () => {
  const { setHeaderTitle, setHeaderAction } = useOutletContext();
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [GET_CART, GET_CART_COUNT]
  });
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    setHeaderTitle('Products');
    setHeaderAction(null);
  }, [setHeaderTitle, setHeaderAction]);

  const handleAddToCart = async (productId) => {
    setAddingId(productId);
    try {
      await addToCart({ variables: { productId, quantity: 1 } });
    } finally {
      setAddingId(null);
    }
  };

  if (loading) {
    return (
      <Typography variant="h6" color="text.secondary">
        Loading products...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Something went wrong while loading products.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {data?.products?.map((product) => (
        <Grid item xs={12} sm={6} md={6} key={product.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="200"
              image={product.imageUrl}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.shortDescription}
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating value={product.rating} precision={0.5} readOnly size="small" />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                component={RouterLink}
                to={`/products/${product.id}`}
              >
                Show Details
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleAddToCart(product.id)}
                disabled={addingId === product.id}
                sx={{
                  backgroundColor: 'var(--color-neutral-button)',
                  color: 'var(--color-text-primary)',
                  '&:hover': {
                    backgroundColor: 'var(--color-neutral-button-hover)'
                  }
                }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
