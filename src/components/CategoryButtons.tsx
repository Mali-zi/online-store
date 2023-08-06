import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCategory, handleClearSearchRequest } from '../features/products/productsSlice';

export default function CategoryButtons() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const { categoriesList } = categories;

  const newCategories = [{ id: 'Все', title: 'Все' }, ...categoriesList];
  const newCategoriesList = newCategories.map((item) => {
    return (
      <li key={item.id} className="nav-item">
        <button
          type="button"
          data-bs-toggle="button"
          className="btn mx-2 active category-btn"
          onClick={() => {
            dispatch(setCategory(item.id.toString()));
            dispatch(handleClearSearchRequest());
          }}
        >
          {item.title}
        </button>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light navbar-col mb-4">
      <div className="collapase navbar-collapse justify-content-around" id="navbarMain">
        <ul className="navbar-nav mr-auto">{newCategoriesList}</ul>
      </div>
    </nav>
  );
}
