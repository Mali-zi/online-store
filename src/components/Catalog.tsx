import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductCard from './ProductCard';
import { fetchProducts } from '../features/products/productsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import Loading from './Loading';
import { ICatalogProps } from '../models';

export default function Catalog({children}: ICatalogProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories);
  const { productsList, statusProducts, errorProducts } = products;
  const { categoriesList, selectedCategory, statusCategories, errorCategories } = categories;
  const BASE_URL = 'http://localhost:7070/api';
  
  useEffect(() => {
    dispatch(fetchCategories(BASE_URL));
    dispatch(fetchProducts(BASE_URL));
  }, []);

  
  const catalog = productsList.map((item) => {
    return (
        <ProductCard product={item} />
    )
  });

  const newCategories = [{id: '111', title: "Все"}, ...categoriesList];

  const newCategoriesList = newCategories.map((item) => {
    return (
      <li key={item.id} className="nav-item">
        <a className="nav-link active" href="#">{item.title}</a>
      </li>
    )
  });

  function catalogSection() {
    if (statusProducts === 'pending' || statusCategories === 'pending') {
      return (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <Loading />
        </section>
      )
    };
    if (statusProducts === 'fulfilled' && statusCategories === 'fulfilled') {
      return (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          {children}
          <ul className="catalog-categories nav justify-content-center">
            {newCategoriesList}
          </ul>
          <ul className="row row-cols-1 row-cols-md-3 g-4">
            {catalog}
          </ul>
        </section>
      )
    };
    if (statusProducts === 'rejected' || statusCategories === 'rejected') {
      return (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <h4>{errorProducts ?? errorCategories}</h4>
        </section>
      )
    };
  };

  return (
    catalogSection() ?? <></>
  )
}
