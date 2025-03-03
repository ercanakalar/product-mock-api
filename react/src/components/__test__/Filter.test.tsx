import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from '../filter/Filter';

describe('Filter Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the search input and filter options correctly', () => {
    render(
      <Filter title='Test Filter' filter={new Set(['Option 1', 'Option 2', 'Option 3'])} onChange={mockOnChange} />
    );

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();

    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
  });

  test('filters options based on search term', () => {
    render(<Filter title='Test Filter' filter={new Set(['Apple', 'Banana', 'Cherry'])} onChange={mockOnChange} />);

    const searchInput = screen.getByPlaceholderText('Search');

    fireEvent.change(searchInput, { target: { value: 'Ap' } });

    expect(screen.getByLabelText('Apple')).toBeInTheDocument();
    expect(screen.queryByLabelText('Banana')).toBeNull();
    expect(screen.queryByLabelText('Cherry')).toBeNull();
  });

  test('calls onChange when a filter option is selected or deselected', () => {
    render(<Filter title='Test Filter' filter={new Set(['Option 1', 'Option 2'])} onChange={mockOnChange} />);

    const option1Checkbox = screen.getByLabelText('Option 1');

    fireEvent.click(option1Checkbox);

    expect(mockOnChange).toHaveBeenCalledWith('Option 1');

    fireEvent.click(option1Checkbox);

    expect(mockOnChange).toHaveBeenCalledWith('Option 1');
  });

  test('renders checked state correctly for selected filters', () => {
    render(
      <Filter
        title='Test Filter'
        filter={new Set(['Option 1', 'Option 2'])}
        selectedFilter={new Set(['Option 1'])}
        onChange={mockOnChange}
      />
    );

    const option1Checkbox = screen.getByLabelText('Option 1');
    expect(option1Checkbox).toBeChecked();

    const option2Checkbox = screen.getByLabelText('Option 2');
    expect(option2Checkbox).not.toBeChecked();
  });
});
