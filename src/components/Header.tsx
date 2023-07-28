import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Banner from './Banner';

export default function Header() {
  const [searchMessage, setSearchMessage] = useState('');
  // const [searchRequest, setSearchRequest] = useState(savedSearchRequest);

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
              <div className="header-controls-pics mt-4 header-controls-search-form">
                {/* Search form */}
                <form className="d-flex form-inline" role="search">
                  <input 
                    type="search"
                    className="form-control" 
                    placeholder="Search"
                    hidden={false}
                    value={searchMessage}
                    onChange={(e) => setSearchMessage(e.target.value)}
                  />
                </form>
                <button 
                  type="button"
                  className='search-button'
                  title="search-button"
                  onClick={() => setSearchMessage('')}
                >
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                </button>
              </div>
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
