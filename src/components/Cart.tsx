import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { placeOrder } from '../features/cart/cartSlice';


export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const {cartProducts, statusCart, errorCart} = cart;
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
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

    if (!phone.trim() || !address.trim()) {
      errors = "Ошибка: все поля должны быть заполнены.";
    } else {
      if(phone.trim().length !== 12){
        errors = "Ошибка в номере телефона.";
      } else {
        var pattern = new RegExp(/^((\+7)+([0-9]){10})$/);
        if (!pattern.test(phone)) {
          errors = "Введите номер телефона в формате: +79859876543";
        } else {
          dispatch(placeOrder({phone, address}));
          errors = '';
        };
      }
    };
    setFormErrors(errors);
  };

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
                    value={phone}
                    // value={`${phone.substring(0, 2)} ${phone.substring(2, 5)} ${phone.substring(5, 8)} ${phone.substring(8, 10)} ${phone.substring(10, phone.length)}`}
                    onChange={(e) => {setPhone(e.target.value)}}
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
                    value={address}
                    onChange={(e) => {setAddress(e.target.value)}}
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
}
