import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductCard from './ProductCard';
import { addProducts, fetchProducts, sendSearchRequest, setCategory, saveSearchRequest } from '../features/products/productsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import Loading from './Loading';
import { ICatalogProps } from '../models';

export default function Catalog({children}: ICatalogProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories);
  const { productList, curentCategory, curentFetchProducts, savedSearchRequest, statusProducts, errorProducts } = products;
  const { categoriesList, statusCategories, errorCategories } = categories;
  const [i, setI] = useState(1);


  useEffect(() => {
    dispatch(fetchCategories('http://localhost:7070/api/categories'));
    dispatch(fetchProducts('http://localhost:7070/api/items'));
  }, []);

  useEffect(() => {
    if (curentCategory === 'Search') {
      dispatch(sendSearchRequest(`http://localhost:7070/api/items?q=${savedSearchRequest}`));
    } else {
      if (curentCategory === 'Все') {
        dispatch(fetchProducts('http://localhost:7070/api/items'));
      } else {
        dispatch(fetchProducts(`http://localhost:7070/api/items?categoryId=${curentCategory}`));
      };
    };
    setI(1);
  }, [curentCategory, savedSearchRequest]);

  const newCategories = [{id: 'Все', title: "Все"}, ...categoriesList];
  const newCategoriesList = newCategories.map((item) => {
    return (
      <li key={item.id} className="nav-item">
        <button 
          type="button" 
          className="btn mx-2 category-btn"
          onClick={() => dispatch(setCategory(item.id.toString()))}
        >
          {item.title}
        </button>
      </li>
    )
  });

  function handleElse() {
    if (curentCategory === 'Search') {
      dispatch(addProducts(`http://localhost:7070/api/items?q=${savedSearchRequest}=${6 * i}`));
    } else {
      if (curentCategory === 'Все') {
        dispatch(addProducts(`http://localhost:7070/api/items?offset=${6 * i}`));
      } else {
        dispatch(addProducts(`http://localhost:7070/api/items?categoryId=${curentCategory}&offset=${6 * i}`));
      };
    };
    setI(prev => ++prev);
  };

  function btnElse() {
    if ((productList.length > 5 && i < 2) || curentFetchProducts.length > 5) {
      return (
        <div className="text-center mt-4">
          <button 
            type='button'
            className="btn btn-outline-secondary"
            onClick={handleElse}
          >
            Загрузить ещё
          </button>
        </div>
      )
    } else {
      return <></>
    }
  };

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
          {btnElse()}
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
