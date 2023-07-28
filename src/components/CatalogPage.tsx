import React, { useEffect, useState } from 'react'
import Catalog from './Catalog'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { sendSearchRequest, handleClearError, saveSearchRequest } from '../features/products/productsSlice';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { productList, curentCategory, curentFetchProducts, savedSearchRequest, statusProducts, errorProducts } = products;

  const [searchRequest, setSearchRequest] = useState('');
  function handleSearchRequest(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      // dispatch(sendSearchRequest(`http://localhost:7070/api/items?q=${searchRequest}`));
      dispatch(saveSearchRequest(searchRequest));
      setSearchRequest('');
    }
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Catalog>
            <>
            <form role="search" className="catalog-search-form form-inline">
              <input 
                id="mySearch" 
                name="q"
                type='search' 
                className="form-control" 
                placeholder="Поиск"
                aria-label="Search through site content"
                value={searchRequest} 
                onChange={e => setSearchRequest(e.target.value)}
                onKeyDown={(e) => handleSearchRequest(e)}
                onFocus={() => dispatch(handleClearError())}
              />
            </form>
            {errorProducts && <h4>{errorProducts}</h4>}
            </>
          </Catalog>
        </div>
      </div>
    </main>
  )
}
