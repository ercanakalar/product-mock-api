import createApi from '../middlewares/createApi';
import { baseQuery } from '../bases/baseQuery';
import { ProductType } from '../../type/product-type';
import { setBrands, setModels } from '../slices/productSlice';
import store from '../index';
import { sortOptionsValue } from '../../constants/sortConstant';

export const productService = createApi({
  reducerPath: 'productService',
  baseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductType[],
      {
        sort?: string;
        brands?: string[];
        models?: string[];
      }
    >({
      query: ({ sort = '', brands = [], models = [] }) => {
        let queryString = '?';

        if (sort && sortOptionsValue[sort as keyof typeof sortOptionsValue]) {
          queryString += `&${
            sortOptionsValue[sort as keyof typeof sortOptionsValue]
          }`;
        }

        if (brands.length > 0) queryString += `&brand=${brands.join(',')}`;
        if (models.length > 0) queryString += `&model=${models.join(',')}`;

        return {
          url: queryString,
          method: 'GET',
        };
      },
      transformResponse: (response: ProductType[]) => {
        return response;
      },
      transformErrorResponse: (meta, error) => {
        return {
          error: error?.response?.status,
          message:
            error?.response?.statusText ||
            'An error occurred while fetching products.',
        };
      },
    }),
    getProductById: builder.query<ProductType, string>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: ProductType) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productService;

export default productService;
