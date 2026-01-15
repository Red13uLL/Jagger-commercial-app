import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<ProductsList />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default App;
