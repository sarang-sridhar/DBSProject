import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import ErrorPage from './routes/ErrorPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import BidProducts from './routes/BidProducts';

function App() {
  const auth = useSelector((state) => state.authReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute authState={auth} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products/:product_id" element={<BidProducts />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
