import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { addToCart, removeFromCart } from '../../store/slices/cartSlice';
import { BasketCard } from '../basket/BasketCard';

const mockStore = configureMockStore();

describe('BasketCard Component', () => {
  let store: ReturnType<typeof mockStore>;

  const mockCartItem = {
    id: '1',
    name: 'Test Product',
    price: 100,
    image: 'test-image-url',
    quantity: 2,
  };

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [mockCartItem],
      },
    });

    jest.clearAllMocks();
  });

  test('renders cart items correctly', async () => {
    render(
      <Provider store={store}>
        <BasketCard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockCartItem.name)).toBeInTheDocument();
      expect(screen.getByText('100 ₺')).toBeInTheDocument();
      expect(screen.getByText(`${mockCartItem.quantity}`)).toBeInTheDocument();
    });
  });

  test('renders "Your cart is empty." message when there are no items', () => {
    store = mockStore({
      cart: {
        items: [],
      },
    });

    render(
      <Provider store={store}>
        <BasketCard />
      </Provider>
    );

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('dispatches removeFromCart action when "-" button is clicked', () => {
    render(
      <Provider store={store}>
        <BasketCard />
      </Provider>
    );

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(removeFromCart(mockCartItem.id));
  });

  test('dispatches addToCart action when "+" button is clicked', () => {
    render(
      <Provider store={store}>
        <BasketCard />
      </Provider>
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(addToCart({ ...mockCartItem, quantity: 1 }));
  });
});
