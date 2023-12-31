import React from 'react';
import { IProduct } from '../models/product';
import { Link } from 'react-router-dom';

interface IProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProductCardProps) {
  return (
    <li key={product.id} className="col">
      <div className="card h-100">
        <img src={product.images[0]} className="card-img-top" alt={product.title}></img>
        <div className="card-body">
          <div className="row">
            <p className="card-text">{product.title}</p>
            <p className="card-text">{product.price} руб.</p>
          </div>
        </div>
        <div className="card-footer border-0 bg-white">
          <Link to={`/catalog/${product.id}`} className="btn btn-outline-primary mb-1">
            Заказать
          </Link>
        </div>
      </div>
    </li>
  );
}
