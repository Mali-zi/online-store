import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { fetchTopSales } from '../features/topSales/topSalesSlice';

export default function TopSales() {
  const dispatch = useAppDispatch();
  const topSales = useAppSelector((state) => state.topSales);
  const { topSalesList, statusTopSales, errorTopSales } = topSales;
  const BASE_URL = 'http://localhost:7070/api';
  
  useEffect(() => {
    dispatch(fetchTopSales(BASE_URL));
  }, []);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {statusTopSales === 'pending' ? <Loading /> : <></>}
      <ul className="row row-cols-1 row-cols-md-3 g-4">
        {topSalesList.length > 0 ? topSalesList.map((item) => <ProductCard product={item} />) : <></>}
      </ul>
    </section>
  )
}
