import React, { useEffect, useState } from 'react';
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
  const { productList, statusProducts, errorProducts } = products;
  const { categoriesList, statusCategories, errorCategories } = categories;

  const [curentCategory, setCurentCategory] = useState('Все');
  
  useEffect(() => {
    dispatch(fetchCategories('http://localhost:7070/api/categories'));
    dispatch(fetchProducts('http://localhost:7070/api/items'));
  }, []);

  function handleSelectCategory(id: string) {
    if (id !== curentCategory) {
      setCurentCategory(id);
      if (id !== 'Все') {
        dispatch(fetchProducts(`http://localhost:7070/api/items?categoryId=${id}`));
      } else {
        dispatch(fetchProducts('http://localhost:7070/api/items'));
      }
    }
  };

  const newCategories = [{id: 'Все', title: "Все"}, ...categoriesList];

  const newCategoriesList = newCategories.map((item) => {
    return (
      <li key={item.id} className="nav-item">
        <button 
          type="button" 
          className="btn mx-2 category-btn"
          onClick={() => handleSelectCategory(item.id.toString())}
        >
          {item.title}
        </button>
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
          <h2 className="text-center mb-3">Каталог</h2>
          {children}
          <nav className="navbar navbar-expand-md navbar-light bg-light navbar-col mb-4">
            <div className="collapase navbar-collapse justify-content-around" id="navbarMain">
              <ul className="navbar-nav mr-auto">
              {newCategoriesList}
              </ul>
            </div>
          </nav>
          <ul className="row row-cols-1 row-cols-md-3 g-4">
            {productList.map((item) => <ProductCard product={item} />)}
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
