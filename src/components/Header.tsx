import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Banner from './Banner';
import { saveSearchRequest } from '../features/products/productsSlice';
import { useAppDispatch } from '../app/hooks';

export default function Header() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [toggle, setToggle] = useState(true);

  function handleSearchQuery() {
    dispatch(saveSearchRequest(searchQuery));
    setToggle(prev => !prev);
  };

  function handleClick(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
      dispatch(saveSearchRequest(searchQuery));
      setToggle(prev => !prev);
    }
  };

  function searchForm() {
    return (
      <div className="header-controls-pics mt-4 header-controls-search-form">
        <form className="d-flex form-inline" role="search">
          <input 
            type="search"
            className="form-control" 
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => handleClick(e)}
          />
        <Link to='/catalog'>

        <button 
          type="button"
          className='search-button-second'
          title="search-button-second"
          onClick={handleSearchQuery}
        >
            <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
        </button>
        </Link>
        </form>
      </div>
    )
  }

  function btnSearch() {
    return (
      <button 
        type="button"
        className='search-button-first'
        title="search-button-first"
        onClick={() => setToggle(prev => !prev)}
      >
        <div data-id="search-expander" className="header-controls-pic header-controls-search mx-0"></div>
      </button>
    )
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <div className='d-flex justify-content-between'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between navbar-col">
              <Link to="/" className="navbar-brand">
                <img src={require("../img/header-logo.png")} alt="Bosa Noga" />
              </Link>
              <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link">Главная</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/catalog" className="nav-link">Каталог</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/about" className="nav-link">О магазине</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
                  </li>
                </ul>
              </div>
            </nav>
            <div className='d-flex justify-content-end align-items-start'>
              {toggle ? btnSearch() : searchForm()}
              <Link to="/cart">
                <div className="header-controls-pic mt-4 header-controls-cart">
                  <div className="header-controls-cart-full">1</div>
                  <div className="header-controls-cart-menu"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </header>
  )
}
