import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoadingSpinner from './components/loading/LoadingSpinner';
import { Main } from './pages/main/Main';
import { Header } from './pages/header/Header';

function App() {
  const ProductPage = lazy(() => import('./pages/product/ProductPage'));
  const ProductDetail = lazy(() => import('./pages/product/ProductDetailPage'));

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Header>
          <Main>
            <Routes>
              <Route path='/' element={<ProductPage />} />
              <Route path='/product/:id' element={<ProductDetail />} />
            </Routes>
          </Main>
        </Header>
      </Suspense>
    </Router>
  );
}

export default App;
