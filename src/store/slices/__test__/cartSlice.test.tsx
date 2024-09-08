import cartReducer, { addToCart, removeFromCart, clearCart, calculateCheckout, getTotalCart } from '../cartSlice';
import { CartItem, CartState } from '../../../type/cart-type';

describe('cartSlice reducer', () => {
  const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalProducts: 0,
  };

  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
  });

  test('should return the initial state', () => {
    expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should handle addToCart', () => {
    const cartItem: CartItem = { id: '1', name: 'Product 1', price: 10, quantity: 1, image: 'path/to/image' };
    const nextState = cartReducer(initialState, addToCart(cartItem));

    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0].id).toBe('1');
    expect(nextState.items[0].quantity).toBe(1);
    expect(nextState.totalPrice).toBe(10);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(nextState.items));
  });

  test('should handle removeFromCart', () => {
    const cartItem: CartItem = { id: '1', name: 'Product 1', price: 10, quantity: 2, image: 'path/to/image' };
    const stateWithItem = { ...initialState, items: [cartItem], totalPrice: 20 };

    const nextState = cartReducer(stateWithItem, removeFromCart('1'));

    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0].quantity).toBe(1);
    expect(nextState.totalPrice).toBe(10);

    const finalState = cartReducer(nextState, removeFromCart('1'));
    expect(finalState.items.length).toBe(0);
    expect(finalState.totalPrice).toBe(0);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(finalState.items));
  });

  test('should handle clearCart', () => {
    const stateWithItems: CartState = {
      items: [{ id: '1', name: 'Product 1', price: 10, quantity: 2, image: 'path/to/image' }],
      totalPrice: 20,
      totalProducts: 2,
    };

    const nextState = cartReducer(stateWithItems, clearCart());

    expect(nextState.items.length).toBe(0);
    expect(nextState.totalPrice).toBe(0);
    expect(nextState.totalProducts).toBe(0);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  test('should handle calculateCheckout', () => {
    const stateWithItems: CartState = {
      items: [
        { id: '1', name: 'Product 1', price: 10, quantity: 2, image: 'path/to/image' },
        { id: '2', name: 'Product 2', price: 20, quantity: 1, image: 'path/to/image' },
      ],
      totalPrice: 0,
      totalProducts: 3,
    };

    const nextState = cartReducer(stateWithItems, calculateCheckout());

    expect(nextState.totalPrice).toBe(40);
  });

  test('should handle getTotalCart', () => {
    const stateWithItems: CartState = {
      items: [
        { id: '1', name: 'Product 1', price: 10, quantity: 2, image: 'path/to/image' },
        { id: '2', name: 'Product 2', price: 20, quantity: 1, image: 'path/to/image' },
      ],
      totalPrice: 0,
      totalProducts: 0,
    };

    const nextState = cartReducer(stateWithItems, getTotalCart());

    expect(nextState.totalPrice).toBe(40);
    expect(nextState.totalProducts).toBe(3);
  });
});
