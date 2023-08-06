import React, { useEffect, useState } from 'react';
import Catalog from './Catalog';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleClearError, saveSearchRequest } from '../features/products/productsSlice';
import CategoryButtons from './CategoryButtons';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { savedSearchRequest, errorProducts } = products;
  const [searchRequest, setSearchRequest] = useState(savedSearchRequest);

  function handleSearchRequest(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.blur();
      dispatch(saveSearchRequest(searchRequest));
    }
  }

  useEffect(() => {
    setSearchRequest(savedSearchRequest);
  }, [savedSearchRequest]);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Каталог</h2>
          <form role="search" className="catalog-search-form form-inline">
            <input
              id="mySearch"
              name="q"
              type="search"
              className="form-control"
              placeholder="Поиск"
              aria-label="Search through site content"
              value={searchRequest}
              onChange={(e) => setSearchRequest(e.target.value)}
              onKeyDown={(e) => handleSearchRequest(e)}
              onFocus={() => dispatch(handleClearError())}
            />
          </form>
          {errorProducts && <div className="fs-4 text-danger text-center">{errorProducts}</div>}
          <CategoryButtons />
          <Catalog />
        </div>
      </div>
    </main>
  );
}
