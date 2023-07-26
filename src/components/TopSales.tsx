import React from 'react'
import { useAppSelector } from '../app/hooks';
import ProductCard from './ProductCard';

export default function TopSales() {
  const topSales = useAppSelector((state) => state.topSales);
  const { topSalesList, status, error } = topSales;
  
  const list = topSalesList.map((item) => {
    return (
        <ProductCard product={item} />
    )
  })
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <ul className="row row-cols-1 row-cols-md-3 g-4">
        {list}
      </ul>
    </section>
  )
}
