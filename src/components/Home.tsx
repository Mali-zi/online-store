import React, { useEffect } from 'react';
import TopSales from './TopSales';
import Catalog from './Catalog';
import { fetchTopSales } from '../features/topSales/topSalesSlice';
import { fetchCategories, fetchProducts } from '../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const BASE_URL = 'http://localhost:7070/api';

  
  useEffect(() => {
    dispatch(fetchTopSales(BASE_URL));
    dispatch(fetchCategories(BASE_URL));
    dispatch(fetchProducts(BASE_URL));
  }, []);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <TopSales />
          <Catalog />
        </div>
      </div>
    </main>
  )
}
