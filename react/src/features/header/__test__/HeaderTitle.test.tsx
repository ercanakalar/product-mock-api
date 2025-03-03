import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { HeaderTitle } from '../HeaderTitle';
import { useNavigate } from 'react-router-dom';
import { setProductId } from '../../../store/slices/productSlice';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockStore = configureMockStore([]);
const store = mockStore({});

const mockDispatch = jest.fn();
jest.mock('../../../store/hook.ts', () => ({
  ...jest.requireActual('../../../store/hook'),
  useAppDispatch: () => mockDispatch,
}));

describe('HeaderTitle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the title and handles click correctly', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <HeaderTitle />
      </Provider>
    );

    const titleElement = screen.getByText('Company');
    expect(titleElement).toBeInTheDocument();

    fireEvent.click(titleElement);

    expect(mockDispatch).toHaveBeenCalledWith(setProductId(''));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
