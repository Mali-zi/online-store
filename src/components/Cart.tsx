import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { placeOrder, sendOrder } from '../features/cart/cartSlice';
import Loading from './Loading';


export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const {cartProducts, statusCart, errorCart, order} = cart;
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [checked, setChecked] = useState(false);
  const [formerrors, setFormErrors] = useState('');

  const colTitle = ['#', 'Название', 'Размер', 'Кол-во', 'Стоимость', 'Итого', 'Действия'];
  const cartProductsList = cartProducts.map((cartProduct, index) => {
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td><Link to={`/catalog/${cartProduct.product.id}`}>{cartProduct.product.title}</Link></td>
        <td>{cartProduct.pickedSize}</td>
        <td>{cartProduct.count}</td>
        <td>{cartProduct.product.price} руб.</td>
        <td>{cartProduct.product.price * cartProduct.count} руб.</td>
        <td><button className="btn btn-outline-danger btn-sm">Удалить</button></td>
      </tr>
    )
  });

  const totalCost = cartProducts.reduce((sum, current) => sum + current.product.price * current.count, 0);

  function handlePlaceOrder(e: React.MouseEvent<HTMLButtonElement>) {
    let errors = '';
    e.preventDefault();

    if (!userPhone.trim() || !userAddress.trim()) {
      errors = "Ошибка: все поля должны быть заполнены.";
    } else {
      if(userPhone.trim().length !== 12){
        errors = "Ошибка в номере телефона.";
      } else {
        var pattern = new RegExp(/^((\+7)+([0-9]){10})$/);
        if (!pattern.test(userPhone)) {
          errors = "Введите номер телефона в формате: +79859876543";
        } else {
          dispatch(placeOrder({userPhone, userAddress}));
          errors = '';
          dispatch(sendOrder(order));
        };
      }
    };
    setFormErrors(errors);
  };

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
                  {colTitle.map((item, index) => {return <th scope="col">{item}</th>})}
                </tr>
              </thead>
              <tbody>
                {cartProductsList}
                <tr>
                  <td colSpan={5} className="text-right">Общая стоимость</td>
                  <td>{totalCost} руб.</td>
                </tr>
              </tbody>
            </table>
            {errorCart && <h4 className='text-center text-danger'>{errorCart}</h4>}
            {(statusCart === "fulfilled") && <h4 className="text-danger">Ваш заказ успешно отправлен</h4>}
          </section>

          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card order-card">
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input 
                    type="tel"
                    className="form-control" 
                    id="phone" 
                    placeholder="Ваш телефон"
                    value={userPhone}
                    onChange={(e) => {setUserPhone(e.target.value)}}
                    autoFocus
                    required={true}
                    maxLength={12}
                  />
                  <span className="validity"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input 
                    type="text"
                    className="form-control" 
                    id="address" 
                    placeholder="Адрес доставки"
                    required={true}
                    value={userAddress}
                    onChange={(e) => {setUserAddress(e.target.value)}}
                  />
                </div>
                <div className="form-group form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="agreement"
                    checked={checked}
                    onChange={() => setChecked(prev => !prev)}
                  />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                {formerrors && <p className="text-danger text-center">{formerrors}</p>}
                <button 
                  type="submit" 
                  className="btn btn-outline-secondary"
                  onClick={(e) => handlePlaceOrder(e)}
                  disabled={!checked}
                >
                  Оформить
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>

    )
  };

  return (
    <>
      {(statusCart === 'pending') ? <Loading /> : cartSection()}
      {(statusCart === "fulfilled") && <h4 className="text-danger">Ваш заказ успешно отправлен</h4>}
    </>
  )
}
