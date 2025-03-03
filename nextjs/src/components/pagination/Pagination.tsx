const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className='flex justify-center items-center py-4 gap-1 pb-20 md:pb-10 lg:pb-10 2xl:pb-0'>
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} className='px-2 py-1 cursor-pointer'>
        {'<'}
      </button>

      {pageNumbers.map((number) =>
        number === 1 || number === totalPages || Math.abs(number - currentPage) <= 1 ? (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`px-2 py-1 rounded ${number === currentPage ? 'bg-white text-count-text-bg shadow-card shadow-black font-bold' : 'bg-white text-gray-500 cursor-pointer'
              }`}
          >
            {number}
          </button>
        ) : Math.abs(number - currentPage) === 2 ? (
          <span key={number} className='px-2'>
            ...
          </span>
        ) : null
      )}

      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} className='px-2 py-1 cursor-pointer'>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
