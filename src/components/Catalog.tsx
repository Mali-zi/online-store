import React from 'react';
import { useAppSelector } from '../app/hooks';
import ProductCard from './ProductCard';


export default function Catalog() {
  const products = useAppSelector((state) => state.products);
  const { productsList, categories, selectedCategory, status, error } = products;
  
  const catalog = productsList.map((item) => {
    return (
        <ProductCard product={item} />
    )
  });

  const newcategories = [{id: '111', title: "Все"}, ...categories];

  const categoriesList = newcategories.map((item) => {
    return (
      <li key={item.id} className="nav-item">
        <a className="nav-link active" href="#">{item.title}</a>
      </li>
    )
  });

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <ul className="catalog-categories nav justify-content-center">
        {categoriesList}
      </ul>

      <ul className="row row-cols-1 row-cols-md-3 g-4">
        {catalog}
      </ul>
    </section>
  )
}
