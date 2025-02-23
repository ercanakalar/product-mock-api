import { setApplyFilterStatus, setFilterStatus, setSelectedBrand, setSelectedModel } from '../../../store/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hook';

import { Filter } from '../../../components/filter/Filter';

import { ProductState } from '../../../type/product-type';

const HeaderFilter = (props: {
  toggleFilter: () => void;
}) => {
  const dispatch = useAppDispatch();

  const product = useAppSelector((state: { product: ProductState }) => state.product);

  const handleBrandChange = (brand: string) => {
    dispatch(setSelectedBrand(brand));
  };

  const handleModelChange = (model: string) => {
    dispatch(setSelectedModel(model));
  };

  const applyFilter = () => {
    dispatch(setFilterStatus(!product.filterStatus))
    dispatch(setApplyFilterStatus(true))
  }

  return (
    product.filterStatus ? (
      <div className='fixed inset-0 z-50 bg-white flex flex-col h-full overflow-y-auto'>
        <div className='flex justify-between p-4 border-b border-gray-200'>
          <h2 className='text-xl font-semibold'>Filter</h2>
          <button onClick={props.toggleFilter} className='text-gray-500 text-xl'>
            &#x2715;
          </button>
        </div>

        <div className='flex flex-col p-4 gap-4'>
          <Filter
            className='lg:ml-0 2xl:ml-auto'
            title='Brands'
            selectedFilter={product.selectedBrands}
            filter={product.brands}
            onChange={handleBrandChange}
          />
          <Filter
            className='lg:ml-0 2xl:ml-auto'
            title='Models'
            selectedFilter={product.selectedModels}
            filter={product.models}
            onChange={handleModelChange}
          />
          <button onClick={applyFilter} className='bg-blue-500 text-white py-2 rounded mt-4'>
            Apply
          </button>
        </div>
      </div>
    ) : <></>);
};

export default HeaderFilter;
