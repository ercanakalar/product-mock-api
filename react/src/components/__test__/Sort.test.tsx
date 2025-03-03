import { render, screen, fireEvent } from '@testing-library/react';
import { SortBy } from '../sort/SortBy';
import { sortOptions } from '../../constants/sortConstant';

describe('SortBy Component', () => {
  const mockHandleSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all sort options correctly', () => {
    render(<SortBy title='Sort Options' selectedSort='' handleSortChange={mockHandleSortChange} />);

    sortOptions.forEach((option) => {
      const radioElement = screen.getByLabelText(option);
      expect(radioElement).toBeInTheDocument();
      expect(radioElement).toHaveAttribute('type', 'radio');
    });
  });

  test('checks the correct radio button based on selectedSort prop', () => {
    const selectedSort = sortOptions[1];
    render(<SortBy title='Sort Options' selectedSort={selectedSort} handleSortChange={mockHandleSortChange} />);

    const selectedRadioElement = screen.getByLabelText(selectedSort);
    expect(selectedRadioElement).toBeChecked();
  });

  test('calls handleSortChange when a sort option is selected', () => {
    render(<SortBy title='Sort Options' selectedSort='' handleSortChange={mockHandleSortChange} />);

    const firstOption = sortOptions[0];
    const radioElement = screen.getByLabelText(firstOption);

    fireEvent.click(radioElement);

    expect(mockHandleSortChange).toHaveBeenCalledWith(firstOption);
  });
});
