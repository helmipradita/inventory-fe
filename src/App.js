import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Login from './pages/Login';
import AuthChecker from './components/AuthChecker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProductList />} />
        <Route
          path="/add"
          element={
            <AuthChecker>
              {' '}
              <AddProduct />
            </AuthChecker>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <AuthChecker>
              {' '}
              <EditProduct />
            </AuthChecker>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
