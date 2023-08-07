import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Banner from './Banner';
import { saveSearchRequest } from '../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export default function Header() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [searchQuery, setSearchQuery] = useState('');
  const [toggle, setToggle] = useState(true);
  const cartCount = cart.cartProducts.length;
  const navigate = useNavigate();

  function handleSubmit() {
    if (searchQuery.trim()) {
      dispatch(saveSearchRequest(searchQuery));
    };
    setToggle((prev) => !prev);
    navigate('/catalog');
  };

  function searchForm() {
    return (
      <div className="header-controls-pics mt-4 header-controls-search-form">
        <form 
          className="d-flex form-inline" 
          role="search"
          onSubmit={handleSubmit}  
        >
          <input
            type="search"
            className="form-control"
            placeholder="Поиск"
            aria-label="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="search-button-second"
            title="search-button-second"
          >
            <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
          </button>
        </form>
      </div>
    );
  }

  function btnSearch() {
    return (
      <button
        type="button"
        className="search-button-first bg-light"
        title="search-button-first"
        onClick={() => setToggle((prev) => !prev)}
      >
        <div data-id="search-expander" className="header-controls-pic header-controls-search mx-0"></div>
      </button>
    );
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between navbar-col">
              <Link to="/" className="navbar-brand">
                <img src={require('../img/header-logo.png')} alt="Bosa Noga" />
              </Link>
              <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active header-link">
                      Главная
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/catalog" className="nav-link active header-link">
                      Каталог
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link active header-link">
                      О магазине
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contacts" className="nav-link active header-link">
                      Контакты
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="d-flex justify-content-end align-items-start">
              {toggle ? btnSearch() : searchForm()}
              <Link to="/cart">
                <div className="header-controls-pic mt-4 header-controls-cart">
                  {cartCount > 0 && <div className="header-controls-cart-full">{cartCount}</div>}
                  <div className="header-controls-cart-menu"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </header>
  );
}
