import React, { useState } from 'react';
import { placeOrder, sendOrder } from '../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export default function OrderSection() {
  const [checked, setChecked] = useState(false);
  const [formerrors, setFormErrors] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { order } = cart;

  function handlePlaceOrder(e: React.MouseEvent<HTMLButtonElement>) {
    let errors = '';
    e.preventDefault();

    if (!userPhone.trim() || !userAddress.trim()) {
      errors = 'Ошибка: все поля должны быть заполнены.';
    } else {
      if (userPhone.trim().length !== 12) {
        errors = 'Ошибка в номере телефона.';
      } else {
        const pattern = new RegExp(/^((\+7)+([0-9]){10})$/);
        if (!pattern.test(userPhone)) {
          errors = 'Введите номер телефона в формате: +79859876543';
        } else {
          dispatch(placeOrder({ userPhone, userAddress }));
          errors = '';
          dispatch(sendOrder(order));
        }
      }
    }
    setFormErrors(errors);
  }

  return (
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
              onChange={(e) => {
                setUserPhone(e.target.value);
              }}
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
              onChange={(e) => {
                setUserAddress(e.target.value);
              }}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
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
  );
}
