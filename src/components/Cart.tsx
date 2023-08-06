import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { clearStatus, deleteProduct } from '../features/cart/cartSlice';
import Loading from './Loading';
import OrderSection from './OrderSection';

export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { cartProducts, statusCart, errorCart } = cart;

  useEffect(() => {
    dispatch(clearStatus());
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const cartProductsList = cartProducts.map((cartProduct, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          <Link to={`/catalog/${cartProduct.product.id}`}>{cartProduct.product.title}</Link>
        </td>
        <td>{cartProduct.pickedSize}</td>
        <td>{cartProduct.count}</td>
        <td>{cartProduct.product.price} руб.</td>
        <td>{cartProduct.product.price * cartProduct.count} руб.</td>
        <td>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => dispatch(deleteProduct(cartProduct.product.id))}
          >
            Удалить
          </button>
        </td>
      </tr>
    );
  });

  const colTitle = ['#', 'Название', 'Размер', 'Кол-во', 'Стоимость', 'Итого', 'Действия'];
  const totalCost = cartProducts.reduce((sum, current) => sum + current.product.price * current.count, 0);

  function cartSection() {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <section className="cart">
              <h2 className="text-center">Корзина</h2>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    {colTitle.map((item, index) => {
                      return (
                        <th scope="col" key={index}>
                          {item}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {cartProductsList}
                  <tr>
                    <td colSpan={5} className="text-right">
                      Общая стоимость
                    </td>
                    <td>{totalCost} руб.</td>
                  </tr>
                </tbody>
              </table>
              {errorCart && <h4 className="text-center text-danger">{errorCart}</h4>}
              {statusCart === 'fulfilled' && <h4 className="text-center text-danger">Ваш заказ успешно отправлен</h4>}
            </section>
            {<OrderSection />}
          </div>
        </div>
      </main>
    );
  }

  return <>{statusCart === 'pending' ? <Loading /> : cartSection()}</>;
}
