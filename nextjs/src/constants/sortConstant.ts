export const sortOptions = ['Old to new', 'New to old', 'Price high to low', 'Price low to high'];

export const sortOptionsValue: Record<string, string> = {
  'Old to new': 'sortBy=createdAt&order=asc',
  'New to old': 'sortBy=createdAt&order=desc',
  'Price high to low': 'sortBy=price&order=desc',
  'Price low to high': 'sortBy=price&order=asc',
};
