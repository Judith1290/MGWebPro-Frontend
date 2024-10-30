import './index.css';

import Rutas from './routes/Rutas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

const App = () => {
  return (
    <ProductProvider>
      <AuthProvider>
        <Rutas />
      </AuthProvider>
    </ProductProvider>
  );
};

export default App;
