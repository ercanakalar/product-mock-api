import { shallowEqual } from 'react-redux';
import { Filter } from '../../../components/filter/Filter';
import { useAppSelector } from '../../../store/hook';
import { ProductState } from '../../../type/product-type';

const HeaderFilter = (props: {
  handleBrandChange: (brand: string) => void;
  handleModelChange: (model: string) => void;
  toggleFilter: (isOpen: boolean) => void;
}) => {
  const models = useAppSelector((state: { product: ProductState }) => state.product.models, shallowEqual);
  const brands = useAppSelector((state: { product: ProductState }) => state.product.brands, shallowEqual);
  const selectedModels = useAppSelector((state: { product: ProductState }) => state.product.selectedModels);
  const selectedBrands = useAppSelector((state: { product: ProductState }) => state.product.selectedBrands);

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
          selectedFilter={selectedBrands}
          filter={brands}
          onChange={props.handleBrandChange}
        />
        <Filter
          className='lg:ml-0 2xl:ml-auto'
          title='Models'
          selectedFilter={selectedModels}
          filter={models}
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
