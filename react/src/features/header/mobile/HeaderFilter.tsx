import { setApplyFilterStatus, setFilterStatus, setSelectedBrandForMobile, setSelectedModelForMobile } from '../../../store/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hook';

import { Filter } from '../../../components/filter/Filter';

import { ProductState } from '../../../type/product-type';
import { useState } from 'react';
import useIsMobile from '../../../hooks/useIsMobile';

const HeaderFilter = (props: {
  toggleFilter: () => void;
}) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const product = useAppSelector((state: { product: ProductState }) => state.product);
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(brand)) {
        newSet.delete(brand);
      } else {
        newSet.add(brand);
      }
      return newSet;
    }
    );
  };

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(model)) {
        newSet.delete(model);
      } else {
        newSet.add(model);
      }
      return newSet;
    });
  };

  const applyFilter = () => {
    dispatch(setSelectedBrandForMobile(selectedBrands));
    dispatch(setSelectedModelForMobile(selectedModels));
    dispatch(setFilterStatus(false));
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
            selectedFilter={isMobile ? selectedBrands : product.selectedBrands}
            filter={product.brands}
            onChange={handleBrandChange}
          />
          <Filter
            className='lg:ml-0 2xl:ml-auto'
            title='Models'
            selectedFilter={isMobile ? selectedModels : product.selectedModels}
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
