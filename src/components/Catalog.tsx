import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductCard from './ProductCard';
import { addProducts, fetchProducts, sendSearchRequest, setCategory, handleClearSearchRequest } from '../features/products/productsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import Loading from './Loading';

export default function Catalog() {
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
    if (curentCategory && curentCategory === 'Search') {
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

  // const newCategories = [{id: 'Все', title: "Все"}, ...categoriesList];
  // const newCategoriesList = newCategories.map((item) => {
  //   return (
  //     <li key={item.id} className="nav-item">
  //       <button 
  //         type="button" 
  //         data-bs-toggle="button" 
  //         className="btn mx-2 active category-btn"
  //         onClick={() => {
  //           dispatch(setCategory(item.id.toString()));
  //           dispatch(handleClearSearchRequest());
  //         }}
  //       >
  //         {item.title}
  //       </button>
  //     </li>
  //   )
  // });

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
          <Loading />
        </section>
      )
    };
    if (statusProducts === 'fulfilled' && statusCategories === 'fulfilled') {
      return (
        <section className="catalog">
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
          <h4>{errorProducts ?? errorCategories}</h4>
        </section>
      )
    };
  };

  return (
    catalogSection() ?? <></>
  )
}
