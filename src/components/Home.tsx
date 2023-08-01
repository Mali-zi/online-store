import React from 'react';
import TopSales from './TopSales';
import Catalog from './Catalog';
import CategoryButtons from './CategoryButtons';

export default function Home() {

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Хиты продаж!</h2>
          <TopSales />
          <h2 className="text-center">Каталог</h2>
          <CategoryButtons />
          <Catalog />
        </div>
      </div>
    </main>
  )
}
