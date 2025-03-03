import { render, screen } from '@testing-library/react';
import ProductDetailPage from '../ProductDetailPage';

jest.mock('../../../features/product/ProductDetail.tsx', () => () => <div>ProductDetail Component</div>);
jest.mock('../../../components/basket/BasketCard', () => ({ BasketCard: () => <div>BasketCard Component</div> }));
jest.mock('../../../components/checkout/Checkout', () => () => <div>Checkout Component</div>);

describe('ProductDetailPage Component', () => {
  test('renders ProductDetail component correctly', () => {
    render(<ProductDetailPage />);
    expect(screen.getByText('ProductDetail Component')).toBeInTheDocument();
  });

  test('renders BasketCard and Checkout components correctly', () => {
    render(<ProductDetailPage />);
    expect(screen.getByText('BasketCard Component')).toBeInTheDocument();
    expect(screen.getByText('Checkout Component')).toBeInTheDocument();
  });
});
