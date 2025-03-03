import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import ProductCard from '../card/ProductCard';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureMockStore();

describe('ProductCard Component', () => {
  let store: ReturnType<typeof mockStore>;

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: '100',
    image: 'test-image-url',
  };

  beforeEach(() => {
    store = mockStore({ cart: { items: [] } });

    jest.clearAllMocks();
  });

  test('renders product details correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );

    const productImage = screen.getByAltText(mockProduct.name);
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', mockProduct.image);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('100 ₺')).toBeInTheDocument();
  });

  test('navigates to product detail page on product click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );

    const productCard = screen.getByAltText(mockProduct.name).closest('div');
    fireEvent.click(productCard!);

    expect(mockNavigate).toHaveBeenCalledWith(`/product/${mockProduct.id}`);
  });

  test('dispatches addToCart action when "Add to Cart" button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );

    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    fireEvent.click(addToCartButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      addToCart({
        id: mockProduct.id,
        name: mockProduct.name,
        price: Number(mockProduct.price),
        image: mockProduct.image,
        quantity: 1,
      })
    );
  });
});
