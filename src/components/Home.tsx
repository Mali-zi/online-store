import React, { useEffect } from 'react';
import TopSales from './TopSales';
import Catalog from './Catalog';

export default function Home() {

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <TopSales />
          <Catalog>
            <></>
          </Catalog>
        </div>
      </div>
    </main>
  )
}
