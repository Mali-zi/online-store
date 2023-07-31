import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Page404 from './Page404';
import { fetchSelectedProduct } from '../features/selectedProduct/selectedProductSlice';
import Loading from './Loading';
import { addToCart, clearError } from '../features/cart/cartSlice';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id) {
      dispatch(fetchSelectedProduct(id));
      dispatch(clearError());
    }
  }, []);

  const selectedProduct = useAppSelector((state) => state.selectedProduct);
  const {product, statusSelectedProduct, errorSelectedProduct} = selectedProduct;
  const {title, images, sku, manufacturer, color, material, reason, season, price, sizes} = product;
  const [count, setCount] = useState(1);
  const [pickedSize, setPickedSize] = useState('');

  function decrease() {
    if (count > 1) {
      setCount(prev => --prev)
    }
  };

  function increase() {
    if (count < 10) {
      setCount(prev => ++prev)
    }
  };

  function sizeSection() {
    return (
      <div className="gap-2 d-md-flex justify-content-center" role="group" aria-label="first-btn-group">
        <div>Размеры в наличии: </div>
        {sizes.map((item, index) => 
          <button 
            type="button" 
            key={index}
            className={pickedSize === item.size ? "btn btn-light catalog-item-size selected" : "btn btn-light catalog-item-size"}  
            disabled={item.available}
            onClick={() => setPickedSize(item.size)}
          >
            {item.size}
          </button>
        )}
      </div>
    )
  };

  function handleToCart() {
    if (count && pickedSize) {
      dispatch(addToCart({product, pickedSize, count}));
    }
  };

  function amountSection() {
    return (
      <div className='row mt-3'>
        <div className='col d-flex justify-content-end align-items-center'>
          <div className='text-end'>Количество:</div>
        </div>
        <div className='col'>
        <div className="btn-toolbar" role="toolbar">
          <div className="btn-group me-2" role="group">
            <button type="button" className="btn btn-secondary" onClick={decrease}>-</button>
            <button type="button" className="btn btn-outline-secondary" disabled>{count}</button>
            <button type="button" className="btn btn-secondary" onClick={increase}>+</button>
          </div>
        </div>
        </div>
      </div>
    )
  };

  function buttonSection() {
    return (
      <div>
        <button 
          type="button" 
          className="btn btn-danger container-fluid mt-4"
          disabled={pickedSize === ''}
          onClick={handleToCart}
        >
          <Link to='/cart'>
            В корзину
          </Link>
        </button>
      </div>
    )
  };

  function productSection() {
    if (!selectedProduct) {
      return <Page404 />;
    };
    if (statusSelectedProduct === 'rejected') {
      if (errorSelectedProduct === 404) {
        return <Page404 />
      } else {
        return (
          <section className="top-sales">
            <h3 className="text-center">{errorSelectedProduct}</h3>
          </section>
        )
      }
    };
    if (statusSelectedProduct === 'fulfilled') {
      return (
        <section className="catalog-item">
          <div className="row">
            <div className="col-5 d-flex align-items-center">
              <img 
                src={images[0]}
                className="img-fluid" alt={title}>
              </img>
            </div>
            <div className="col-7">
              <p className="fs-3 fw-bold text-center">{title}</p>
              <p className="fs-5 fw-bold text-center mb-4">
                <span className='text-muted'>Цена:</span> {price} руб.
              </p>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{reason}</td>
                  </tr>
                </tbody>
              </table>
              {sizes.filter(item => item.available === true).length && 
                <div className="text-center">
                  {sizeSection()}
                  {amountSection()}
                  {buttonSection()}
                </div>
              }
            </div>
          </div>
        </section>
      )
    };
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
        {statusSelectedProduct === 'pending' ? <Loading /> : <></>}
        {productSection() ?? <></>}
        </div>
      </div>
    </main>
  )
}
