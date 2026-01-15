import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e86a33',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#2a9d8f'
    },
    background: {
      default: '#fff7ee',
      paper: '#ffffff'
    },
    text: {
      primary: '#1f2933',
      secondary: '#5f6b7a'
    }
  },
  typography: {
    fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Fraunces", "Times New Roman", serif',
      fontWeight: 600
    },
    h2: {
      fontFamily: '"Fraunces", "Times New Roman", serif',
      fontWeight: 600
    },
    h3: {
      fontFamily: '"Fraunces", "Times New Roman", serif',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 14
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fffaf2',
          color: '#1f2933',
          borderBottom: '1px solid #e3d7c8'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #eee3d6',
          boxShadow: '0 10px 30px rgba(31, 41, 51, 0.08)'
        }
      }
    }
  }
});

export default theme;
