import React from 'react'
import { IProductCardProps } from '../models';
import { Link } from 'react-router-dom';

export default function ProductCard( {product}: IProductCardProps ) {
  console.log(product.id);
  return (
    <li key= {product.id} className="col">
      <div className="card h-100">
        <Link to={`/catalog/${product.id}`}>
          <img src={product.images[0]} className="card-img-top" alt={product.title}></img>
          <div className="card-body">
            <p className="card-text">{product.title}</p>
            <p className="card-text">{product.price} руб.</p>
          </div>
        </Link>
        <div className="card-footer border-0">
          <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
        </div>
      </div>
    </li>
  )
}
