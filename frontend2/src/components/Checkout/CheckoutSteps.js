import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>
        {lang === 'EN' ? 'Sign-In' : 'Bejelentkezés'}{' '}
        <i className="fa-regular fa-circle-check checkout_tick"></i>
      </Col>
      <Col className={props.step2 ? 'active' : ''}>
        {lang === 'EN' ? 'Shipping' : 'Szállítás'}{' '}
        <i className="fa-regular fa-circle-check checkout_tick"></i>
      </Col>
      <Col className={props.step3 ? 'active' : ''}>
        {lang === 'EN' ? 'Payment' : 'Fizetés'}{' '}
        <i className="fa-regular fa-circle-check checkout_tick"></i>
      </Col>
      <Col className={props.step4 ? 'active' : ''}>
        {lang === 'EN' ? 'Place Order' : 'Rendelés leadása'}{' '}
        <i className="fa-regular fa-circle-check checkout_tick"></i>
      </Col>
    </Row>
  );
}
