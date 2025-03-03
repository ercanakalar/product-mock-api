import { SortBy } from '../../../components/sort/SortBy';
import { Filter } from '../../../components/filter/Filter';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { ProductState } from '../../../type/product-type';
import { setSelectedBrand, setSelectedModel, setSort } from '../../../store/slices/productSlice';

const FilterProduct = () => {
  const dispatch = useAppDispatch();
  const models = useAppSelector((state: { product: ProductState }) => state.product.models);
  const brands = useAppSelector((state: { product: ProductState }) => state.product.brands);
  const sort = useAppSelector((state: { product: ProductState }) => state.product.sort);
  const selectedBrands = useAppSelector((state: { product: ProductState }) => state.product.selectedBrands);
  const selectedModels = useAppSelector((state: { product: ProductState }) => state.product.selectedModels);

  const handleBrandChange = (brand: string) => {
    dispatch(setSelectedBrand(brand));
  };

  const handleModelChange = (model: string) => {
    dispatch(setSelectedModel(model));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSort(value));
  };

  return (
    <div className='hidden md:flex lmd:flex lg:flex xl:flex 2xl:flex flex-col w-1/4 lg:w-1/4 xl:w-1/4 2xl:w-1/4 pt-6 lg:items-center 2xl:items-baseline'>
      <SortBy
        className='lg:ml-0 2xl:ml-auto'
        title='Sort By'
        selectedSort={sort}
        handleSortChange={handleSortChange}
      />
      <Filter
        className='lg:ml-0 2xl:ml-auto'
        title='Brands'
        selectedFilter={selectedBrands}
        filter={brands}
        onChange={handleBrandChange}
      />
      <Filter
        className='lg:ml-0 2xl:ml-auto'
        title='Models'
        selectedFilter={selectedModels}
        filter={models}
        onChange={handleModelChange}
      />
    </div>
  );
};

export default FilterProduct;
