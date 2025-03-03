import { BasketCard } from "@/components/basket/BasketCard";
import Checkout from "@/components/checkout/Checkout";
import { Product } from "@/features/products/Products";
import FilterProduct from "@/features/products/filter/FilterProducts";

export default function Home() {
  return (
    <div className='flex h-screen md:p-1 lmd:p-1 lg:p-1'>
      <FilterProduct />
      <Product />
      <div className='hidden flex-col pt-6 lg:flex md:w-0 lg:w-1/4 xl:w-1/4 2xl:w-1/4  lg:items-center 2xl:items-baseline'>
        <BasketCard />
        <Checkout />
      </div>
    </div>
  );
}
