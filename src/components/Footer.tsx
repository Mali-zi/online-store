import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col ps-0">
          <section>
            <h5>Информация</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/about" className="nav-link active footer-link">
                  О магазине
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/catalog" className="nav-link active footer-link">
                  Каталог
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contacts" className="nav-link active footer-link">
                  Контакты
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="col px-4">
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className="row flex-nowrap footer-pay">
              <div className="footer-pay-systems footer-pay-systems-paypal"></div>
              <div className="footer-pay-systems footer-pay-systems-master-card"></div>
              <div className="footer-pay-systems footer-pay-systems-visa"></div>
              <div className="footer-pay-systems footer-pay-systems-yandex"></div>
              <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
              <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
            </div>
          </section>
          <section>
            <div className="footer-copyright">
              2009-2019 © BosaNoga.ru — модный
              <br />
              интернет-магазин обуви и аксессуаров.
              <br />
              Все права защищены.
              <br />
              Доставка по всей России!
            </div>
          </section>
        </div>
        <div className="col pe-0">
          <section className="footer-contacts">
            <h5>Контакты:</h5>
            <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">
              +7 495 79 03 5 03
            </a>
            <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
            <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">
              office@bosanoga.ru
            </a>
            <div className="footer-social-links">
              <div className="footer-social-link footer-social-link-twitter"></div>
              <div className="footer-social-link footer-social-link-vk"></div>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
