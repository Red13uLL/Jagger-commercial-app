import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useOutletContext, useParams } from 'react-router-dom';
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
  const [quantity, setQuantity] = useState(1);
  const [lightbox, setLightbox] = useState({
    open: false,
    src: '',
    alt: ''
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
  const thumbnails = product ? [product.imageUrl, product.imageUrl, product.imageUrl] : [];

  const openLightbox = (src, alt) => {
    setLightbox({ open: true, src, alt });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, open: false }));
  };

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
        variant="outlined"
        color="inherit"
        onClick={() => addToCart({ variables: { productId: id, quantity } })}
        disabled={adding}
        sx={{ borderColor: 'rgba(255, 255, 255, 0.7)' }}
      >
        Add to cart
      </Button>
    ) : null;

    setHeaderAction(headerButton);

    return () => setHeaderAction(null);
  }, [adding, addToCart, id, isInView, product, quantity, setHeaderAction]);

  useEffect(() => {
    setQuantity(1);
    setLightbox({ open: false, src: '', alt: '' });
  }, [id]);

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
      <Paper ref={heroRef} elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={3} sm={2}>
                <Stack spacing={1}>
                  {thumbnails.map((src, index) => (
                    <Box
                      key={`${src}-${index}`}
                      sx={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 1,
                        backgroundColor: 'var(--color-surface)',
                        p: 0.5,
                        position: 'relative',
                        cursor: 'zoom-in'
                      }}
                      onClick={() =>
                        openLightbox(src, `${product.name} thumbnail ${index + 1}`)
                      }
                    >
                      <Box
                        component="img"
                        src={src}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        sx={{ width: '100%', display: 'block' }}
                      />
                      <IconButton
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          openLightbox(src, `${product.name} thumbnail ${index + 1}`);
                        }}
                        sx={{
                          position: 'absolute',
                          right: 4,
                          bottom: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                        }}
                        aria-label="Open image preview"
                      >
                        <ZoomInIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={9} sm={10}>
                <Box
                  sx={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 1,
                    backgroundColor: 'var(--color-surface)',
                    p: { xs: 1.5, md: 2 },
                    position: 'relative',
                    cursor: 'zoom-in'
                  }}
                  onClick={() => openLightbox(product.imageUrl, product.name)}
                >
                  <Box
                    component="img"
                    src={product.imageUrl}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: { xs: 220, md: 280 },
                      objectFit: 'contain'
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      openLightbox(product.imageUrl, product.name);
                    }}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      bottom: 8,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                    aria-label="Open image preview"
                  >
                    <ZoomInIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={1.5}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.shortDescription}
              </Typography>
              <Rating value={product.rating} precision={0.5} readOnly size="small" />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {formatPrice(product.price, {
                  locale: 'de-DE',
                  currency: 'EUR',
                  currencyDisplay: 'code'
                })}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                all prices incl. 10% taxes
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                <TextField
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={(event) => {
                    const nextValue = Number(event.target.value);
                    setQuantity(Number.isNaN(nextValue) ? 1 : Math.max(1, nextValue));
                  }}
                  inputProps={{ min: 1 }}
                  sx={{ width: 72 }}
                />
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => addToCart({ variables: { productId: id, quantity } })}
                  disabled={adding}
                >
                  Add to cart
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Box
        sx={{
          bgcolor: 'var(--color-section)',
          py: { xs: 3, md: 4 },
          mt: 2,
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 1200, px: { xs: 2, md: 3 } }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1, textTransform: 'uppercase' }}
            >
              Description
            </Typography>
            <Typography variant="body2">{product.longDescription}</Typography>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={lightbox.open}
        onClose={closeLightbox}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', position: 'relative' }}>
          {product.name}
          <IconButton
            aria-label="Close image preview"
            onClick={closeLightbox}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: 'var(--color-surface)' }}>
          <Box
            component="img"
            src={lightbox.src}
            alt={lightbox.alt}
            sx={{
              width: '100%',
              maxHeight: { xs: 300, md: 520 },
              objectFit: 'contain'
            }}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default ProductDetails;
