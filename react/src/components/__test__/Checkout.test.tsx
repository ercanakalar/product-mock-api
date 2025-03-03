import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { calculateCheckout } from '../../store/slices/cartSlice';
import Checkout from '../checkout/Checkout';

const mockStore = configureMockStore();
describe('Checkout Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      cart: {
        totalPrice: 1000,
      },
    });

    jest.clearAllMocks();
  });

  test('dispatches calculateCheckout action on mount', () => {
    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(calculateCheckout());
  });

  test('renders the total price correctly', async () => {
    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('1.000 ₺')).toBeInTheDocument();
    });
  });

  test('renders the checkout button correctly', () => {
    render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    expect(
      screen.getByRole('button', { name: /checkout/i })
    ).toBeInTheDocument();
  });
});
