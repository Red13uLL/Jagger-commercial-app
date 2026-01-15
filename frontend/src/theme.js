import { createTheme } from '@mui/material/styles';
import { tokens } from './styles/tokens';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: tokens.colors.primary
    },
    error: {
      main: tokens.colors.badge
    },
    background: {
      default: tokens.colors.background,
      paper: tokens.colors.surface
    },
    text: {
      primary: tokens.colors.textPrimary,
      secondary: tokens.colors.textSecondary
    }
  },
  typography: {
    fontFamily: 'var(--font-base)'
  },
  shape: {
    borderRadius: 4
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--color-primary': tokens.colors.primary,
          '--color-background': tokens.colors.background,
          '--color-surface': tokens.colors.surface,
          '--color-text-primary': tokens.colors.textPrimary,
          '--color-text-secondary': tokens.colors.textSecondary,
          '--color-border': tokens.colors.border,
          '--color-badge': tokens.colors.badge,
          '--color-neutral-button': tokens.colors.neutralButton,
          '--color-neutral-button-hover': tokens.colors.neutralButtonHover,
          '--color-section': tokens.colors.section,
          '--font-base': tokens.fonts.base
        },
        '*, *::before, *::after': {
          boxSizing: 'border-box'
        },
        body: {
          margin: 0,
          minHeight: '100vh',
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text-primary)'
        },
        a: {
          color: 'inherit',
          textDecoration: 'none'
        },
        img: {
          maxWidth: '100%',
          display: 'block'
        },
        '.cart-pulse .MuiBadge-badge': {
          animation: 'cartPulse 0.35s ease-out'
        },
        '@keyframes cartPulse': {
          '0%': {
            transform: 'scale(1)'
          },
          '40%': {
            transform: 'scale(1.35)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.4px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid var(--color-border)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
        }
      }
    }
  }
});

export default theme;
