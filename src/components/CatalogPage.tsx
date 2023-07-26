import React from 'react'
import Catalog from './Catalog'

export default function CatalogPage() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Catalog>
            <form className="catalog-search-form form-inline">
              <input className="form-control" placeholder="Поиск"></input>
            </form>
          </Catalog>
        </div>
      </div>
    </main>
  )
}
