import createApi from '../middlewares/createApi';
import { baseQuery } from '../bases/baseQuery';
import { ProductType } from '../../type/product-type';
import { sortOptionsValue } from '../../constants/sortConstant';
import transformErrorResponse from '../bases/transformErrorResponse';

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
      transformErrorResponse: (error, meta) =>
        transformErrorResponse(error, meta),
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
      transformErrorResponse: (error, meta) =>
        transformErrorResponse(error, meta),
    }),
    getAllFilters: builder.query<any, void>({
      query: () => '/',
      transformResponse: (response: ProductType[]) => {
        return response;
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productService;

export default productService;
