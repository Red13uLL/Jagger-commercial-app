import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink, useOutletContext } from 'react-router-dom';
import { GET_PRODUCTS } from '../graphql/queries';
import { formatPrice } from '../utils/formatters';

const ProductsList = () => {
  const { setHeaderTitle, setHeaderAction } = useOutletContext();
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    setHeaderTitle('All Products');
    setHeaderAction(null);
  }, [setHeaderTitle, setHeaderAction]);

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
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Discover the latest gear
        </Typography>
        <Typography color="text.secondary">
          Curated hardware with practical features and a calm, premium feel.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {data?.products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Chip
                      label={formatPrice(product.price)}
                      size="small"
                      sx={{ backgroundColor: '#fff3e6', fontWeight: 600 }}
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {product.shortDescription}
                  </Typography>
                  <Rating value={product.rating} precision={0.5} readOnly size="small" />
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/products/${product.id}`}
                  fullWidth
                >
                  Show Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ProductsList;
