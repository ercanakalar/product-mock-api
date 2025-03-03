import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../pagination/Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the correct number of page buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('disables the previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeDisabled();
  });

  test('disables the next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });

  test('calls onPageChange with the correct page number when a page button is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    const pageButton = screen.getByText('1');
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test('calls onPageChange with the correct page number when the next button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange with the correct page number when the previous button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByText('<');
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('renders ellipsis correctly when there are more than 5 pages', () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getAllByText('...')).toHaveLength(1);
  });

  test('renders ellipsis correctly when there are more than 5 pages and currentPage is near the end', () => {
    render(<Pagination currentPage={8} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getAllByText('...')).toHaveLength(1);
  });

  test('renders two ellipses correctly when currentPage is in the middle', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
