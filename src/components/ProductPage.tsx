import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Page404 from './Page404';
import { fetchSelectedProduct } from '../features/selectedProduct/selectedProductSlice';
import Loading from './Loading';

export default function ProductPage() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id) {
      dispatch(fetchSelectedProduct(id))
    }
  }, []);

  const selectedProduct = useAppSelector((state) => state.selectedProduct);
  const {category, title, images, sku, manufacturer, color, material, reason, season, heelSize, price, sizes} = selectedProduct.product;
  const statusSelectedProduct = selectedProduct.statusSelectedProduct;
  const errorSelectedProduct = selectedProduct.errorSelectedProduct;

  function sizesInstock() {
    return (
      <div className="gap-2 d-md-flex justify-content-center" role="group" aria-label="first-btn-group">
        <div>Размеры в наличии: </div>
        {sizes.map((item) => <button type="button" className="btn btn-light catalog-item-size" disabled={item.available}>{item.size}</button>)}
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
                {sizesInstock()}
                <div className='row mt-3'>
                  <div className='col d-flex justify-content-end align-items-center'>
                    <div className='text-end'>Количество:</div>
                  </div>
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
              <button type="button" className="btn btn-danger container-fluid mt-4">В корзину</button>
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
