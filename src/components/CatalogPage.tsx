import React, { useEffect, useState, useRef } from 'react';
import Catalog from './Catalog';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleClearError, saveSearchRequest } from '../features/products/productsSlice';
import CategoryButtons from './CategoryButtons';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { savedSearchRequest, errorProducts } = products;
  const [searchRequest, setSearchRequest] = useState(savedSearchRequest);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (searchRequest.trim()) {
      dispatch(saveSearchRequest(searchRequest));
      inputRef.current?.blur();
    };
    event.preventDefault();
  };

  useEffect(() => {
    setSearchRequest(savedSearchRequest);
  }, [savedSearchRequest]);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Каталог</h2>
          <form 
            role="search" 
            className="catalog-search-form form-inline"
            onSubmit={(e) => handleSubmit(e)}  
          >
            <input
              id="mySearch"
              name="q"
              type="search"
              className="form-control"
              placeholder="Поиск"
              aria-label="Search through site content"
              value={searchRequest}
              ref={inputRef}
              onChange={(e) => setSearchRequest(e.target.value)}
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
