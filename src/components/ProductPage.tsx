import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Page404 from './Page404';
import { fetchSelectedProduct } from '../features/selectedProduct/selectedProductSlice';

export default function ProductPage() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id) {
      dispatch(fetchSelectedProduct(id))
    }
  }, []);

  const product = useAppSelector((state) => state.selectedProduct.product);
  const {category, title, images, sku, manufacturer, color, material, reason, season, heelSize, price, sizes} = product;

  if (!product) {
    return <Page404 />;
  };
  
  function sizesInstock() {
    return (
      <div className="btn-group me-2" role="group" aria-label="first-btn-group">
        {sizes.map((item) => <button type="button" className="btn catalog-item-size">{item.size}</button>)}
      </div>
    )
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
            <section className="catalog-item">
              <div className="row">
                <div className="col-5">
                  <img 
                    src={images[0]}
                    className="img-fluid" alt={title}>
                  </img>
                </div>
                <div className="col-7">
                  <p className="fs-3 fw-bold text-center">{title}</p>
                  <p className="fs-5 fw-bold text-center mb-4"><span className='text-muted'>Цена:</span> {price} руб.</p>

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
                  <div className="text-center">
                    <p>Размеры в наличии: {sizesInstock()}</p>
                    <div className='row'>
                      <div className='col d-flex justify-content-end align-items-center'><div className='text-end'>Количество:</div></div>
                      <div className='col'>
                      <div className="btn-toolbar" role="toolbar">
                      <div className="btn-group me-2" role="group">
                        <button type="button" className="btn btn-secondary">-</button>
                        <button type="button" className="btn btn-outline-secondary" disabled>2</button>
                        <button type="button" className="btn btn-secondary">+</button>
                      </div>
                    </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-danger container-fluid mt-3">В корзину</button>
                </div>
              </div>
          </section>
        </div>
      </div>
    </main>
  )
}
