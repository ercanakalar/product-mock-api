import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../search/Search';

jest.mock('../../assets/icons/search.svg', () => () => <svg data-testid='search-icon' />);

describe('Search Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the input field and search icon correctly', () => {
    render(<Search className='custom-class' onChange={mockOnChange} />);

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('custom-class');
  });

  test('calls onChange when the input value changes', () => {
    render(<Search className='custom-class' onChange={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText('Search');

    fireEvent.change(inputElement, { target: { value: 'New Search Value' } });

    expect(mockOnChange).toHaveBeenCalledWith('New Search Value');
  });

  test('sets the correct value for the input field', () => {
    render(<Search className='custom-class' value='Initial Value' onChange={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText('Search');

    expect(inputElement).toHaveValue('Initial Value');
  });
});
