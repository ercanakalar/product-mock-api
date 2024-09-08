import { Filter } from '../../../components/filter/Filter';

const HeaderFilter = (props: {
  selectedBrands: Set<string>;
  selectedModels: Set<string>;
  brands: Set<string>;
  models: Set<string>;
  handleBrandChange: (brand: string) => void;
  handleModelChange: (model: string) => void;
  toggleFilter: (isOpen: boolean) => void;
}) => {
  return (
    <div className='fixed inset-0 z-50 bg-white flex flex-col h-full overflow-y-auto'>
      <div className='flex justify-between p-4 border-b border-gray-200'>
        <h2 className='text-xl font-semibold'>Filter</h2>
        <button onClick={() => props.toggleFilter(false)} className='text-gray-500 text-xl'>
          &#x2715;
        </button>
      </div>

      <div className='flex flex-col p-4 gap-4'>
        <Filter
          className='lg:ml-0 2xl:ml-auto'
          title='Brands'
          selectedFilter={props.selectedBrands}
          filter={props.brands}
          onChange={props.handleBrandChange}
        />
        <Filter
          className='lg:ml-0 2xl:ml-auto'
          title='Models'
          selectedFilter={props.selectedModels}
          filter={props.models}
          onChange={props.handleModelChange}
        />
        <button onClick={() => props.toggleFilter(false)} className='bg-blue-500 text-white py-2 rounded mt-4'>
          Apply
        </button>
      </div>
    </div>
  );
};

export default HeaderFilter;
